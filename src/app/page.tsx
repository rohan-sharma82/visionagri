'use client';
import { FarmerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { newsData } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative h-[60vh] w-full overflow-hidden rounded-xl bg-primary/10 flex items-center justify-center p-4 md:p-8 shadow-inner">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 z-10">
          <Image
            src="/farmer.png"
            alt="Farmer in a field"
            width={160}
            height={160}
            className="md:h-40 md:w-40"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0">
          <svg
            width="250"
            height="4"
            className="overflow-visible"
          >
            <path
              d="M0 2 H250"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="250"
              strokeDashoffset="250"
              className="[animation:draw-line_2s_ease-out_1s_forwards]"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 z-10">
          <h1 className="text-5xl md:text-8xl font-bold text-primary font-headline animate-pulse">
            AI
          </h1>
        </div>
        
        <div className="absolute bottom-8 text-center w-full px-4">
          <h2 className="text-2xl md:text-4xl font-bold font-headline text-foreground">
            Welcome to AgriVision AI
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Revolutionizing farming with the power of Artificial Intelligence.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center font-headline text-foreground">
          Agriculture News Feed
        </h2>
        <p className="mt-2 text-lg text-center text-muted-foreground mb-8">
          Stay updated with the latest in the world of agriculture.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news) => (
            <Card key={news.id} className="flex flex-col">
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
          ))}
        </div>
      </section>
    </div>
  );
}
