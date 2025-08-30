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
import { Button } from '@/components/ui/button';
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

const formSchema = z.object({
  cropType: z.string().min(2, 'Crop type is required.'),
  soilType: z.string().min(2, 'Soil type is required.'),
  rainfall: z.string().min(1, 'Rainfall is required.'),
  temperature: z.string().min(1, 'Temperature is required.'),
  fertilizerUse: z.string().min(2, 'Fertilizer use is required.'),
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
      rainfall: '',
      temperature: '',
      fertilizerUse: '',
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">Crop Yield Prediction</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Leverage AI to forecast your harvest and optimize your strategy.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-12">
        <div className="farm-data-form-container w-full max-w-2xl">
           <button className="button type1 mb-8"></button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 farm-data-form"
            >
              <h2 className="form-label">Farm Data</h2>
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
                name="rainfall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Rainfall (mm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 750" {...field} className="form-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avg. Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 25" {...field} className="form-content" />
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
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    Predicting...
                  </>
                ) : (
                  'Predict Yield'
                )}
              </button>
            </form>
          </Form>
        </div>


        <div className="flex items-center justify-center w-full max-w-2xl">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">Analyzing data and consulting the almanac...</p>
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
                    <Wind className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Influencing Factors</h3>
                      <p className="text-muted-foreground">{prediction.factorsInfluencingYield}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Zap className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Suggested Actions</h3>
                      <p className="text-muted-foreground">{prediction.suggestedActions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !prediction && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">Your yield prediction will appear here.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
