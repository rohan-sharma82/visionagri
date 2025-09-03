
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
          <div className="default-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth="2"
              stroke="#FFF"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle r="3" cy="12" cx="12"></circle>
            </svg>
            <span>Quick Info</span>
          </div>
          <div className="hover-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth="2"
              stroke="#ffd300"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <circle r="1" cy="21" cx="9"></circle>
              <circle r="1" cy="21" cx="20"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>{t('cropYield.buttons.areaInfo')}</span>
          </div>
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
