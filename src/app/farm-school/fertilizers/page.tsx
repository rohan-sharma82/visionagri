
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/layout/header';
import { useTranslation } from '@/hooks/use-translation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FarmFertilizersPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link href="/farm-school" className="absolute top-24 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-center font-headline text-foreground">
                Fertilizer Types &amp; Uses
            </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.fertilizers.description')}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)] mb-8">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            
            <AccordionItem value="introduction">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    A. Introduction
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                    <h4>What are Fertilizers?</h4>
                    <p>Fertilizers are substances added to soil or plants to supply one or more nutrients essential to the growth of plants. The main objective is to increase crop yield and improve soil fertility.</p>
                    <h4>Importance of N-P-K</h4>
                    <ul>
                        <li><strong>Nitrogen (N):</strong> Promotes leafy green growth (stems, leaves).</li>
                        <li><strong>Phosphorus (P):</strong> Essential for root development, flowering, and fruiting.</li>
                        <li><strong>Potassium (K):</strong> Improves overall plant health, disease resistance, and water regulation.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="categories">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    B. Fertilizer Categories
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                    <h4>1. Major Classifications</h4>
                    <h5>Organic Fertilizers</h5>
                    <p>Derived from natural sources like plant or animal matter—compost, manure, bone meal, fish emulsion, and peat. They release nutrients slowly, improve soil health, and support beneficial soil organisms.</p>
                    
                    <h5>Inorganic (Mineral/Chemical) Fertilizers</h5>
                    <p>Manufactured synthetically to deliver precise doses of nutrients. They’re fast-acting and come in distinct nutrient types:</p>
                    <ul>
                        <li><strong>Nitrogen-based:</strong> e.g., urea, ammonium nitrate, ammonium sulfate</li>
                        <li><strong>Phosphorus-based:</strong> e.g., single superphosphate (SSP), triple superphosphate (TSP), mono/di-ammonium phosphate (MAP/DAP)</li>
                        <li><strong>Potassium-based:</strong> e.g., potassium chloride, potassium sulfate, potassium nitrate</li>
                        <li><strong>NPK (Compound):</strong> Balanced blends or chemically bound mixes delivering N, P, and K simultaneously</li>
                    </ul>
                    
                    <h4>2. Specialty Types</h4>
                    <h5>Controlled-Release Fertilizers</h5>
                    <p>Feature special coatings (sulfur or polymers) that regulate nutrient release—minimizing waste, preventing burn, and reducing environmental impacts.</p>

                    <h5>Biofertilizers</h5>
                    <p>Contain live microorganisms (like Nitrobacteria or Phosphobacteria) that enhance nutrient uptake and soil health. Common examples include neem cake and nano-fertilizer variants like nano urea.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="application">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    C. Form & Application Methods
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                    <h4>By Physical Form</h4>
                    <ul>
                        <li><strong>Liquid:</strong> Quick absorption, suitable for seedlings, foliar sprays, and stress recovery. Examples: seaweed extract, fish emulsion.</li>
                        <li><strong>Granular/Powder:</strong> Applied before planting or as top dressing; releases nutrients over time and requires watering-in.</li>
                        <li><strong>Powdered/Soluble Formats:</strong> Dissolve in water, suitable for fertigation systems.</li>
                    </ul>
                    <h4>Common Application Methods</h4>
                     <ul>
                        <li><strong>Broadcasting:</strong> Spreading fertilizer uniformly over the entire field.</li>
                        <li><strong>Placement:</strong> Placing fertilizer in bands or pockets near the plant roots.</li>
                        <li><strong>Foliar Spray:</strong> Applying liquid fertilizer directly to the leaves.</li>
                        <li><strong>Fertigation:</strong> Applying fertilizers through the irrigation system.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guide">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    D. Choosing Guide
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                    <p>Choosing the right fertilizer depends on several factors:</p>
                    <ul>
                        <li><strong>Based on Plant Needs:</strong> Leafy crops need more Nitrogen, flowering/fruiting plants need more Phosphorus, and root crops benefit from more Potassium.</li>
                        <li><strong>Based on Soil Test Results:</strong> A soil test is the most accurate way to know which nutrients your soil is lacking.</li>
                        <li><strong>Release Behavior:</strong> Choose fast-release for quick results or slow-release for sustained feeding.</li>
                        <li><strong>Sustainability Goals:</strong> Opt for organic or biofertilizers to improve long-term soil health and reduce environmental impact.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

             <AccordionItem value="environmental">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    E. Environmental Considerations
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-lg dark:prose-invert">
                     <ul>
                        <li>Overuse of synthetic fertilizers can cause soil burn, nutrient leaching into groundwater, and water pollution (eutrophication).</li>
                        <li>Organic and controlled-release fertilizers help preserve soil and water health by releasing nutrients slowly and reducing runoff.</li>
                        <li>Always follow the recommended dosage and application method to minimize environmental harm.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

          </Accordion>
        </ScrollArea>

        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden">
            <Image 
                src="/images/Product Consumption - Fertiliser.jpeg" 
                alt="Fertilizer consumption statistics"
                fill
                className="object-cover"
                data-ai-hint="fertilizer infographic"
             />
        </div>
      </div>
    </>
  );
}
