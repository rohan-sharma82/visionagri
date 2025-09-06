
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
import { regionalUnitsData } from '@/lib/area-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LandUnitConverter from '@/components/land-unit-converter';


const UnitSection = ({
  title,
  description,
  conversion,
}: {
  title: string;
  description: string;
  conversion: string;
}) => (
  <div className="mb-4 rounded-md border p-4">
    <h4 className="font-bold text-lg mb-1 text-primary">{title}</h4>
    <p className="text-base text-muted-foreground mb-2">{description}</p>
    <p className="text-base font-semibold whitespace-pre-wrap">{conversion}</p>
  </div>
);

export default function AreaCalculatorPage() {
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
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('farmSchool.areaCalculator.title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.areaCalculator.pageSubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Alert className="mb-8 relative z-0">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{t('farmSchool.areaCalculator.disclaimer.title')}</AlertTitle>
            <AlertDescription>
              {t('farmSchool.areaCalculator.disclaimer.description')}
            </AlertDescription>
          </Alert>

          <div className="flex justify-center mb-8">
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" className="button-3d-pink">
                      <div className="button-top">{t('farmSchool.areaCalculator.converter.button')}</div>
                      <div className="button-bottom"></div>
                      <div className="button-base"></div>
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{t('farmSchool.areaCalculator.converter.title')}</DialogTitle>
                        <DialogDescription>
                            {t('farmSchool.areaCalculator.converter.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 min-h-0">
                      <LandUnitConverter />
                    </div>
                </DialogContent>
            </Dialog>
          </div>

          <Accordion type="single" collapsible className="w-full" defaultValue="north-india">
            {regionalUnitsData.map((region) => (
              <AccordionItem value={region.id} key={region.id}>
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                  {region.region}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg space-y-4">
                  {region.units.map(unit => (
                    <UnitSection key={unit.name} {...unit} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
