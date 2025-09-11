
'use client';
import * as React from 'react';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, TrendingUp, Zap, Wind, Info, Wheat, CheckCircle, AlertTriangle, ShieldAlert, Sun, CloudRain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AreaInfoDialog from '@/components/area-info-dialog';
import RotatingText from '@/components/ui/rotating-text';
import { useTranslation, useLocation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { soilTypeExplanations } from '@/lib/area-data';
import { Combobox } from '@/components/ui/combobox';
import { categorizedCropOptions } from '@/lib/constants';
import { Textarea } from '@/components/ui/textarea';
import { saveYieldPrediction } from './actions';

const formSchema = z.object({
  cropType: z.string().min(2, 'Crop type is required.'),
  soilType: z.string().min(2, 'Soil type is required.'),
  temperature: z.string().min(1, 'Temperature is required.'),
  rainfall: z.string().min(1, 'Rainfall is required.'),
  farmSizeValue: z.string().min(1, 'Farm size is required.'),
  farmSizeUnit: z.string().min(1, 'Please select a unit.'),
  fertilizerType: z.string().optional(),
  fertilizerAmount: z.string().optional(),
  irrigationMethod: z.string().optional(),
  additionalNotes: z.string().optional(),
});

const landUnits = ["Acres", "Hectares", "Killa", "Bigha", "Marla", "Guntha", "Cent"];

const fertilizerTypes = ["Urea", "DAP", "MOP", "SSP", "NPK", "Ammonium Sulphate"];


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
      temperature: '',
      rainfall: '',
      farmSizeValue: '',
      farmSizeUnit: 'Acres',
      fertilizerType: '',
      fertilizerAmount: '',
      irrigationMethod: '',
      additionalNotes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const combinedFarmSize = `${values.farmSizeValue} ${values.farmSizeUnit}`;
      const result = await predictCropYield({
        ...values,
        farmSize: combinedFarmSize,
      });
      setPrediction(result);
      // Removed saving prediction as auth is removed.
      // if (currentUser && result.predictedYield !== "N/A") {
      //     await saveYieldPrediction({
      //       ...result,
      //       cropType: values.cropType
      //     });
      // }
    } catch (error) {
      console.error('Error predicting crop yield:', error);
      toast({
        title: t('cropYield.toast.errorTitle'),
        description: t('cropYield.toast.errorDescription'),
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  }

  const rotatingTexts = [
    t('cropYield.rotatingTexts.knowledge'),
    t('cropYield.rotatingTexts.crops'),
    t('cropYield.rotatingTexts.prosperity'),
    t('cropYield.rotatingTexts.india'),
  ];

  const soilTypes = soilTypeExplanations.map(soil => t(soil.name));

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          {t('cropYield.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('cropYield.subtitle')}
        </p>
        <p className="mt-4 text-base font-semibold text-primary">
            {t('kisanCallCenter')}
        </p>
        <div className="mt-4 text-xl text-muted-foreground flex items-center justify-center space-x-2 font-merienda">
          <span>{t('growing')}</span>
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


      <div className="flex flex-col items-center gap-8 lg:gap-12">
        <div className="flex flex-col items-center gap-8 w-full max-w-lg">
           <div className="wrapper w-full">
            <div className="flex justify-center mb-4 flex-col items-center gap-4">
                <button className="tony-stark-button" alt="ML Model">
                  <i>M</i>
                  <i>L</i>
                  <i>&nbsp;</i>
                  <i>M</i>
                  <i>o</i>
                  <i>d</i>
                  <i>e</i>
                  <i>l</i>
                </button>
                <p className="text-sm text-muted-foreground -mt-2 text-center">Click &amp; use ML Model If This Form is Not Working</p>
                <AreaInfoDialog />
            </div>
                <div className="flip-card__inner mx-auto" style={{ minHeight: '350px' }}>
                  <div className="flip-card__front w-full p-4 md:p-6">
                    <div className="title">{t('cropYield.form.title')}</div>
                     <Form {...form}>
                        <form
                        id="crop-yield-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flip-card__form"
                        >
                            <FormField
                                control={form.control}
                                name="cropType"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <Combobox
                                        options={categorizedCropOptions}
                                        {...field}
                                        onChange={field.onChange}
                                        placeholder={t('cropYield.form.cropType.placeholder')}
                                        emptyMessage="No crop found."
                                        inputPlaceholder="Search crop..."
                                    />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="soilType"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="flip-card__input justify-between">
                                            <SelectValue placeholder={t('cropYield.form.soilType.label')} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {soilTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                    <Input className='flip-card__input' placeholder="Average Temperature (°C)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rainfall"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                    <Input className='flip-card__input' placeholder="Recent Rainfall (mm)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="farmSizeValue"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input type="number" className='flip-card__input' placeholder={t('cropYield.form.farmSize.label')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="farmSizeUnit"
                                    render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="flip-card__input justify-between">
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {landUnits.map(unit => (
                                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                            ))}
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                             <div className="grid grid-cols-2 gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="fertilizerType"
                                    render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="flip-card__input justify-between">
                                                    <SelectValue placeholder={t('cropYield.form.fertilizer.typePlaceholder')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fertilizerTypes.map(type => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fertilizerAmount"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input className='flip-card__input' placeholder="Amount (e.g., 50 kg/acre)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                             <FormField
                                control={form.control}
                                name="irrigationMethod"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                    <Input className='flip-card__input' placeholder={t('cropYield.form.irrigation.label')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="additionalNotes"
                                render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            className="flip-card__input"
                                            placeholder={t('cropYield.form.additionalNotes.placeholder')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                  </div>
                </div>
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
        
        <div className="w-full max-w-2xl mt-8">
            {isLoading && (
                <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg">{t('cropYield.status.loading')}</p>
                </div>
            )}
            {prediction && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-6"
                >
                <Card className="shadow-xl bg-gradient-to-br from-card to-secondary/20">
                    <CardHeader>
                    <CardTitle className="text-2xl text-foreground">{t('cropYield.results.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-primary/10">
                        <TrendingUp className="h-8 w-8 mt-1 text-primary" />
                        <div>
                        <h3 className="font-semibold text-primary">{t('cropYield.results.predictedYield')}</h3>
                        <p className="text-2xl font-bold text-foreground">{prediction.predictedYield}</p>
                        <p className="text-sm text-muted-foreground">{t('cropYield.results.confidence')}: {prediction.confidenceLevel}</p>
                        </div>
                    </div>

                    <Separator />
                    <div className="flex items-start space-x-4">
                        <Info className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                        <div>
                        <h3 className="font-semibold text-primary">{t('cropYield.results.analysis')}</h3>
                        <p className="mt-1 whitespace-pre-wrap text-foreground">{prediction.yieldAnalysis}</p>
                        </div>
                    </div>
                    
                    {prediction.fertilizerSuitability && (
                        <>
                        <Separator />
                        <div className="flex items-start space-x-4">
                             {prediction.fertilizerSuitability.includes("not ideal") || prediction.fertilizerSuitability.includes("not recommended") ? (
                                <AlertTriangle className="h-6 w-6 mt-1 flex-shrink-0 text-destructive" />
                             ) : (
                                <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0 text-green-600" />
                             )}
                             <div>
                                <h3 className="font-semibold text-primary">{t('cropYield.results.fertilizerSuitability')}</h3>
                                <p className="mt-1 whitespace-pre-wrap text-foreground">{prediction.fertilizerSuitability}</p>
                             </div>
                        </div>
                        </>
                    )}

                    <div className="flex items-start space-x-4">
                        <Wind className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                        <div>
                        <h3 className="font-semibold text-primary">{t('cropYield.results.factors')}</h3>
                        <ul className="list-disc pl-5 mt-1 text-foreground">
                            {prediction.factorsInfluencingYield.map((factor, index) => (
                            <li key={index}>{factor}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Zap className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                        <div>
                        <h3 className="font-semibold text-primary">{t('cropYield.results.actions')}</h3>
                        <ul className="list-disc pl-5 mt-1 text-foreground">
                            {prediction.suggestedActions.map((action, index) => {
                            const parts = action.split(/:(.*)/s);
                            const heading = parts[0];
                            const body = parts[1];
                            return (
                            <li key={index}>
                                <strong>{heading}:</strong>
                                {body}
                            </li>
                            )})}
                        </ul>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-4">
                        <Wheat className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                        <div>
                        <h3 className="font-semibold text-primary">{t('cropYield.results.idealValues')}</h3>
                        <div className="mt-1 space-y-1 text-foreground">
                            <p><strong>{t('cropYield.form.fertilizer.label')}:</strong> {prediction.idealValues.fertilizer}</p>
                            <p><strong>{t('cropYield.form.irrigation.label')}:</strong> {prediction.idealValues.irrigation}</p>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>

                 {prediction.contingencyPlan && (
                    <Card className="shadow-xl bg-destructive/5 border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-destructive flex items-center gap-2">
                                <ShieldAlert />
                                Contingency Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {prediction.contingencyPlan.heavyRain && (
                                <div className="flex items-start gap-3">
                                    <CloudRain className="h-5 w-5 mt-1 text-blue-500" />
                                    <div>
                                        <h4 className="font-semibold">Heavy Rain / Waterlogging</h4>
                                        <p className="text-sm text-foreground whitespace-pre-wrap">{prediction.contingencyPlan.heavyRain}</p>
                                    </div>
                                </div>
                            )}
                            {prediction.contingencyPlan.droughtOrHeatwave && (
                                <div className="flex items-start gap-3">
                                    <Sun className="h-5 w-5 mt-1 text-orange-500" />
                                    <div>
                                        <h4 className="font-semibold">Drought / Heatwave</h4>
                                        <p className="text-sm text-foreground whitespace-pre-wrap">{prediction.contingencyPlan.droughtOrHeatwave}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                 )}

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
