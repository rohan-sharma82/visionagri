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
import { Loader2, Sparkles, User, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import JumpingDotsLoader from '@/components/ui/jumping-dots-loader';

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

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!location) {
      const loc = window.prompt("To provide weather-aware advice, please enter your location (e.g., 'Delhi, India'):");
      if (loc) {
        setLocation(loc);
      }
    }
  }, [location]);

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

  return (
    <div className="container mx-auto px-4 py-12 h-[calc(100vh-57px)] flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-foreground">AI Farmer Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal agricultural expert, available 24/7.
        </p>
      </div>

      <div className="flex-1 flex flex-col bg-card border rounded-xl shadow-lg overflow-hidden">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
