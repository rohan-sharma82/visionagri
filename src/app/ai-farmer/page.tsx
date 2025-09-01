
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  getFarmingAdvice,
  GetFarmingAdviceOutput,
} from '@/ai/flows/ai-farmer-assistant';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, User, Bot, Trash2, Send, Mic, Volume2, StopCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Header from '@/components/layout/header';
import { useTranslation, useLocation } from '@/hooks/use-translation';
import { db, auth } from '@/lib/firebase-config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, getDocs } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

const formSchema = z.object({
  query: z.string().min(1, 'Please ask a question.'),
});

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  createdAt?: any;
}

const useTypingEffect = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  return displayedText;
};

const AssistantMessage = ({ message, isTyping }: { message: Message, isTyping: boolean }) => {
  const typedContent = useTypingEffect(message.content, 20);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (audioUrl: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && audio.src === audioUrl) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      // Pause other audio elements
      document.querySelectorAll('audio').forEach(a => a.pause());
      audio.src = audioUrl;
      audio.play().catch(e => console.error("Audio playback failed", e));
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex items-start gap-4 justify-start'
    >
       <audio ref={audioRef} className="hidden" />
      <Avatar>
        <AvatarFallback>
          <Bot />
        </AvatarFallback>
      </Avatar>
      <div
        className='max-w-xl rounded-lg px-4 py-3 relative bg-muted'
      >
        <p className="whitespace-pre-wrap">{isTyping ? typedContent : message.content}</p>
        {message.audioUrl && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -bottom-4 -right-4 h-8 w-8 rounded-full"
            onClick={() => toggleAudio(message.audioUrl!)}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};


export default function AiFarmerPage() {
  const { t } = useTranslation();
  const { location } = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);


  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadingMessages = [
    t('aiFarmer.loadingMessages.m1'),
    t('aiFarmer.loadingMessages.m2'),
    t('aiFarmer.loadingMessages.m3'),
    t('aiFarmer.loadingMessages.m4'),
    t('aiFarmer.loadingMessages.m5'),
    t('aiFarmer.loadingMessages.m6'),
    t('aiFarmer.loadingMessages.m7'),
    t('aiFarmer.loadingMessages.m8'),
    t('aiFarmer.loadingMessages.m9'),
    t('aiFarmer.loadingMessages.m10'),
  ];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed", error);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users", user.uid, "chats"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    }, (error) => {
      console.error("Failed to fetch messages from Firestore", error);
      toast({
        title: "Error",
        description: "Could not load chat history.",
        variant: "destructive",
      });
    });

    return () => unsubscribe();
  }, [user, toast]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Cleanup effect to abort fetch on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);


  const saveMessage = useCallback(async (message: Message) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "chats"), {
        ...message,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving message to Firestore:", error);
    }
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading || !user) return;

    setIsLoading(true);
    setIsTyping(true);
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    const userMessage: Message = { role: 'user', content: values.query };
    await saveMessage(userMessage);
    form.reset();

    const controller = new AbortController();
    abortControllerRef.current = controller;
  
    try {
      const advicePromise = getFarmingAdvice({
        query: values.query,
        location: location || undefined,
      });

      const result: GetFarmingAdviceOutput = await advicePromise;
      if (controller.signal.aborted) {
        setIsTyping(false);
        return;
      };


      let ttsResult;
      try {
        if (!controller.signal.aborted) {
          ttsResult = await textToSpeech(result.advice);
        }
      } catch (ttsError: any) {
         if (ttsError.name !== 'AbortError') {
            console.error("Text-to-speech conversion failed:", ttsError);
         }
      }
  
      if (controller.signal.aborted) {
        setIsTyping(false);
        return;
      };

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.advice,
        audioUrl: ttsResult?.media,
      };
      await saveMessage(assistantMessage);
  
    } catch (error: any) {
       if (error.name !== 'AbortError') {
        console.error('Error getting farming advice:', error);
        toast({
          title: t('aiFarmer.toast.adviceError.title'),
          description: t('aiFarmer.toast.adviceError.description'),
          variant: 'destructive',
        });
        const lastMessage = messages[messages.length - 1];
         if (lastMessage && lastMessage.id) {
           await deleteDoc(doc(db, "users", user.uid, "chats", lastMessage.id));
         }
      }
    } finally {
       if (!controller.signal.aborted) {
        setIsLoading(false);
        setIsTyping(false);
        abortControllerRef.current = null;
      }
    }
  }

  const handleClearChat = async () => {
    if (!user) return;
    try {
      const chatCollection = collection(db, "users", user.uid, "chats");
      const chatSnapshot = await getDocs(chatCollection);
      const deletePromises = chatSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      
      toast({
        title: t('aiFarmer.toast.chatCleared.title'),
        description: t('aiFarmer.toast.chatCleared.description'),
      });
    } catch (error) {
       console.error("Failed to clear messages from Firestore", error);
        toast({
          title: "Error",
          description: "Could not clear chat history.",
          variant: "destructive",
        });
    }
  };

   const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
        toast({ title: t('aiFarmer.toast.listening') });
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          form.setValue('query', transcript);
          form.handleSubmit(onSubmit)();
        }
      };
      
      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          console.log('No speech detected.');
          return;
        }
        console.error('Speech recognition error', event.error);
        toast({ title: t('aiFarmer.toast.voiceError.title'), description: t('aiFarmer.toast.voiceError.description', { error: event.error }), variant: 'destructive' });
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      toast({ title: t('aiFarmer.toast.voiceNotSupported.title'), description: t('aiFarmer.toast.voiceNotSupported.description'), variant: 'destructive' });
    }
  };

  useEffect(() => {
    setupSpeechRecognition();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const toggleRecording = () => {
    if (isLoading) return;
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setIsTyping(false);
      // No need to manually remove messages, Firestore sync will handle it.
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 h-[calc(100vh-109px)] flex flex-col pt-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold font-headline text-foreground">{t('aiFarmer.title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('aiFarmer.subtitle')}
          </p>
        </div>

        <div className="flex justify-start mb-4">
            {messages.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="clear-chat-button box">
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('aiFarmer.buttons.clearChat')}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('aiFarmer.clearChatDialog.title')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('aiFarmer.clearChatDialog.description')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('aiFarmer.clearChatDialog.cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearChat}>{t('aiFarmer.clearChatDialog.continue')}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            )}
          </div>


        <div className="flex-1 flex flex-col bg-card border rounded-xl shadow-lg overflow-hidden">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full">
                  <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-lg">{t('aiFarmer.idle.prompt')}</p>
                  <p className="text-sm">{t('aiFarmer.idle.example')}</p>
                </div>
              )}
              {messages.map((message, index) => {
                if (message.role === 'assistant') {
                  const isLastMessage = index === messages.length - 1;
                  return <AssistantMessage key={message.id || index} message={message} isTyping={isLastMessage && isTyping} />;
                }
                return (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex items-start gap-4',
                    'justify-end'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-xl rounded-lg px-4 py-3 relative',
                      'bg-primary text-primary-foreground'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <Avatar>
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                </motion.div>
              )})}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4 justify-start"
                >
                  <Avatar>
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                    <p className='text-sm text-muted-foreground'>{loadingMessage}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 bg-background">
            {isLoading ? (
              <div className="flex justify-center">
                <Button onClick={handleStop} variant="outline" className="w-full">
                  <StopCircle className="h-4 w-4 mr-2" />
                  {t('aiFarmer.buttons.stop')}
                </Button>
              </div>
            ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-4"
              >
                <Button type="button" variant="ghost" size="icon" onClick={toggleRecording} className={cn(isRecording && "bg-red-500/20 text-red-500")} disabled={isLoading || !user}>
                  <Mic className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Textarea
                          placeholder={t('aiFarmer.form.placeholder')}
                          className="resize-none no-scrollbar"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !isLoading && user) {
                              if (form.getValues("query").trim()) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                              }
                            }
                          }}
                          {...field}
                          disabled={isLoading || !user}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button type="submit" disabled={isLoading || !form.getValues("query").trim() || !user} className="send-button-style">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span><Send className="text-black" /></span>
                  )}
                </button>
              </form>
            </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
