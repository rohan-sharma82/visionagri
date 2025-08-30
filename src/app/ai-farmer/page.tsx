'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  getFarmingAdvice,
  GetFarmingAdviceOutput,
} from '@/ai/flows/ai-farmer-assistant';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, User, Bot, Trash2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import JumpingDotsLoader from '@/components/ui/jumping-dots-loader';
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

const formSchema = z.object({
  query: z.string().min(10, 'Please ask a more detailed question.'),
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiFarmerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  // Load messages and location from localStorage on initial render
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('ai-farmer-messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      
      const savedLocation = localStorage.getItem('ai-farmer-location');
      if (savedLocation) {
        setLocation(savedLocation);
      } else {
        const loc = window.prompt("To provide weather-aware advice, please enter your location (e.g., 'Delhi, India'):");
        if (loc) {
          setLocation(loc);
          localStorage.setItem('ai-farmer-location', loc);
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('ai-farmer-messages', JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to localStorage", error);
      }
    }
  }, [messages]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: values.query };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const result: GetFarmingAdviceOutput = await getFarmingAdvice({
        query: values.query,
        location: location || undefined,
      });
      const assistantMessage: Message = { role: 'assistant', content: result.advice };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting farming advice:', error);
      toast({
        title: 'Error',
        description: 'Failed to get advice. Please try again.',
        variant: 'destructive',
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    }
    setIsLoading(false);
  }

  const handleClearChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem('ai-farmer-messages');
      toast({
        title: 'Chat Cleared',
        description: 'Your conversation history has been cleared.',
      });
    } catch (error) {
       console.error("Failed to clear messages from localStorage", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-57px)] flex flex-col">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold font-headline text-foreground">AI Farmer Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal agricultural expert, available 24/7.
        </p>
      </div>

       <div className="flex justify-start mb-4">
          {messages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="clear-chat-button">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Chat
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your current chat history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearChat}>Continue</AlertDialogAction>
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
                <p className="mt-4 text-lg">Ask me anything about farming!</p>
                <p className="text-sm">e.g., "What are the best irrigation methods for sandy soil?"</p>
              </div>
            )}
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xl rounded-lg px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
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
                  <JumpingDotsLoader />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4 bg-background">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-4"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="Ask your farming question here..."
                        className="resize-none no-scrollbar"
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button type="submit" disabled={isLoading} className="send-button-style">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span><Send className="text-black" /></span>
                )}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
