
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
                {t('farmSchool.fertilizers.title')}
            </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.fertilizers.pageSubtitle')}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            
            <AccordionItem value="nitrogen">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Nitrogen-Based Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Nitrogen is one of the most important additives for plant improvement because it is a major component of chlorophyll, the substance that plants use for photosynthesis. In India, farmers primarily use nitrogen-based fertilizers to lower yields, particularly for crops such as wheat and rice.</p>
                    <h5>Urea</h5>
                    <p>In India, urea is the most widely used complex nitrogen manure. Due to its affordable price and high enhancement content, people prefer its 46% nitrogen content. Applying urea to different yields is necessary for the vegetative turn of events and overall plant power.</p>
                    <h5>Ammonium Sulfate</h5>
                    <p>21% nitrogen and 24% sulfur are present in this fertilizer. Crops like oilseeds and pulses, which require both sulfur and nitrogen, utilize ammonium sulfate. Additionally, it helps lower soil pH, which makes it suitable for basic soils.</p>
                    <h5>Calcium Ammonium Nitrate (CAN)</h5>
                    <p>It is a top-dressing fertilizer that has a nitrogen content of 26%. It provides a fast-moving kind of nitrogen, which makes it perfect for crops that need a short-term boost.</p>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="phosphorus">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Phosphorus-Based Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Phosphorus is essential for root development, energy transfer within plants, and flowering. Fertilizers with a phosphorus basis are essential for establishing robust subterranean roots and improving crop quality.</p>
                    <h5>Single Super Phosphate (SSP)</h5>
                    <p>Mostly composed of calcium and sulfur, SSP also contains 16–20% phosphorus. It's among the most well-prepared phosphorus manures available in India, and it works especially well for crops like oilseeds, lentils, and native plants.</p>
                    <h5>Diammonium Phosphate (DAP)</h5>
                    <p>This widely used phosphorus fertilizer contains 46% phosphorus and 18% nitrogen. Due to its high enhancement content, people prefer it and typically spray it during planting in solid regions to guarantee improvement and promote early plant growth.</p>
                    <h5>Triple Super Phosphate (TSP)</h5>
                    <p>Crops that require high phosphorus levels use Triple Super Phosphate (TSP), which has a phosphorus content of 44–48%. It is particularly effective in soils with low phosphorus openness.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="potassium">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Potassium-Based Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>In plants, potassium is essential for disease resistance, synthetic activation, and water regulation. Excrements containing potassium are essential for boosting harvest production, quality, and stress resilience.</p>
                    <h5>Muriate of Potash (MOP)</h5>
                    <p>MOP, also known as potassium chloride, has a potassium content of 60–62%. India uses this most complex potassium fertilizer on a wide range of crops, including cereals, vegetables, and natural goods.</p>
                    <h5>Potassium Sulfate (SOP)</h5>
                    <p>SOP consists of 18% sulfur and 50% potassium. It is used on crops that are susceptible to chloride, such as potatoes, tobacco, and a few natural goods. SOP also recommends controlling chloride levels in salty soils.</p>
                    <h5>Potassium Nitrate</h5>
                    <p>13% nitrogen and 44% potassium make up this fertilizer. Because of its great dissolvability, it is a logical choice for foliar treatment and fertigation in high-value crops such as vegetables, flowers, and regular goods.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="complex">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Complex Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Multi-supplement composts with roughly two significant enhancements combined in one arrangement are known as complex fertilizers. Designed to provide crops with altered nutrition, these fertilizers increase capacity and reduce the need for various manure applications.</p>
                    <h5>NPK Fertilizers</h5>
                    <p>With varying amounts of nitrogen, phosphorus, and potassium, NPK excrements are the most widely recognized complex manures. They come in various forms to meet the needs of maximizing yield. An NPK 10-26-26 definition, for instance, would be ideal for accelerating crop blooming and fruiting, while an NPK 12-32-16 arrangement would make sense for root headway and early stages of improvement.</p>
                    <h5>NP and PK Fertilizers</h5>
                    <p>These manures contain fertilizer mixtures of nitrogen and phosphorus (NP) or phosphorus and potassium (PK). Harvests employ more targeted treatment when they only require two of the three basic upgrades.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="micronutrient">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Micronutrient Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Similar to zinc, iron, copper, manganese, and boron, micronutrients are normal but still essential for the general health and production of plants. Micronutrient deficiencies can lead to terrible harvest yields and quality.</p>
                    <h5>Zinc Sulfate</h5>
                    <p>Zinc sulfate typically treats crops that require zinc, such as rice, wheat, and maize. The development of substances, protein composition, and progression rule all depend on zinc.</p>
                    <h5>Ferrous Sulfate</h5>
                    <p>Crops use ferrous sulfate fertilizer to compensate for iron deficiencies. Iron is needed for photosynthesis and chlorophyll enhancement, and its deficiency can cause chlorosis (yellowing of the leaves).</p>
                    <h5>Boron Fertilizers</h5>
                    <p>Boron is essential for plant cell wall function and conceptual development. We apply boron fertilizers to crops such as cotton, sugarcane, and vegetables to enhance the natural item set and flowering process.</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="challenges">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Challenges of Chemical Fertilizers
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Although compound composts have, in the most basic sense, increased India's long-term green efficacy, their constant overuse has caused a few problems.</p>
                    <h5>Soil Degradation</h5>
                    <p>Overuse of synthetic fertilizers can lead to soil contamination, which over time reduces soil fertility and luxury. For example, applying large amounts of nitrogen-based excrements on a regular basis might age the soil, add uneven characteristics, and deplete the soil of its natural matter.</p>
                    <h5>Environmental Pollution</h5>
                    <p>Compound manures spilling over into bodies of water can contaminate the water and lead to problems such as eutrophication, which is the absurd augmentation of water bodies that results in algae blooms and oxygen consumption. This may harm marine life and cause the quality of the water to decline.</p>
                    <h5>Health Risks</h5>
                    <p>Compound fertilizer use can also pose a risk to people's financial security, especially if it contaminates groundwater with nitrates. Elevated nitrate levels in drinking water can lead to serious health issues in children, including methemoglobinemia, also known as "blue child condition."</p>
                    <h5>Sustainability Concerns</h5>
                    <p>One reason for concern is the rather extended viability of substance manure use. The affordability and accessibility of material composts may become increasingly appealing to farmers when common minerals used to manufacture fertilizers, such as phosphate rock, become harder to locate.</p>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="solutions">
                <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    Solutions and Sustainable Alternatives
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-card/50 rounded-b-lg prose lg:prose-xl dark:prose-invert">
                    <p>Several strategies and logical choices are being investigated to alleviate the issues with drug composts.</p>
                    <h5>Integrated Nutrient Management (INM)</h5>
                    <p>INM uses manures, regular waste, and biofertilizers in combination to monitor soil quality and ensure that crops are receiving nutrient-rich soil. This strategy promotes acceptable development practices while reducing the need for chemical fertilizers.</p>
                    <h5>Organic Fertilizers</h5>
                    <p>Ordinary manures, such compost, vermicompost, and green waste products, provide the soil with major improvements while also forming the soil's structure and preparedness. Compared to material composts, they make sense as a way to reduce regular impact and maintain awareness of soil fertility.</p>
                    <h5>Precision Farming</h5>
                    <p>Farmers are able to apply fertilizers even more effectively because of precision developing systems like soil testing, GPS planning, and variable rate advancement, which also reduce waste and regular impact. Harvest yields can be further increased while limiting the negative effects of compound composts by precisely applying the right amount of fertilizer at the right time and site.</p>
                    <h5>Biofertilizers</h5>
                    <p>Biofertilizers are living things that, like microbes, critters, and green development, update soil preparation by promoting plant growth, solubilizing phosphorus, and fixing nitrogen. They are a tried-and-true option that help reduce the regular impact of farming rather than intensifying manures.</p>
                </AccordionContent>
            </AccordionItem>

          </Accordion>
        </ScrollArea>
      </div>
    </>
  );
}
