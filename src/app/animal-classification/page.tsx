
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
} from '@/components/ui/card';
import { Loader2, PawPrint, Upload, BarChart, Info, Lightbulb, Milk, Scale, Thermometer, Globe, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">{t('animalClassification.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('animalClassification.subtitle')}
        </p>
         <p className="mt-4 text-base font-semibold text-primary">
            {t('kisanCallCenter')}
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/animal-comparison">
            <button className="action-button-3d">{t('animalClassification.buttons.compare')}</button>
          </Link>
          <Link href="/find-veterinarian">
            <button className="action-button-3d">{t('animalClassification.buttons.findVet')}</button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-12 mt-12">
        <div className='flex flex-col items-center gap-4 w-full max-w-lg'>
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
                <div className="text">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        {t('animalClassification.buttons.identifying')}
                    </>
                    ) : (
                      t('animalClassification.buttons.classify')
                    )}
                </div>
            </button>
        </div>


        <div className="flex flex-col items-center justify-center w-full max-w-2xl min-h-[400px] gap-4">
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
              <Card className="shadow-xl bg-[#80392A]/80 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('animalClassification.reportCard.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/10">
                    <PawPrint className="h-8 w-8 text-white" />
                    <div>
                      <h3 className="font-semibold">{t('animalClassification.reportCard.species')}</h3>
                      <p className="text-2xl font-bold capitalize">{result.animalSpecies}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <BarChart className="h-5 w-5 text-white/80" />
                       <h3 className="font-semibold">{t('animalClassification.reportCard.confidence')}</h3>
                    </div>
                    <Progress value={result.confidence * 100} className="w-full h-3 bg-white/30" />
                    <p className="text-right text-sm text-white/80 mt-1">
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                   <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <Info className="h-5 w-5 text-white/80" />
                       <h3 className="font-semibold">{t('animalClassification.reportCard.description')}</h3>
                    </div>
                    <p className="text-sm text-white/90">{result.description}</p>
                  </div>

                  {result.breedInfo && (
                     <div>
                        <h3 className="font-semibold text-lg mb-3">{t('animalClassification.reportCard.breedInfo')}</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                            {result.breedInfo.localNames && <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-white" /> <strong>{t('animalClassification.reportCard.localNames')}:</strong> {result.breedInfo.localNames}</div>}
                            {result.breedInfo.origin && <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-white" /> <strong>{t('animalClassification.reportCard.origin')}:</strong> {result.breedInfo.origin}</div>}
                            {result.breedInfo.color && <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border" style={{ backgroundColor: result.breedInfo.color.split(',')[0].toLowerCase() }} /> <strong>{t('animalClassification.reportCard.color')}:</strong> {result.breedInfo.color}</div>}
                            {result.breedInfo.weight && <div className="flex items-center gap-2"><Scale className="h-4 w-4 text-white" /> <strong>{t('animalClassification.reportCard.weight')}:</strong> {result.breedInfo.weight}</div>}
                            {result.breedInfo.milkYield && <div className="flex items-center gap-2"><Milk className="h-4 w-4 text-white" /> <strong>{t('animalClassification.reportCard.milkYield')}:</strong> {result.breedInfo.milkYield}</div>}
                            {result.breedInfo.suitability && <div className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-white" /> <strong>{t('animalClassification.reportCard.suitability')}:</strong> {result.breedInfo.suitability}</div>}
                        </div>
                    </div>
                  )}

                  <div>
                     <div className="flex items-center space-x-3 mb-2">
                       <Lightbulb className="h-5 w-5 text-yellow-300" />
                       <h3 className="font-semibold">{t('animalClassification.reportCard.suggestion')}</h3>
                    </div>
                    <p className="bg-white/5 p-3 rounded-md border border-white/20 text-sm">{result.actionableSuggestion}</p>
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
