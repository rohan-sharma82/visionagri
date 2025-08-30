
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

export default function AreaInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button type1 mb-8"></button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Know Your Area</DialogTitle>
          <DialogDescription>
            Use this information to fill out the form. Real-time weather data will be fetched automatically based on your location.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="states" className="h-full flex flex-col overflow-hidden">
          <TabsList className="shrink-0">
            <TabsTrigger value="states">State-wise Data</TabsTrigger>
            <TabsTrigger value="soil">Soil Types</TabsTrigger>
            <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          </TabsList>
          <TabsContent value="states" className="flex-1 overflow-y-auto mt-4">
            <Card>
              <CardHeader>
                <CardTitle>State-wise Static Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <Accordion type="single" collapsible className="w-full">
                    {indianStatesData.map((state) => (
                      <AccordionItem value={state.name} key={state.name}>
                        <AccordionTrigger>{state.name}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              <strong>Avg. Rainfall:</strong> {state.rainfall}
                            </p>
                            <p>
                              <strong>Avg. Temperature:</strong> {state.temperature}
                            </p>
                            <p>
                              <strong>Common Soil Types:</strong>{' '}
                              {state.soilTypes.join(', ')}
                            </p>
                            {state.notes && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Note:</strong> {state.notes}
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
                <CardTitle>Soil Type Explanations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <div className="space-y-4">
                    {soilTypeExplanations.map((soil) => (
                      <div key={soil.name}>
                        <p>
                          <strong className="text-foreground">{soil.name}:</strong>{' '}
                          {soil.description}
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
                <CardTitle>Common Fertilizer Explanations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[55vh] pr-4">
                  <div className="space-y-4">
                    {fertilizerExplanations.map((fert) => (
                      <div key={fert.name}>
                        <p>
                          <strong className="text-foreground">{fert.name}:</strong>{' '}
                          {fert.description}
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
