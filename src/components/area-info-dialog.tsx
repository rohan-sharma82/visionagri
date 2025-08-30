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
import { Separator } from './ui/separator';

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
            Use this information to fill out the form more accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8 h-[calc(80vh-100px)]">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Soil Type Explanations</h3>
            <ScrollArea className="flex-1 pr-4">
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
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">State-wise Information</h3>
            <ScrollArea className="flex-1 pr-4">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
