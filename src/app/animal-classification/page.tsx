
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  animalClassification,
  AnimalClassificationOutput,
} from '@/ai/flows/animal-classification';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, PawPrint, Upload, BarChart, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import CircularGallery from '@/components/animal-gallery';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { useTranslation } from '@/hooks/use-translation';

const galleryImages = [
    { image: 'https://images.pexels.com/photos/30649600/pexels-photo-30649600.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/5205221/pexels-photo-5205221.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/16967639/pexels-photo-16967639.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/33545852/pexels-photo-33545852.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/20120620/pexels-photo-20120620.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/20120619/pexels-photo-20120619.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/31959161/pexels-photo-31959161.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/31151141/pexels-photo-31151141.jpeg', text: 'Animal' },
    { image: 'https://images.pexels.com/photos/21966880/pexels-photo-21966880.jpeg', text: 'Animal' },
  ];

export default function AnimalClassificationPage() {
  const { t } = useTranslation();
  const [result, setResult] = useState<AnimalClassificationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      toast({
        title: t('animalClassification.toast.noFileTitle'),
        description: t('animalClassification.toast.noFileDescription'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const classificationResult = await animalClassification({ photoDataUri: preview });
      setResult(classificationResult);
    } catch (error) {
      console.error('Error classifying animal:', error);
      toast({
        title: t('animalClassification.toast.failureTitle'),
        description: t('animalClassification.toast.failureDescription'),
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <>
    <Header showLanguageSwitcher={false} />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">{t('animalClassification.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('animalClassification.subtitle')}
        </p>
         <p className="mt-4 text-base font-semibold text-primary">
            Kisan Call Center -&gt; 1800-180-1551
        </p>
      </div>

      <div style={{ height: '400px', position: 'relative' }}>
        <CircularGallery items={galleryImages} bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start mt-12">
        <div className='flex flex-col items-center gap-4'>
            <Card className="shadow-lg w-full">
            <CardHeader>
                <CardTitle>{t('animalClassification.uploadCard.title')}</CardTitle>
                <CardDescription>{t('animalClassification.uploadCard.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center items-center py-8">
                <div className="folder-upload-container">
                    <div className="folder">
                    <div className="back-side"></div>
                    <div className="front-side">
                        <div className="tip"></div>
                        <div className="cover"></div>
                    </div>
                    </div>
                    <label htmlFor="picture" className="custom-file-upload">
                    {t('animalClassification.uploadCard.button')}
                    <input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    </label>
                </div>
                </div>
                {preview && (
                <div className="mt-4 p-4 border-2 border-dashed rounded-lg flex justify-center items-center bg-muted/50">
                    <Image
                    src={preview}
                    alt="Animal preview"
                    width={400}
                    height={400}
                    className="rounded-md max-h-[400px] w-auto"
                    />
                </div>
                )}
            </CardContent>
            </Card>
            <button onClick={handleSubmit} disabled={isLoading || !preview} className="slice">
                <span className="text">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        {t('animalClassification.buttons.identifying')}
                    </>
                    ) : (
                      t('animalClassification.buttons.classify')
                    )}
                </span>
            </button>
        </div>


        <div className="flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">{t('animalClassification.status.loading')}</p>
            </div>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="shadow-xl bg-gradient-to-br from-card to-secondary">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('animalClassification.reportCard.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-primary/10">
                    <PawPrint className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t('animalClassification.reportCard.species')}</h3>
                      <p className="text-2xl font-bold text-primary capitalize">{result.animalSpecies}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <BarChart className="h-5 w-5 text-accent" />
                       <h3 className="font-semibold text-foreground">{t('animalClassification.reportCard.confidence')}</h3>
                    </div>
                    <Progress value={result.confidence * 100} className="w-full h-3" />
                    <p className="text-right text-sm text-muted-foreground mt-1">
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                   <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <Info className="h-5 w-5 text-accent" />
                       <h3 className="font-semibold text-foreground">{t('animalClassification.reportCard.description')}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{result.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">{t('animalClassification.status.idle')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
