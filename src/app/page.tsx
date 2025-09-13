
'use client';
import { useState, useRef, forwardRef } from 'react';
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
import { useTranslation } from '@/hooks/use-translation';
import LanguageSwitcher from '@/components/language-switcher';
import FarmSchoolDialog from '@/components/farm-school-dialog';
import { Button } from '@/components/ui/button';

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


export default function Home() {
  const { t, setLanguage } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(9);

  const containerRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const aiIconRef = useRef<HTMLDivElement>(null);

  const translatedNewsData = newsData.map(item => ({ ...item, title: t(item.title), snippet: t(item.snippet) }));
  const translatedNewsCategories = newsCategories.map(c => t(c));

  const filteredNews: NewsArticle[] =
    selectedCategory === 'All Categories' || selectedCategory === t('categories.all')
      ? translatedNewsData
      : translatedNewsData.filter((news) => t(news.category) === selectedCategory);

  const handleLoadMore = () => {
    setVisibleNewsCount(filteredNews.length);
  };

  return (
    <>
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

        <div className="absolute inset-x-0 bottom-16 flex flex-col items-center justify-center gap-4 px-4">
            <div className="h-20 w-full pb-6">
              <TextPressure
                text={t('home.welcome')}
                minFontSize={24}
                maxFontSize={64}
                textColor='hsl(var(--foreground))'
              />
            </div>
             <div className="h-10 w-full">
              <TextPressure
                  text={t('home.tagline')}
                  minFontSize={12}
                  maxFontSize={24}
                  textColor='hsl(var(--muted-foreground))'
                  weight={false}
                />
            </div>
        </div>
      </section>
      
      <section className="mt-16 flex justify-center items-center gap-4">
        <LanguageSwitcher />
        <FarmSchoolDialog />
      </section>

      <section className="mt-16">
        <QuotesBox />
      </section>

      <section className="mt-16">
        <FeatureCards />
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center font-headline text-foreground">
          {t('home.newsFeed.title')}
        </h2>
        <p className="mt-2 text-lg text-center text-muted-foreground mb-8">
          {t('home.newsFeed.subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {translatedNewsCategories.map((category) => (
             <button key={category} onClick={() => { setSelectedCategory(category); setVisibleNewsCount(9); }} className="c-button c-button--gooey"> {category}
              <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
              </div>
            </button>
          ))}
        </div>
        <Dialog>
        <div className="grid gap-8 md:grid-cols-3 justify-items-center">
            {filteredNews.slice(0, visibleNewsCount).map((news) => (
              <motion.div
                key={news.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogTrigger asChild>
                  <div className="news-card cursor-pointer" onClick={() => setSelectedNews(news)}>
                    <div className="news-card-inner">
                        <div>
                            <p className="font-bold text-sm line-clamp-4">{news.title}</p>
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{news.snippet}</p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-4">
                            <p>{t(news.source)}</p>
                            <p>{t(news.date)}</p>
                        </div>
                    </div>
                  </div>
                </DialogTrigger>
              </motion.div>
            ))}
          </div>

          {selectedNews && (
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>{selectedNews.title}</DialogTitle>
                <DialogDescription>
                  {t('home.newsFeed.source')}: {t(selectedNews.source)} | {t('home.newsFeed.date')}: {t(selectedNews.date)}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-full pr-4">
                <div
                  className="prose prose-sm dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: t(selectedNews.article) }}
                />
              </ScrollArea>
            </DialogContent>
          )}
        </Dialog>
        
        {visibleNewsCount < filteredNews.length && (
          <div className="text-center mt-12">
            <Button onClick={handleLoadMore}>
              Load More News
            </Button>
          </div>
        )}

        {filteredNews.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            {t('home.newsFeed.noArticles')}
          </p>
        )}
      </section>
    </div>
    </>
  );
}
