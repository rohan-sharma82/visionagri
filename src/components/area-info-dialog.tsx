
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { soilTypeExplanations, indianStatesData } from '@/lib/area-data';
import { fertilizerExplanations } from '@/lib/fertilizer-data';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from '@/hooks/use-translation';

export default function AreaInfoDialog() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="know-your-area-button mb-8">
            <span className="text">Quick Info</span>
            <span>Know Your Area</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t('areaInfo.title')}</DialogTitle>
          <DialogDescription>
            {t('areaInfo.description')}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="states" className="h-full flex flex-col overflow-hidden">
          <TabsList className="shrink-0">
            <TabsTrigger value="states">{t('areaInfo.tabs.states')}</TabsTrigger>
            <TabsTrigger value="soil">{t('areaInfo.tabs.soil')}</TabsTrigger>
            <TabsTrigger value="fertilizers">{t('areaInfo.tabs.fertilizers')}</TabsTrigger>
          </TabsList>
          <TabsContent value="states" className="flex-1 overflow-y-auto mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('areaInfo.states.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {indianStatesData.map((state) => (
                      <AccordionItem value={state.name} key={state.name}>
                        <AccordionTrigger>{t(state.name)}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              <strong>{t('areaInfo.states.avgRainfall')}:</strong> {t(state.rainfall)}
                            </p>
                            <p>
                              <strong>{t('areaInfo.states.avgTemp')}:</strong> {t(state.temperature)}
                            </p>
                            <p>
                              <strong>{t('areaInfo.states.soilTypes')}:</strong>{' '}
                              {state.soilTypes.map(st => t(st)).join(', ')}
                            </p>
                            {state.notes && (
                              <p className="text-sm text-muted-foreground">
                                <strong>{t('areaInfo.states.note')}:</strong> {t(state.notes)}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="soil" className="flex-1 overflow-y-auto mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('areaInfo.soil.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <div className="space-y-4">
                    {soilTypeExplanations.map((soil) => (
                      <div key={soil.name}>
                        <p>
                          <strong className="text-foreground">{t(soil.name)}:</strong>{' '}
                          {t(soil.description)}
                        </p>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fertilizers" className="flex-1 overflow-y-auto mt-4">
             <Card>
              <CardHeader>
                <CardTitle>{t('areaInfo.fertilizers.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <div className="space-y-4">
                    {fertilizerExplanations.map((fert) => (
                      <div key={fert.name}>
                        <p>
                          <strong className="text-foreground">{t(fert.name)}:</strong>{' '}
                          <span className="whitespace-pre-wrap">{t(fert.description)}</span>
                        </p>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
