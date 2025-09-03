
'use client';
import { useState, useEffect } from 'react';
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
import { Loader2, TrendingUp, Zap, Wind, Info, Wheat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AreaInfoDialog from '@/components/area-info-dialog';
import RotatingText from '@/components/ui/rotating-text';
import Header from '@/components/layout/header';
import { useTranslation, useLocation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  cropType: z.string().min(2, 'Crop type is required.'),
  soilType: z.string().min(2, 'Soil type is required.'),
  location: z.string().min(2, 'Location is required.'),
  farmSize: z.string().min(1, 'Farm size is required.'),
  fertilizerUse: z.string().optional(),
  irrigationMethod: z.string().optional(),
});

export default function CropYieldPage() {
  const { t } = useTranslation();
  const { location } = useLocation();
  const [prediction, setPrediction] = useState<PredictCropYieldOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: '',
      soilType: '',
      location: location || '',
      farmSize: '',
      fertilizerUse: '',
      irrigationMethod: '',
    },
  });

  useEffect(() => {
    if (location) {
        form.setValue('location', location);
    }
  }, [location, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictCropYield(values);
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting crop yield:', error);
      toast({
        title: t('cropYield.toast.errorTitle'),
        description: t('cropYield.toast.errorDescription'),
        variant: 'destructive',
      });
      form.reset();
    }
    setIsLoading(false);
  }

  const rotatingTexts = [
    t('cropYield.rotatingTexts.knowledge'),
    t('cropYield.rotatingTexts.crops'),
    t('cropYield.rotatingTexts.prosperity'),
    t('cropYield.rotatingTexts.india'),
  ];

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          {t('cropYield.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('cropYield.subtitle')}
        </p>
        <p className="mt-4 text-base font-semibold text-primary">
            Kisan Call Center -&gt; 1800-180-1551
        </p>
        <div className="mt-4 text-xl text-muted-foreground flex items-center justify-center space-x-2 font-merienda">
          <span>{t('cropYield.growing')}</span>
          <div className="w-40">
            <RotatingText
              texts={rotatingTexts}
              mainClassName="text-white bg-green-500/80 overflow-hidden py-1 px-2 justify-center rounded-md"
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


      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="flex flex-col items-center gap-8">
            <div className="farm-data-form-container w-full">
                <AreaInfoDialog />
                <div className="rays" />
                <Form {...form}>
                    <form
                    id="crop-yield-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="farm-data-form"
                    >
                        <div className="form-label">{t('cropYield.form.title')}</div>

                        <FormField
                            control={form.control}
                            name="cropType"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('cropYield.form.cropType.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.cropType.placeholder')} {...field} />
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
                                <FormLabel>{t('cropYield.form.soilType.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.soilType.placeholder')} {...field} />
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
                                <FormLabel>{t('cropYield.form.location.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.location.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="farmSize"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('cropYield.form.farmSize.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.farmSize.placeholder')} {...field} />
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
                                <FormLabel>{t('cropYield.form.fertilizer.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.fertilizer.placeholder')} {...field} />
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
                                <FormLabel>{t('cropYield.form.irrigation.label')}</FormLabel>
                                <FormControl>
                                <Input className='form-content' placeholder={t('cropYield.form.irrigation.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className="voltage-button">
                <button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                            {t('cropYield.buttons.predicting')}
                        </>
                        ) : (
                        t('cropYield.buttons.predict')
                    )}
                </button>
            </div>
        </div>
        

        <div className="flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">{t('cropYield.status.loading')}</p>
              <p className="text-md">{t('cropYield.status.fetchingWeather')}</p>
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
                  <CardTitle className="text-2xl">{t('cropYield.results.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-primary/10">
                    <TrendingUp className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t('cropYield.results.predictedYield')}</h3>
                      <p className="text-2xl font-bold text-primary">{prediction.predictedYield}</p>
                      <p className="text-sm text-muted-foreground">{t('cropYield.results.confidence')}: {prediction.confidenceLevel}</p>
                    </div>
                  </div>
                   <Separator />
                   <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t('cropYield.results.analysis')}</h3>
                      <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{prediction.yieldAnalysis}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Wind className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t('cropYield.results.factors')}</h3>
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
                      <h3 className="font-semibold text-foreground">{t('cropYield.results.actions')}</h3>
                      <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                        {prediction.suggestedActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                   <Separator />
                   <div className="flex items-start space-x-4">
                    <Wheat className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{t('cropYield.results.idealValues')}</h3>
                      <div className="mt-1 text-muted-foreground space-y-1">
                        <p><strong>{t('cropYield.form.fertilizer.label')}:</strong> {prediction.idealValues.fertilizer}</p>
                        <p><strong>{t('cropYield.form.irrigation.label')}:</strong> {prediction.idealValues.irrigation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {!isLoading && !prediction && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg">{t('cropYield.status.idle')}</p>
              </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
