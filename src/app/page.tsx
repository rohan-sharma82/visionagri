
'use client';
import { useState, useRef, forwardRef } from 'react';
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
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { cn } from '@/lib/utils';

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

const Icons = {
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <path
        fill="hsl(var(--foreground))"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-card p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const aiIconRef = useRef<HTMLDivElement>(null);

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
      <section ref={containerRef} className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-card/50 flex items-center justify-center p-4 md:p-8 shadow-inner">

        <div className="flex w-full items-stretch justify-between gap-10 h-full max-w-lg">
          <div className="flex flex-col justify-center items-center">
             <Circle ref={userIconRef}>
              <Icons.user />
            </Circle>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Circle ref={aiIconRef}>
              <Icons.openai />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={userIconRef}
          toRef={aiIconRef}
        />

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
