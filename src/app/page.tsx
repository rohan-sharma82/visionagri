'use client';
import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { newsData, newsCategories } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TextPressure from '@/components/text-pressure';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredNews =
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
        <div className="absolute top-[30%] left-[10%] lg:left-1/4 -translate-y-1/2 z-10 bg-card rounded-full p-4 shadow-lg">
          <User className="h-24 w-24 md:h-32 md:w-32 text-muted-foreground" />
        </div>

        <div className="absolute top-[30%] left-[calc(10%_+_8rem)] lg:left-[calc(25%_+_9rem)] -translate-y-1/2 z-0 w-[calc(80%_-_16rem)] lg:w-[calc(50%_-_18rem)]">
          <svg
            width="100%"
            height="4"
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

        <div className="absolute top-[30%] right-[10%] lg:right-1/4 -translate-y-1/2 z-10">
          <h1 className="text-5xl md:text-8xl font-bold text-primary font-headline animate-pulse">
            AI
          </h1>
        </div>
        
        <div className="absolute bottom-8 text-center w-full px-4">
          <div className='h-24'>
            <TextPressure
              text="Welcome to AgriVision AI"
              minFontSize={48}
              textColor='hsl(var(--foreground))'
            />
          </div>
          <div className='h-12'>
            <TextPressure
                text="Smarter Fields, Better Yields."
                minFontSize={24}
                textColor='hsl(var(--muted-foreground))'
                weight={false}
              />
          </div>
           <div className='h-10'>
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <motion.div
              key={news.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.source} - {news.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{news.snippet}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0">
                    <Link href={news.url} target="_blank">
                      Read More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        {filteredNews.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No news articles found in this category.
          </p>
        )}
      </section>
    </div>
  );
}
