
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
      <div className="container mx-auto px-4 py-8">
        <Link href="/farm-school" className="absolute top-24 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-center font-headline text-foreground">
                {t('farmSchool.fertilizers.pageTitle')}
            </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.fertilizers.pageSubtitle')}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)] mb-8">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            
            <AccordionItem value="introduction">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {t('farmSchool.fertilizers.sectionA.title')}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <h4>{t('farmSchool.fertilizers.sectionA.q1')}</h4>
                    <p>{t('farmSchool.fertilizers.sectionA.a1')}</p>
                    <h4>{t('farmSchool.fertilizers.sectionA.q2')}</h4>
                    <ul>
                        <li><strong>{t('farmSchool.fertilizers.sectionA.n')}</strong> {t('farmSchool.fertilizers.sectionA.n_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionA.p')}</strong> {t('farmSchool.fertilizers.sectionA.p_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionA.k')}</strong> {t('farmSchool.fertilizers.sectionA.k_desc')}</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="categories">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {t('farmSchool.fertilizers.sectionB.title')}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <h4>{t('farmSchool.fertilizers.sectionB.q1')}</h4>
                    <h5>{t('farmSchool.fertilizers.sectionB.organic_title')}</h5>
                    <p>{t('farmSchool.fertilizers.sectionB.organic_desc')}</p>
                    
                    <h5>{t('farmSchool.fertilizers.sectionB.inorganic_title')}</h5>
                    <p>{t('farmSchool.fertilizers.sectionB.inorganic_desc')}</p>
                    <ul>
                        <li><strong>{t('farmSchool.fertilizers.sectionB.n_based')}</strong> {t('farmSchool.fertilizers.sectionB.n_based_eg')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionB.p_based')}</strong> {t('farmSchool.fertilizers.sectionB.p_based_eg')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionB.k_based')}</strong> {t('farmSchool.fertilizers.sectionB.k_based_eg')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionB.npk')}</strong> {t('farmSchool.fertilizers.sectionB.npk_desc')}</li>
                    </ul>
                    
                    <h4>{t('farmSchool.fertilizers.sectionB.q2')}</h4>
                    <h5>{t('farmSchool.fertilizers.sectionB.controlled_title')}</h5>
                    <p>{t('farmSchool.fertilizers.sectionB.controlled_desc')}</p>

                    <h5>{t('farmSchool.fertilizers.sectionB.bio_title')}</h5>
                    <p>{t('farmSchool.fertilizers.sectionB.bio_desc')}</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="application">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {t('farmSchool.fertilizers.sectionC.title')}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <h4>{t('farmSchool.fertilizers.sectionC.q1')}</h4>
                    <ul>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.liquid_title')}</strong> {t('farmSchool.fertilizers.sectionC.liquid_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.granular_title')}</strong> {t('farmSchool.fertilizers.sectionC.granular_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.powder_title')}</strong> {t('farmSchool.fertilizers.sectionC.powder_desc')}</li>
                    </ul>
                    <h4>{t('farmSchool.fertilizers.sectionC.q2')}</h4>
                     <ul>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.broadcasting')}</strong></li>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.placement')}</strong></li>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.foliar')}</strong></li>
                        <li><strong>{t('farmSchool.fertilizers.sectionC.fertigation')}</strong></li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guide">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {t('farmSchool.fertilizers.sectionD.title')}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>{t('farmSchool.fertilizers.sectionD.intro')}</p>
                    <ul>
                        <li><strong>{t('farmSchool.fertilizers.sectionD.p1_title')}</strong> {t('farmSchool.fertilizers.sectionD.p1_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionD.p2_title')}</strong> {t('farmSchool.fertilizers.sectionD.p2_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionD.p3_title')}</strong> {t('farmSchool.fertilizers.sectionD.p3_desc')}</li>
                        <li><strong>{t('farmSchool.fertilizers.sectionD.p4_title')}</strong> {t('farmSchool.fertilizers.sectionD.p4_desc')}</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

             <AccordionItem value="environmental">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {t('farmSchool.fertilizers.sectionE.title')}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                     <ul>
                        <li>{t('farmSchool.fertilizers.sectionE.p1')}</li>
                        <li>{t('farmSchool.fertilizers.sectionE.p2')}</li>
                        <li>{t('farmSchool.fertilizers.sectionE.p3')}</li>
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
