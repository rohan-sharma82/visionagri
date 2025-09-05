
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

const GovtSchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <div className="govt-scheme-card">
        <div className="govt-scheme-card__image-container">
           <div className="relative w-[300px] h-[200px]">
            <Image
                src={scheme.imageUrl}
                alt={t(scheme.name)}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={scheme.dataAiHint}
            />
           </div>
        </div>
        <div className="govt-scheme-card__content">
          <p className="govt-scheme-card__title">{t(scheme.shortName)}</p>
          <p className="govt-scheme-card__description">{t(scheme.shortDescription)}</p>
          <DialogTrigger asChild>
            <button className="govt-scheme-card__button">{t('govtSchemes.readMore')}</button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="max-w-2xl h-[70vh]">
        <DialogHeader>
          <DialogTitle>{t(scheme.name)}</DialogTitle>
          <DialogDescription>
            {t('govtSchemes.dialogDescription', { schemeName: t(scheme.shortName) })}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div
            className="prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: t(scheme.description) }}
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
            Kisan Call Center -&gt; 1800-180-1551
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
