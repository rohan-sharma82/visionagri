
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
import { useTranslation } from '@/hooks/use-translation';
import en from '@/locales/en.json';

// Helper function to safely access nested properties from the translation object
const getEnglishTranslation = (path: string): string => {
  const keys = path.split('.');
  let result: any = en;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key if path is not found
    }
  }
  return typeof result === 'string' ? result : path;
};

const GovtSchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
  const { t } = useTranslation(); // For "Read More" button

  // Directly access the English translations from the imported en.json
  const englishName = getEnglishTranslation(scheme.name);
  const englishShortName = getEnglishTranslation(scheme.shortName);
  const englishShortDescription = getEnglishTranslation(scheme.shortDescription);
  const englishDescription = getEnglishTranslation(scheme.description);

  return (
    <Dialog>
      <div className="govt-scheme-card">
        <div className="govt-scheme-card__image-container">
           <div className="relative w-[300px] h-[200px]">
            <Image
                src={scheme.imageUrl}
                alt={englishName}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={scheme.dataAiHint}
            />
           </div>
        </div>
        <div className="govt-scheme-card__content">
          <p className="govt-scheme-card__title">{englishShortName}</p>
          <p className="govt-scheme-card__description">{englishShortDescription}</p>
          <DialogTrigger asChild>
            <button className="govt-scheme-card__button">{t('govtSchemes.readMore')}</button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="max-w-2xl h-[70vh]">
        <DialogHeader>
          <DialogTitle>{englishName}</DialogTitle>
          <DialogDescription>
            {t('govtSchemes.dialogDescription', { schemeName: englishShortName })}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div
            className="prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: englishDescription }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function GovtSchemesPage() {
  const { t } = useTranslation();
  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          {t('govtSchemes.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('govtSchemes.subtitle')}
        </p>
         <p className="mt-4 text-base font-semibold text-primary">
            {t('kisanCallCenter')}
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
    </>
  );
}
