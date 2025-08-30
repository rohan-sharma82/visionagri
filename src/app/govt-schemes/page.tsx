
'use client';
import { schemesData } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const GovtSchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
  return (
    <Dialog>
      <div className="govt-scheme-card">
        <div className="govt-scheme-card__image-container">
          <Image
            src={scheme.imageUrl}
            alt={scheme.name}
            width={150}
            height={150}
            data-ai-hint={scheme.dataAiHint}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="govt-scheme-card__content">
          <p className="govt-scheme-card__title">{scheme.shortName}</p>
          <p className="govt-scheme-card__description">{scheme.shortDescription}</p>
          <DialogTrigger asChild>
            <button className="govt-scheme-card__button">Read More</button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="max-w-2xl h-[70vh]">
        <DialogHeader>
          <DialogTitle>{scheme.name}</DialogTitle>
          <DialogDescription>
            Detailed information about the {scheme.shortName} scheme.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div
            className="prose prose-sm dark:prose-invert whitespace-pre-wrap"
          >
            {scheme.description}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function GovtSchemesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          Government Schemes for Farmers
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore beneficial programs and support from the government.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {schemesData.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GovtSchemeCard scheme={scheme} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
