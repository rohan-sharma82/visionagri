
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  predictCropYield,
  PredictCropYieldOutput,
} from '@/ai/flows/crop-yield-prediction';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, TrendingUp, Zap, Wind } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AreaInfoDialog from '@/components/area-info-dialog';
import RotatingText from '@/components/ui/rotating-text';
import Header from '@/components/layout/header';

const formSchema = z.object({
  cropType: z.string().min(2, 'Crop type is required.'),
  soilType: z.string().min(2, 'Soil type is required.'),
  location: z.string().min(2, 'Location is required.'),
  fertilizerUse: z.string().min(2, 'Fertilizer use is required.'),
  irrigationMethod: z.string().min(2, 'Irrigation method is required.'),
});

export default function CropYieldPage() {
  const [prediction, setPrediction] = useState<PredictCropYieldOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: '',
      soilType: '',
      location: '',
      fertilizerUse: '',
      irrigationMethod: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictCropYield(values);
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting crop yield:', error);
      toast({
        title: 'Error',
        description: 'Failed to get prediction. Please try again.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  }

  return (
    <>
    <Header showLanguageSwitcher={false} />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          Crop Yield Prediction
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Leverage AI to forecast your harvest and optimize your strategy.
        </p>
        <div className="mt-4 text-xl text-muted-foreground flex items-center justify-center space-x-2 font-merienda">
          <span>Growing</span>
          <div className="w-40">
            <RotatingText
              texts={[
                'knowledge.',
                'crops.',
                'prosperity.',
                'India.',
              ]}
              mainClassName="text-white bg-[#2461F0]/80 overflow-hidden py-1 px-2 justify-center rounded-md"
              staggerFrom={'last'}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-12">
        <div className="farm-data-form-container w-full max-w-2xl">
           <AreaInfoDialog />
          <Form {...form}>
            <form
              id="crop-yield-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 farm-data-form"
            >
              <h2 className="form-label font-margarine">ENTER DETAILS</h2>
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wheat, Corn, Soybeans" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Loamy, Sandy, Clay" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Delhi, India" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fertilizerUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fertilizer Use (kg/hectare)</FormLabel>
                    <FormControl>
                     <Input placeholder="e.g., NPK 120-60-60" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="irrigationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Irrigation Method</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Drip, Sprinkler, Canal" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="w-full flex justify-center mt-4">
             <div className="voltage-button">
              <button type="submit" form="crop-yield-form" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    Predicting...
                  </>
                ) : (
                  'Predict Yield'
                )}
              </button>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 234.6 61.3" preserveAspectRatio="none" xmlSpace="preserve">
                <path className="voltage line-1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff"></path>
                <path className="voltage line-2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff"></path>
              </svg>
              <div className="dots">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
                <div className="dot dot-4"></div>
                <div className="dot dot-5"></div>
              </div>
            </div>
        </div>

        <div className="flex items-center justify-center w-full max-w-2xl mt-8">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">Your smart assistant is walking through the fields…</p>
              <p className="text-md">Fetching live weather data</p>
            </div>
          )}
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="shadow-xl bg-gradient-to-br from-card to-secondary">
                <CardHeader>
                  <CardTitle className="text-2xl">AI Prediction Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-primary/10">
                    <TrendingUp className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Predicted Yield</h3>
                      <p className="text-2xl font-bold text-primary">{prediction.predictedYield}</p>
                      <p className="text-sm text-muted-foreground">Confidence: {prediction.confidenceLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Wind className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Influencing Factors</h3>
                      <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                        {prediction.factorsInfluencingYield.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Zap className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Suggested Actions</h3>
                      <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                        {prediction.suggestedActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !prediction && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">AI is ready to calculate your harvest — just hit predict.</p>
              </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
