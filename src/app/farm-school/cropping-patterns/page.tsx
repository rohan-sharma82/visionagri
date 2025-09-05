
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map, Wind, Droplets, Sun, Globe } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FactorAccordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <AccordionItem value={title.toLowerCase().replace(/ /g, '-')}>
    <AccordionTrigger className="text-xl font-medium hover:no-underline">
      {title}
    </AccordionTrigger>
    <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert max-w-none">
      {children}
    </AccordionContent>
  </AccordionItem>
);

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
            Cropping Patterns in India
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            How and why different crops are grown across the diverse landscapes of India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="text-accent">What are Cropping Patterns?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The different crops grown in an area at a particular point in time are called cropping patterns. The cropping pattern in India depends on climate (temperature, rainfall, wind, etc.), soil, support price, value, demand-market, and labour availability.</p>
                <p>For instance, rice is cultivated extensively when the monsoons are good. But when monsoons are weak, millets are grown instead of rice. Also, due to highly favourable cultivation conditions, crops like Cotton in Maharashtra, Tea in Assam, and Jute in West Bengal remain the dominant crops.</p>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle className="text-accent">Types of Cropping Pattern in India</CardTitle>
            </CardHeader>
             <CardContent className="prose dark:prose-invert max-w-none">
                <ul>
                    <li><strong>Mono-cropping:</strong> Where the same crop is grown on the same land year after year.</li>
                    <li><strong>Multiple cropping:</strong> Involves growing two or more crops on the same land in a single year (further divided into intercropping, where different crops are grown together, and sequential cropping, where different crops are grown one after another).</li>
                    <li><strong>Mixed cropping:</strong> Where different crops are grown simultaneously on the same land without a distinct row arrangement.</li>
                    <li><strong>Relay cropping:</strong> A form of multiple cropping where the second crop is planted before the first crop is harvested.</li>
                </ul>
                <Alert>
                    <AlertTitle>Why Different Patterns?</AlertTitle>
                    <AlertDescription>
                    These patterns are adopted based on the need to maximise yield, optimise resource use, and manage risks such as crop failure due to pests or adverse weather conditions.
                    </AlertDescription>
                </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="text-accent">Factors Affecting Cropping Pattern in India</CardTitle>
                <CardDescription>The cropping pattern of any region depends upon many factors, which are detailed below.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <FactorAccordion title="Geographical Factors">
                        <h4>Relief</h4>
                        <p>Relief plays a vital role in deciding a region’s cropping pattern. Rice is the main crop on irrigated hill terraces (terraced cultivation). Also, crops like Tea and Coffee can be grown only on well-drained slopes with good rainfall. Rice (tropical crop) and Sugarcane dominate well-irrigated regions with warm climates. Wheat (temperate crop) grows well in regions with moderate temperatures and rainfall.</p>
                        <h4>Rainfall</h4>
                        <p>Rainfall is one of the significant determinants of a region’s cropping pattern. Variation in rainfall of different regions leads to different cropping patterns, which are as follows:</p>
                        <ul>
                            <li><strong>Areas of Heavy Rainfall:</strong> These areas receive more than 150 cm of annual rainfall. Major crops include rice, tea, coffee, sugarcane, jute etc.</li>
                            <li><strong>Areas of Medium Rainfall:</strong> These areas have 75 to 150 cm of annual rainfall. Wheat is the principal Rabi crop, and millets are a priority. Major crops are wheat, maize, cotton, soybeans, millet, etc.</li>
                            <li><strong>Areas of Low Rainfall:</strong> These areas have 25 to 75 cm of annual rainfall. Major crops are millets, oilseeds, and pulses. Dryland farming is a common practice.</li>
                        </ul>
                        <h4>Soil</h4>
                        <p>The soil of a region is an essential determinant of the cropping pattern. Rice is mainly grown in clayey soils, while wheat thrives in loamy soils. The regur soil of the Deccan Plateau is ideal for cotton cultivation. Coarse grains are grown in inferior soils.</p>
                    </FactorAccordion>
                     <FactorAccordion title="Economic Factors">
                        <h4>Irrigation</h4>
                        <p>Rice is a dominant crop in regions with reliable irrigation and a warm climate. Crop diversification in certain areas has been negligible due to irrigation, leading to monocultures of rice or wheat.</p>
                        <h4>Size of Land Holdings</h4>
                        <p>In small holdings, farmers prioritize food grains for their family (subsistence farming). Farmers with large holdings can opt for cash crops and help in crop diversification (commercial farming).</p>
                        <h4>Insurance Against Risk</h4>
                        <p>The need to minimise the risk of crop failures explains diversification. In Southern states, plantation crops are grown on a large scale due to the availability of suitable crop insurance schemes.</p>
                        <h4>Availability of Inputs</h4>
                        <p>Seeds, fertilisers, water storage, marketing, transport, etc., also affect a region’s cropping pattern.</p>
                         <h4>Value & Demand</h4>
                        <p>Millets in hilly areas are often replaced by high-value horticulture crops like apples. Rice is the preferred crop in densely populated regions due to its high demand.</p>
                    </FactorAccordion>
                    <FactorAccordion title="Political Factors (Government Policies)">
                        <p>Food Crops Acts, Land Use Acts, Intensive schemes for Paddy, Cotton and Oilseeds, Subsidies, etc., affect the cropping pattern in India. The government can encourage or discourage certain crops due to various reasons, such as Drought, Flood, or Inflation. The government’s provision of MSP (Minimum Support Price) also impacts cropping patterns, as farmers prefer crops that provide them with higher MSP.</p>
                    </FactorAccordion>
                     <FactorAccordion title="Historical Factors">
                        <p>It refers to the long-term cultivation of various crops in the area due to different historical reasons. For example, Tea plantation by the British in the Kangra Valley. Sugarcane is grown more extensively in North India even though conditions are more favourable in South India, as it was encouraged by the British as an alternative to indigo.</p>
                        <p>Diversification of crops due to surplus food grain production post-Green Revolution has also led to significant changes in cropping patterns in India. Other than rice and wheat, oilseeds and pulses also became more prominent.</p>
                    </FactorAccordion>
                </Accordion>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle className="text-accent">Conclusion</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Cropping patterns in India are shaped by a complex interplay of geographical features, economic conditions, political influences, and historical practices. These patterns vary significantly across regions due to climate, soil, and resource availability differences. By examining these influences, we gain insights into how and why certain crops dominate in specific areas and how these patterns can be managed to enhance agricultural efficiency and sustainability. Understanding these dynamics is crucial for developing targeted strategies to improve crop production and address regional agricultural challenges.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
