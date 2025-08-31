
'use client';
import { useState, useRef, forwardRef, useCallback } from 'react';
import { newsData, newsCategories } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
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
import LanguageSwitcher from '@/components/language-switcher';
import Header from '@/components/layout/header';

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
    <Image
      src="/ai photo.png"
      alt="AI Icon"
      width={60}
      height={60}
      className="h-full w-full rounded-full object-cover"
      data-ai-hint="ai logo"
    />
  ),
  user: () => (
    <Image
      src="/images/farmers.png"
      alt="Farmer Icon"
      width={60}
      height={60}
      className="h-full w-full rounded-full object-cover"
      data-ai-hint="farmer icon"
    />
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
        "z-10 flex size-28 items-center justify-center rounded-full border-2 bg-card p-0 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const translations = {
  en: {
    welcome: "Welcome to AgriVision AI",
    tagline: "Revolutionizing farming with the power of Artificial Intelligence.",
  },
  pa: {
    welcome: "ਐਗਰੀਵਿਜ਼ਨ AI ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
    tagline: "ਆਰਟੀਫੀਸ਼ੀਅਲ ਇੰਟੈਲੀਜੈਂਸ ਦੀ ਸ਼ਕਤੀ ਨਾਲ ਖੇਤੀਬਾੜੀ ਵਿੱਚ ਕ੍ਰਾਂਤੀ।",
  },
  ta: {
    welcome: "அக்ரிவிஷன் AI-க்கு வரவேற்கிறோம்",
    tagline: "செயற்கை நுண்ணறிவு சக்தியுடன் விவசாயத்தில் புரட்சி.",
  },
  te: {
    welcome: "అగ్రివిజన్ AIకి స్వాగతం",
    tagline: "కృత్రిమ మేధస్సు శక్తితో వ్యవసాయంలో విప్లవం.",
  },
  bn: {
    welcome: "এগ্রিভিশন AI-তে স্বাগতম",
    tagline: "কৃত্রিম বুদ্ধিমত্তার শক্তি দিয়ে কৃষিতে বিপ্লব।",
  },
  mr: {
    welcome: "ऍग्रिव्हिजन AI मध्ये आपले स्वागत आहे",
    tagline: "कृत्रिम बुद्धिमत्तेच्या सामर्थ्याने शेतीत क्रांती.",
  },
};


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [language, setLanguage] = useState<'en' | 'pa' | 'ta' | 'te' | 'bn' | 'mr'>('en');

  const containerRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const aiIconRef = useRef<HTMLDivElement>(null);

  const filteredNews: NewsArticle[] =
    selectedCategory === 'All Categories'
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang as 'en' | 'pa' | 'ta' | 'te' | 'bn' | 'mr');
  }, []);

  return (
    <>
    <Header onLanguageChange={handleLanguageChange} showLanguageSwitcher={false} />
    <div className="container mx-auto px-4 pt-8">
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
      <section ref={containerRef} className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-card/50 flex justify-center p-4 md:p-8 pt-16 shadow-inner">

        <div className="flex w-full items-stretch justify-between gap-10 max-w-2xl">
          <div className="flex flex-col justify-start items-center">
             <Circle ref={userIconRef}>
              <Icons.user />
            </Circle>
          </div>
          <div className="flex flex-col justify-start items-center">
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
              text={translations[language].welcome}
              minFontSize={48}
              textColor='hsl(var(--foreground))'
            />
          </div>
           <div className='h-10 pb-2'>
            <TextPressure
                text={translations[language].tagline}
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
    </>
  );
}
