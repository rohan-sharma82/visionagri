
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FactorAccordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
    const { t } = useTranslation();
    return (
        <AccordionItem value={title.toLowerCase().replace(/ /g, '-')}>
            <AccordionTrigger className="text-xl font-medium hover:no-underline">
            {t(title)}
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert max-w-none">
            {children}
            </AccordionContent>
        </AccordionItem>
    );
};

export default function CroppingPatternsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Link href="/farm-school" className="absolute top-24 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-headline text-foreground tracking-wide">
            {t('farmSchool.croppingPatterns.pageTitle')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.croppingPatterns.pageSubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
                <CardTitle style={{ color: '#E6FD9F' }}>{t('farmSchool.croppingPatterns.what_are_title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>{t('farmSchool.croppingPatterns.what_are_p1')}</p>
                <p>{t('farmSchool.croppingPatterns.what_are_p2')}</p>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle style={{ color: '#E6FD9F' }}>{t('farmSchool.croppingPatterns.types_title')}</CardTitle>
            </CardHeader>
             <CardContent className="prose dark:prose-invert max-w-none">
                <ul>
                    <li><strong>{t('farmSchool.croppingPatterns.type_mono')}</strong> {t('farmSchool.croppingPatterns.type_mono_desc')}</li>
                    <li><strong>{t('farmSchool.croppingPatterns.type_multiple')}</strong> {t('farmSchool.croppingPatterns.type_multiple_desc')}</li>
                    <li><strong>{t('farmSchool.croppingPatterns.type_mixed')}</strong> {t('farmSchool.croppingPatterns.type_mixed_desc')}</li>
                    <li><strong>{t('farmSchool.croppingPatterns.type_relay')}</strong> {t('farmSchool.croppingPatterns.type_relay_desc')}</li>
                </ul>
                <Alert>
                    <AlertTitle>{t('farmSchool.croppingPatterns.alert_title')}</AlertTitle>
                    <AlertDescription>
                        {t('farmSchool.croppingPatterns.alert_desc')}
                    </AlertDescription>
                </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle style={{ color: '#E6FD9F' }}>{t('farmSchool.croppingPatterns.factors_title')}</CardTitle>
                <CardDescription>{t('farmSchool.croppingPatterns.factors_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <FactorAccordion title="farmSchool.croppingPatterns.factor_geo_title">
                        <h4>{t('farmSchool.croppingPatterns.factor_geo_relief_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_geo_relief_p1')}</p>
                        <h4>{t('farmSchool.croppingPatterns.factor_geo_rainfall_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_geo_rainfall_p1')}</p>
                        <ul>
                            <li><strong>{t('farmSchool.croppingPatterns.factor_geo_rainfall_l1_title')}</strong> {t('farmSchool.croppingPatterns.factor_geo_rainfall_l1_desc')}</li>
                            <li><strong>{t('farmSchool.croppingPatterns.factor_geo_rainfall_l2_title')}</strong> {t('farmSchool.croppingPatterns.factor_geo_rainfall_l2_desc')}</li>
                            <li><strong>{t('farmSchool.croppingPatterns.factor_geo_rainfall_l3_title')}</strong> {t('farmSchool.croppingPatterns.factor_geo_rainfall_l3_desc')}</li>
                        </ul>
                        <h4>{t('farmSchool.croppingPatterns.factor_geo_soil_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_geo_soil_p1')}</p>
                    </FactorAccordion>
                     <FactorAccordion title="farmSchool.croppingPatterns.factor_eco_title">
                        <h4>{t('farmSchool.croppingPatterns.factor_eco_irrigation_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_eco_irrigation_p1')}</p>
                        <h4>{t('farmSchool.croppingPatterns.factor_eco_land_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_eco_land_p1')}</p>
                        <h4>{t('farmSchool.croppingPatterns.factor_eco_insurance_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_eco_insurance_p1')}</p>
                        <h4>{t('farmSchool.croppingPatterns.factor_eco_inputs_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_eco_inputs_p1')}</p>
                         <h4>{t('farmSchool.croppingPatterns.factor_eco_value_title')}</h4>
                        <p>{t('farmSchool.croppingPatterns.factor_eco_value_p1')}</p>
                    </FactorAccordion>
                    <FactorAccordion title="farmSchool.croppingPatterns.factor_pol_title">
                        <p>{t('farmSchool.croppingPatterns.factor_pol_p1')}</p>
                    </FactorAccordion>
                     <FactorAccordion title="farmSchool.croppingPatterns.factor_hist_title">
                        <p>{t('farmSchool.croppingPatterns.factor_hist_p1')}</p>
                        <p>{t('farmSchool.croppingPatterns.factor_hist_p2')}</p>
                    </FactorAccordion>
                </Accordion>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle style={{ color: '#E6FD9F' }}>{t('farmSchool.croppingPatterns.conclusion_title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>{t('farmSchool.croppingPatterns.conclusion_p1')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
