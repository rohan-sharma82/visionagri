'use client';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslation } from '@/hooks/use-translation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface WeatherAlert {
    headline: string;
    event: string;
    desc: string;
}

interface WeatherAlertsProps {
    alerts: WeatherAlert[];
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
    const { t } = useTranslation();

    if (!alerts || alerts.length === 0) {
        return null;
    }
    
    // Filter out duplicate alerts based on the 'event' property
    const uniqueAlerts = alerts.filter((alert, index, self) =>
        index === self.findIndex((a) => a.event === alert.event)
    );


    return (
        <Alert variant="destructive" className="bg-destructive/10 backdrop-blur-sm border-destructive/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('dashboard.weather.alerts.title')}</AlertTitle>
            <AlertDescription>
                 <Accordion type="multiple" className="w-full">
                    {uniqueAlerts.map((alert, index) => (
                         <AccordionItem value={`item-${index}`} key={index} className="border-b-destructive/50">
                            <AccordionTrigger className="hover:no-underline text-destructive text-base">
                               {alert.event}
                            </AccordionTrigger>
                            <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-destructive-foreground whitespace-pre-wrap">
                                <p><strong>{alert.headline}</strong></p>
                                <p>{alert.desc}</p>
                            </AccordionContent>
                         </AccordionItem>
                    ))}
                 </Accordion>
            </AlertDescription>
        </Alert>
    );
}
