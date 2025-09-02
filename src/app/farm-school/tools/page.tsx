
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

const toolsData = [
  {
    id: 'rotavator',
    name: '🚜 1. Rotavator',
    content: {
      introduction: 'A rotavator is a tractor-mounted implement that uses rotating blades to break, churn, and pulverize soil. It is considered one of the fastest and most efficient methods of seedbed preparation.',
      functions: [
        'Crushes soil clods into fine tilth.',
        'Incorporates crop residues into soil (helps composting).',
        'Helps mix organic manure and fertilizers evenly.',
        'Controls initial weed growth.',
      ],
      howItWorks: 'Blades rotate at high speed and cut through soil. Depth can be adjusted depending on crop needs.',
      benefits: [
        'Saves 30–40% time compared to traditional ploughing.',
        'Reduces fuel and labor cost.',
        'Improves soil aeration for root growth.',
      ],
      limitations: [
        'Requires medium to heavy tractor power.',
        'Not suitable for rocky or extremely hard soil.',
      ],
      types: 'Light-duty, Heavy-duty.',
      price: '₹80,000 – ₹2,50,000',
    },
  },
  {
    id: 'harrow',
    name: '🌾 2. Harrow',
    content: {
      introduction: 'A harrow is used after ploughing to refine and smooth the soil. It is useful for leveling and preparing a fine seedbed.',
      functions: [
        'Breaks clods and smoothens soil.',
        'Helps cover seeds after broadcasting.',
        'Incorporates fertilizers/manure.',
        'Controls small weeds.',
      ],
      howItWorks: 'Teeth, discs, or spikes drag through soil, breaking it into smaller particles.',
      benefits: [
        'Ensures even seed germination.',
        'Prepares soil faster than manual leveling.',
        'Improves soil texture for root penetration.',
      ],
      limitations: [
        'Multiple passes may be required for heavy soil.',
      ],
      types: 'Disc, Spike-tooth, Spring-tooth.',
      price: '₹40,000 – ₹1,20,000',
    },
  },
  {
    id: 'cultivator',
    name: '🌱 3. Cultivator',
    content: {
      introduction: 'A cultivator is used for secondary tillage — stirring soil, uprooting weeds, and conserving moisture. It is lighter and faster than a plough.',
      functions: [
        'Loosens soil around growing crops.',
        'Destroys weeds without chemicals.',
        'Mixes fertilizers into soil.',
        'Improves water infiltration.',
      ],
      howItWorks: 'Tines or shovels penetrate and stir soil. Some cultivators are fixed, while others are spring-loaded.',
      benefits: [
        'Reduces manual weeding.',
        'Enhances crop health by loosening soil.',
        'Saves time and fuel.',
      ],
      limitations: [
        'Less effective in rocky soil.',
        'Overuse may damage crop roots.',
      ],
      types: 'Rigid tine, Spring tine, Field cultivator.',
      price: '₹25,000 – ₹90,000',
    },
  },
  {
    id: 'sprayer',
    name: '🚿 4. Sprayer',
    content: {
      introduction: 'A sprayer is used to apply pesticides, herbicides, fungicides, and fertilizers uniformly over crops. It protects plants from pests and enhances yield.',
      functions: [
        'Protects crops from pests/diseases.',
        'Delivers liquid nutrients directly to plants.',
        'Helps in weed control (herbicide spraying).',
      ],
      howItWorks: 'Liquid chemical is pressurized and sprayed through nozzles in fine droplets, covering leaves and stems.',
      benefits: [
        'Reduces chemical wastage.',
        'Ensures uniform coverage.',
        'Saves labor compared to manual spraying.',
      ],
      limitations: [
        'Needs proper calibration to avoid crop damage.',
        'Overuse may harm soil and environment.',
      ],
      types: 'Hand sprayer, Knapsack, Tractor-mounted power sprayer.',
      price: '₹1,000 – ₹25,000',
    },
  },
  {
    id: 'seed-drill',
    name: '🌿 5. Seed Drill',
    content: {
      introduction: 'A seed drill is a machine that sows seeds at the correct depth and spacing, covering them with soil for proper germination.',
      functions: [
        'Places seeds uniformly.',
        'Ensures correct depth and row spacing.',
        'Saves seeds by preventing wastage.',
      ],
      howItWorks: 'Seeds drop from a hopper through tubes and get placed in furrows made by the machine, then covered with soil.',
      benefits: [
        'Increases yield due to uniform crop stand.',
        'Saves 10–15% seeds compared to manual sowing.',
        'Faster sowing → more timely harvest.',
      ],
      limitations: [
        'Needs trained handling for calibration.',
        'Tractor-mounted models are costly for small farmers.',
      ],
      types: 'Manual, Bullock-drawn, Tractor-mounted.',
      price: '₹15,000 – ₹1,50,000',
    },
  },
  {
    id: 'trailer',
    name: '🚛 6. Trailer',
    content: {
      introduction: 'A trailer is a non-powered vehicle pulled by a tractor. It is essential for transporting crops, tools, and goods within and outside the farm.',
      functions: [
        'Transport of harvested crops to market.',
        'Carrying fertilizers, seeds, pesticides, and tools.',
        'Moving building materials, fodder, or livestock.',
      ],
      howItWorks: 'Attached to tractor with a hitch. Some trailers have hydraulic tipping for easy unloading.',
      benefits: [
        'Saves time and labor in transport.',
        'Reduces dependency on external transport.',
        'Flexible — can carry multiple types of loads.',
      ],
      limitations: [
        'Requires tractor for movement.',
        'Overloading can damage tractor engine.',
      ],
      types: 'Flatbed, Tipping, Enclosed.',
      price: '₹1,00,000 – ₹4,00,000',
    },
  },
];


const Section = ({ title, content }: { title: string; content: string | string[] }) => (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2 text-primary">{title}:</h3>
      {Array.isArray(content) ? (
        <ul className="list-disc list-inside space-y-1">
          {content.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );

export default function FarmToolsPage() {
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
          <h1 className="text-4xl font-bold font-headline text-foreground">{t('features.farmSchool.tools.title')}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t('features.farmSchool.tools.description')}</p>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
            <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            {toolsData.map((tool) => (
                <AccordionItem value={tool.id} key={tool.id}>
                <AccordionTrigger className="text-xl font-medium hover:no-underline">{tool.name}</AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg">
                    <p className="italic mb-4">{tool.content.introduction}</p>
                    <Section title="Functions" content={tool.content.functions} />
                    <Section title="How It Works" content={tool.content.howItWorks} />
                    <Section title="Benefits" content={tool.content.benefits} />
                    <Section title="Limitations" content={tool.content.limitations} />
                    <Section title="Types" content={tool.content.types} />
                    <Section title="Approximate Price (India)" content={tool.content.price} />
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </ScrollArea>
      </div>
    </>
  );
}
