
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/layout/header';
import { useTranslation } from '@/hooks/use-translation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toolsData } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const Section = ({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) => (
  <div className="mb-4">
    <h3 className="font-semibold text-lg mb-2 text-primary">{title}:</h3>
    {Array.isArray(content) ? (
      <ul className="list-disc list-inside space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>{content}</p>
    )}
  </div>
);

const ImageGallery = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2 text-primary">Gallery:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  src={src}
                  alt={`Tool image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-auto">
              <div className="relative aspect-video">
                <Image
                  src={src}
                  alt={`Tool image ${index + 1}`}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default function FarmToolsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link href="/farm-school" className="absolute top-24 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('features.farmSchool.tools.title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('features.farmSchool.tools.description')}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            {toolsData.map((tool) => (
              <AccordionItem value={tool.id} key={tool.id}>
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                  {tool.name}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                  <p className="italic mb-4">{tool.content.introduction}</p>
                  <Section title="Functions" content={tool.content.functions} />
                  <Section
                    title="How It Works"
                    content={tool.content.howItWorks}
                  />
                  <Section title="Benefits" content={tool.content.benefits} />
                  <Section
                    title="Limitations"
                    content={tool.content.limitations}
                  />
                  <Section title="Types" content={tool.content.types} />
                  <Section
                    title="Approximate Price (India)"
                    content={tool.content.price}
                  />
                  <ImageGallery images={tool.images} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </>
  );
}
