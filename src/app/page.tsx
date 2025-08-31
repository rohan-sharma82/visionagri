
'use client';
import { useState } from 'react';
import { User } from 'lucide-react';
import { newsData, newsCategories } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TextPressure from '@/components/text-pressure';
import QuotesBox from '@/components/quotes-box';
import FeatureCards from '@/components/feature-cards';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsArticle {
  id: number;
  title: string;
  source: string;
  date: string;
  snippet: string;
  article: string;
  category: string;
  url?: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const filteredNews: NewsArticle[] =
    selectedCategory === 'All Categories'
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SVG filter for gooey effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <section className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-card/50 flex items-center justify-center p-4 md:p-8 shadow-inner">
        <div className="absolute top-1/4 left-[5%] -translate-y-1/2 z-10 bg-card rounded-full p-4 shadow-lg">
          <User className="h-24 w-24 md:h-32 md:w-32 text-muted-foreground" />
        </div>

        <div className="absolute top-[30%] left-[calc(5%_+_8rem)] -translate-y-1/2 z-0 w-[calc(90%-24.5rem)]">
          <svg
            width="100%"
            height="28"
            className="overflow-visible"
          >
            <path
              d="M0 2 H1000"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="[animation:draw-line_2s_ease-out_1s_forwards]"
            />
          </svg>
        </div>

        <div className="absolute top-1/4 right-[5%] -translate-y-1/2 z-10">
          <h1 className="text-5xl md:text-8xl font-bold text-primary font-headline animate-pulse">
            AI
          </h1>
        </div>
        
        <div className="absolute bottom-8 text-center w-full px-4">
          <div className='h-24 pb-4'>
            <TextPressure
              text="Welcome to AgriVision AI"
              minFontSize={48}
              textColor='hsl(var(--foreground))'
            />
          </div>
           <div className='h-10 pb-2'>
            <TextPressure
                text="Revolutionizing farming with the power of Artificial Intelligence."
                minFontSize={18}
                textColor='hsl(var(--muted-foreground))'
                weight={false}
              />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <QuotesBox />
      </section>
      
      <section className="mt-16">
        <FeatureCards />
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center font-headline text-foreground">
          Agriculture News Feed
        </h2>
        <p className="mt-2 text-lg text-center text-muted-foreground mb-8">
          Stay updated with the latest in the world of agriculture.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {newsCategories.map((category) => (
             <button key={category} onClick={() => setSelectedCategory(category)} className="c-button c-button--gooey"> {category}
              <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
              </div>
            </button>
          ))}
        </div>
        <Dialog>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card5">
                  <div className="card5-content">
                    <div className="card-date">{news.date}</div>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <span className="card-title">{news.title}</span>
                      <p className="card-description">{news.snippet}</p>
                    </div>
                    <DialogTrigger asChild>
                      <button onClick={() => setSelectedNews(news)} className="card-link">
                        Read More
                      </button>
                    </DialogTrigger>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedNews && (
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>{selectedNews.title}</DialogTitle>
                <DialogDescription>
                  Source: {selectedNews.source} | Date: {selectedNews.date}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-full pr-4">
                <div
                  className="prose prose-sm dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: selectedNews.article }}
                />
              </ScrollArea>
            </DialogContent>
          )}
        </Dialog>
        {filteredNews.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No news articles found in this category.
          </p>
        )}
      </section>
    </div>
  );
}
