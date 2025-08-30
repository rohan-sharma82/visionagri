
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
import AreaInfoDialog from '@/components/area-info-dialog';
import FallingText from '@/components/falling-text';

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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 h-48">
        <FallingText
          text="Crop Yield Prediction. Leverage AI to forecast your harvest and optimize your strategy."
          highlightWords={["Crop", "Yield", "Prediction", "AI"]}
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="2rem"
          mouseConstraintStiffness={0.2}
        />
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-12">
        <div className="farm-data-form-container w-full max-w-2xl">
           <AreaInfoDialog />
          <Form {...form}>
            <form
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
                <p className="mt-4 text-lg">Your yield prediction will appear here.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
