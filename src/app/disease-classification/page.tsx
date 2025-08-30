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
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, HeartPulse, CheckCircle, AlertTriangle, Upload, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function DiseaseClassificationPage() {
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
        title: 'No file selected',
        description: 'Please upload an image of a crop leaf.',
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
        title: 'Classification Failed',
        description: 'Could not analyze the image. Please try another one.',
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">Crop Disease Classification</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload an image of a crop leaf to detect diseases early.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>For best results, use a clear, close-up image of a single leaf.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
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
                  Analyzing...
                </>
              ) : (
                'Classify Disease'
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">AI is inspecting the leaf...</p>
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
                  <CardTitle className="text-2xl">Diagnosis Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-primary/10">
                    {getDiseaseIcon(result.disease)}
                    <div>
                      <h3 className="font-semibold text-foreground">Diagnosis</h3>
                      <p className="text-2xl font-bold text-primary capitalize">{result.disease}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                       <BarChart className="h-5 w-5 text-accent" />
                       <h3 className="font-semibold text-foreground">Confidence Level</h3>
                    </div>
                    <Progress value={result.confidence * 100} className="w-full h-3" />
                    <p className="text-right text-sm text-muted-foreground mt-1">
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                  
                  {result.additionalDetails && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Additional Details & Recommendations</h3>
                      <p className="text-muted-foreground">{result.additionalDetails}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">Upload an image to get a diagnosis.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
