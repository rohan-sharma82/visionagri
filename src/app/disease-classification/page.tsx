
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  classifyCropDisease,
  ClassifyCropDiseaseOutput,
} from '@/ai/flows/crop-disease-classification';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2, HeartPulse, CheckCircle, AlertTriangle, Upload, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/use-translation';

export default function DiseaseClassificationPage() {
  const { t } = useTranslation();
  const [result, setResult] = useState<ClassifyCropDiseaseOutput | null>(null);
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
      setResult(null); // Reset previous result
    }
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      toast({
        title: t('diseaseClassification.toast.noFile.title'),
        description: t('diseaseClassification.toast.noFile.description'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const classificationResult = await classifyCropDisease({ photoDataUri: preview });
      setResult(classificationResult);
    } catch (error) {
      console.error('Error classifying crop disease:', error);
      toast({
        title: t('diseaseClassification.toast.failure.title'),
        description: t('diseaseClassification.toast.failure.description'),
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };
  
  const getDiseaseIcon = (disease: string | undefined) => {
    if (!disease) return <HeartPulse className="h-8 w-8 text-primary" />;
    return disease.toLowerCase() === 'healthy' ? (
      <CheckCircle className="h-8 w-8 text-green-500" />
    ) : (
      <AlertTriangle className="h-8 w-8 text-destructive" />
    );
  };

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">{t('diseaseClassification.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('diseaseClassification.subtitle')}
        </p>
         <p className="mt-4 text-base font-semibold text-primary">
            {t('kisanCallCenter')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t('diseaseClassification.uploadCard.title')}</CardTitle>
            <CardDescription>{t('diseaseClassification.uploadCard.description')}</CardDescription>
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
                      {t('diseaseClassification.uploadCard.button')}
                      <input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                  </label>
              </div>
            </div>
            {preview && (
              <div className="mt-4 p-4 border-2 border-dashed rounded-lg flex justify-center items-center bg-muted/50">
                <Image
                  src={preview}
                  alt="Image preview"
                  width={400}
                  height={400}
                  className="rounded-md max-h-[400px] w-auto"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isLoading || !preview} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('diseaseClassification.buttons.analyzing')}
                </>
              ) : (
                t('diseaseClassification.buttons.classify')
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">{t('diseaseClassification.status.loading')}</p>
            </div>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="shadow-xl" style={{ backgroundColor: '#6096D3' }}>
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: 'white' }}>{t('diseaseClassification.reportCard.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-primary/10">
                    {getDiseaseIcon(result.disease)}
                    <div>
                      <h3 className="font-semibold" style={{ color: 'black' }}>{t('diseaseClassification.reportCard.diagnosis')}</h3>
                      <p className="text-2xl font-bold capitalize" style={{ color: 'black' }}>{result.disease}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <BarChart className="h-5 w-5 text-accent" />
                       <h3 className="font-semibold" style={{ color: 'black' }}>{t('diseaseClassification.reportCard.confidence')}</h3>
                    </div>
                    <Progress value={result.confidence * 100} className="w-full h-3" />
                    <p className="text-right text-sm mt-1" style={{ color: 'black' }}>
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                  
                  {result.additionalDetails && (
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'black' }}>{t('diseaseClassification.reportCard.details')}</h3>
                      <p className="text-black">{result.additionalDetails}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">{t('diseaseClassification.status.idle')}</p>
              </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
