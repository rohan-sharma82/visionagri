
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { useTranslation } from '@/hooks/use-translation';
  import { ArrowLeft } from 'lucide-react';
  import Link from 'next/link';
  import { Button } from '@/components/ui/button';
  
  const CropDetail = ({ title, details }: { title: string; details: { [key: string]: string } }) => (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-3 text-primary">{title}</h3>
      <div className="space-y-2 text-muted-foreground">
        {Object.entries(details).map(([key, value]) => (
          <p key={key}>
            <strong className="text-foreground capitalize">{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
  
  const SectionCard = ({ title, children, titleStyle }: { title: string; children: React.ReactNode, titleStyle?: React.CSSProperties }) => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-accent" style={titleStyle}>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
  
  export default function CropsKnowledgePage() {
    const { t } = useTranslation();
  
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/farm-school" className="absolute top-24 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-headline text-foreground tracking-wide">
            Major Crops of India
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            An overview of the key crops that form the backbone of Indian agriculture.
          </p>
        </div>
  
        <div className="max-w-4xl mx-auto">
          <SectionCard title="Major Foodgrain Crops" titleStyle={{ color: '#F48E34' }}>
             <CropDetail
              title="Rice"
              details={{
                Temperature: 'Between 22-32°C with high humidity.',
                Rainfall: 'Around 150-300 cm.',
                'Soil Type': 'Deep clayey and loamy soil.',
                'Top Producing States': 'West Bengal > Punjab > Uttar Pradesh > Andhra Pradesh > Bihar.',
                Notes: 'It is the staple food crop for a majority of Indian people. India is the second largest producer in the world. In states like Assam, West Bengal, and Odisha, three crops of paddy (Aus, Aman, and Boro) are grown in a year.',
              }}
            />
             <CropDetail
              title="Wheat"
              details={{
                Temperature: 'Between 10-15°C (Sowing) and 21-26°C (Ripening) with bright sunlight.',
                Rainfall: 'Around 75-100 cm.',
                'Soil Type': 'Well-drained fertile loamy and clayey loamy soil.',
                'Top Producing States': 'Uttar Pradesh > Punjab > Madhya Pradesh > Haryana > Rajasthan.',
                Notes: 'The second most important cereal crop and main food crop in north and north-western India. The Green Revolution significantly boosted its growth.',
              }}
            />
            <CropDetail
              title="Millets (Nutri-Cereals)"
              details={{
                Temperature: 'Between 27-32°C',
                Rainfall: 'Around 50-100 cm.',
                'Soil Type': 'Can be grown in inferior alluvial or loamy soil; less sensitive to deficiencies.',
                'Top Producing States': 'Rajasthan > Karnataka > Maharashtra > Madhya Pradesh > Uttar Pradesh.',
                Notes: 'Also known as coarse grains, they have high nutritional value. Ragi is rich in iron and calcium. Jowar is the third most important food crop in area and production.',
              }}
            />
            <CropDetail
              title="Maize"
              details={{
                Temperature: 'Between 21-27°C',
                Rainfall: 'High rainfall.',
                'Soil Type': 'Old alluvial soil.',
                'Top Producing States': 'Karnataka > Maharashtra > Madhya Pradesh > Tamil Nadu > Telangana.',
                Notes: 'Used both as food and fodder. Production has increased with modern inputs like HYV seeds and irrigation. India is the seventh largest producer worldwide.',
              }}
            />
            <CropDetail
              title="Pulses"
              details={{
                Temperature: 'Between 20-27°C',
                Rainfall: 'Around 25-60 cm.',
                'Soil Type': 'Sandy-loamy soil.',
                'Top Producing States': 'Madhya Pradesh > Rajasthan > Maharashtra > Uttar Pradesh > Karnataka.',
                Notes: 'India is the largest producer and consumer. Major source of protein in a vegetarian diet. Being leguminous, they help restore soil fertility by fixing nitrogen.',
              }}
            />
          </SectionCard>

          <SectionCard title="Major Cash Crops">
            <CropDetail
              title="Sugarcane"
              details={{
                Temperature: 'Between 21-27°C with hot and humid climate.',
                Rainfall: 'Around 75-100 cm.',
                'Soil Type': 'Deep rich loamy soil.',
                'Top Producing States': 'Uttar Pradesh > Maharashtra > Karnataka > Tamil Nadu > Bihar.',
                Notes:
                  'India is the second largest producer. It is the main source of sugar, gur (jaggery), khandsari and molasses. SEFASU and the National Policy on Biofuels are key government initiatives.',
              }}
            />
            <CropDetail
              title="Oil Seeds"
              details={{
                Temperature: 'Between 15-30°C.',
                Rainfall: 'Around 30-75 cm.',
                'Soil Type': 'Loam to clayey loam and well drained sandy loams.',
                'Top Producing States': 'Madhya Pradesh > Rajasthan > Gujarat > Maharashtra > Uttar Pradesh.',
                Notes:
                  'Main oil-seeds include groundnut, mustard, coconut, sesamum (til), soyabean, castor seeds, cotton seeds, linseed and sunflower. The Yellow Revolution and Integrated Scheme on Oilseeds, Pulses, Oil Palm and Maize (ISOPOM) are key government initiatives.',
              }}
            />
          </SectionCard>
  
          <SectionCard title="Horticulture Crops">
            <p className="mb-4 text-muted-foreground">India is the second largest producer of fruits and vegetables and produces both tropical and temperate fruits. It produces about 13% of the world’s vegetables. Key government initiatives include the Golden Revolution and MIDH.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted">
                            <th className="p-2 border">Fruit</th>
                            <th className="p-2 border">Major States</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2 border">Mangoes</td><td className="p-2 border">Maharashtra, Andhra Pradesh, Telangana, Uttar Pradesh, West Bengal</td></tr>
                        <tr><td className="p-2 border">Oranges</td><td className="p-2 border">Nagpur and Cherrapunjee (Meghalaya)</td></tr>
                        <tr><td className="p-2 border">Bananas</td><td className="p-2 border">Kerala, Mizoram, Maharashtra, Tamil Nadu</td></tr>
                        <tr><td className="p-2 border">Litchi and Guava</td><td className="p-2 border">Uttar Pradesh and Bihar</td></tr>
                        <tr><td className="p-2 border">Pineapples</td><td className="p-2 border">Meghalaya</td></tr>
                        <tr><td className="p-2 border">Grapes</td><td className="p-2 border">Andhra Pradesh, Telangana, Maharashtra</td></tr>
                        <tr><td className="p-2 border">Apples, Pears, Apricots, Walnuts</td><td className="p-2 border">Jammu and Kashmir, Himachal Pradesh</td></tr>
                    </tbody>
                </table>
            </div>
          </SectionCard>
  
          <SectionCard title="Plantation Crops">
            <CropDetail
              title="Tea"
              details={{
                Temperature: 'Between 20-30°C.',
                Rainfall: 'Around 150-300 cm.',
                'Soil Type': 'Deep and fertile well-drained soil, rich in humus and organic matter.',
                'Top Producing States': 'Assam > West Bengal > Tamil Nadu.',
                Notes: 'India is the second largest producer. Tea is a labour-intensive industry.',
              }}
            />
             <CropDetail
              title="Coffee"
              details={{
                Temperature: 'Between 15-28°C.',
                Rainfall: 'Around 150-250 cm.',
                'Soil Type': 'Well drained, deep friable loamy soil.',
                'Top Producing States': 'Karnataka > Kerala > Tamil Nadu.',
                Notes: 'India is the seventh largest producer. The "Arabica" variety is famous worldwide.',
              }}
            />
             <CropDetail
              title="Rubber"
              details={{
                Temperature: 'Above 25°C with moist and humid climate.',
                Rainfall: 'More than 200 cm.',
                'Soil Type': 'Rich well drained alluvial soil.',
                'Top Producing States': 'Kerala > Tamil Nadu > Karnataka.',
                Notes: 'It is an equatorial crop but also grown in tropical and sub-tropical areas. An important industrial raw material.',
              }}
            />
          </SectionCard>
  
          <SectionCard title="Fibre Crops">
             <CropDetail
              title="Cotton"
              details={{
                Temperature: 'Between 21-30°C.',
                Rainfall: 'Around 50-100cm.',
                'Soil Type': 'Well drained black cotton soil of Deccan Plateau.',
                'Top Producing States': 'Gujarat > Maharashtra > Telangana > Andhra Pradesh > Rajasthan.',
                Notes: 'Requires 210 frost-free days and bright sunshine. It is a kharif crop. BT Cotton is a genetically modified variant.',
              }}
            />
            <CropDetail
              title="Jute"
              details={{
                Temperature: 'Between 25-35°C.',
                Rainfall: 'Around 150-250 cm.',
                'Soil Type': 'Well drained alluvial soil.',
                'Top Producing States': 'West Bengal > Bihar > Assam > Andhra Pradesh > Odisha.',
                Notes: 'Known as the golden fibre. It is losing market to synthetic fibres due to its high cost.',
              }}
            />
          </SectionCard>

          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-accent">Changing Cropping Patterns</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Cropping pattern is a dynamic concept because it changes over space and time. It can be defined as the proportion of area under various crops at a point of time. In India, it is determined by rainfall, climate, temperature, soil type, technology and socio-economic conditions of the farmers.</p>
                <ul>
                    <li>The Green Revolution led to changes, introducing rice to Punjab, Haryana and Uttar Pradesh.</li>
                    <li>Farmers are more intensively moving towards cultivation of cash/commercial crops such as oilseeds, fruits, vegetables, and spices.</li>
                    <li>Climate change has affected the Indian monsoon, which is also leading to shifts in cropping patterns.</li>
                    <li>Population growth and urbanisation have led to land conversion, boosting intensive farming.</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
    
