
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SectionCard = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string }) => (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            {children}
        </CardContent>
    </Card>
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
            An overview of India's diverse agricultural landscape.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
            <SectionCard title="Introduction">
                <p>Two-thirds of India’s population is engaged in agricultural activities. It is a primary activity, which produces food grains and raw materials for industries. India is geographically a vast country so it has various food and non-food crops which are cultivated in three main cropping seasons which are rabi, kharif and zaid.</p>
                <h4 className="font-semibold">Major crops can be classified into:</h4>
                <ul>
                    <li><strong>Food crops:</strong> Rice, Wheat, Millets, Maize and Pulses.</li>
                    <li><strong>Cash crops:</strong> Sugarcane, Oilseeds, Horticulture crops, Tea, Coffee, Rubber, Cotton and Jute.</li>
                </ul>
            </SectionCard>
            
            <SectionCard title="Cropping Seasons">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S. No</TableHead>
                            <TableHead>Cropping Season</TableHead>
                            <TableHead>Time Period</TableHead>
                            <TableHead>Crops</TableHead>
                            <TableHead>States</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1.</TableCell>
                            <TableCell>Rabi</TableCell>
                            <TableCell>Sown: Oct-Dec<br/>Harvested: Apr-Jun</TableCell>
                            <TableCell>Wheat, barley, peas, gram, mustard etc.</TableCell>
                            <TableCell>Punjab, Haryana, Himachal Pradesh, Jammu and Kashmir, Uttarakhand and Uttar Pradesh</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2.</TableCell>
                            <TableCell>Kharif</TableCell>
                            <TableCell>Sown: Jun-Jul<br/>Harvested: Sep-Oct</TableCell>
                            <TableCell>Rice, maize, jowar, bajra, tur, moong, urad, cotton, jute, groundnut, soybean etc.</TableCell>
                            <TableCell>Assam, West Bengal, coastal regions of Odisha, Andhra Pradesh, Telangana, Tamil Nadu, Kerala and Maharashtra</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3.</TableCell>
                            <TableCell>Zaid</TableCell>
                            <TableCell>Sown and harvested: Mar-Jul (between Rabi and Kharif)</TableCell>
                            <TableCell>Seasonal fruits, vegetables, fodder crops etc.</TableCell>
                            <TableCell>Most of the northern and northwestern states</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Major Food Crops">
                <h4 className="text-xl font-semibold mt-4">Rice</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 22-32°C with high humidity.</li>
                    <li><strong>Rainfall:</strong> Around 150-300 cm.</li>
                    <li><strong>Soil Type:</strong> Deep clayey and loamy soil.</li>
                    <li><strong>Top Rice Producing States:</strong> West Bengal > Punjab > Uttar Pradesh > Andhra Pradesh > Bihar.</li>
                    <li>It is the staple food crop of majority of Indian people.</li>
                    <li>India is the second largest producer of rice in the world after China.</li>
                    <li>In states like Assam, West Bengal and Odisha, three crops of paddy are grown in a year. These are Aus, Aman and Boro.</li>
                    <li>National Food Security Mission, Hybrid Rice Seed Production and Rashtriya Krishi Vikas Yojana are few government initiatives to support rice cultivation.</li>
                </ul>

                <h4 className="text-xl font-semibold mt-4">Wheat</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 10-15°C (Sowing time) and 21-26°C (Ripening & Harvesting) with bright sunlight.</li>
                    <li><strong>Rainfall:</strong> Around 75-100 cm.</li>
                    <li><strong>Soil Type:</strong> Well-drained fertile loamy and clayey loamy (Ganga-Satluj plains and black soil region of the Deccan)</li>
                    <li><strong>Top Wheat Producing States:</strong> Uttar Pradesh > Punjab > Madhya Pradesh > Haryana > Rajasthan.</li>
                    <li>India is the second largest producer after China.</li>
                    <li>This is the second most important cereal crop and the main food crop, in north and north-western India.</li>
                    <li>Success of Green Revolution contributed to the growth of Rabi crops especially wheat.</li>
                </ul>
                
                <h4 className="text-xl font-semibold mt-4">Millets (Nutri-Cereals)</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 27-32°C</li>
                    <li><strong>Rainfall:</strong> Around 50-100 cm.</li>
                    <li><strong>Soil Type:</strong> Can be grown in inferior alluvial or loamy soil because they are less sensitive to soil deficiencies.</li>
                    <li><strong>Top Millets Producing States:</strong> Rajasthan > Karnataka > Maharashtra > Madhya Pradesh > Uttar Pradesh</li>
                    <li>These are also known as coarse grains, which have high nutritional value. Ragi is very rich in iron, calcium, other micro nutrients and roughage.</li>
                </ul>

                 <h4 className="text-xl font-semibold mt-4">Maize</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 21-27°C</li>
                    <li><strong>Rainfall:</strong> High rainfall.</li>
                    <li><strong>Soil Type:</strong> Old alluvial soil.</li>
                    <li><strong>Top Maize Producing States:</strong> Karnataka > Maharashtra > Madhya Pradesh > Tamil Nadu > Telangana</li>
                    <li>India is the seventh largest producer worldwide.</li>
                    <li>It is used both as food and fodder.</li>
                </ul>

                <h4 className="text-xl font-semibold mt-4">Pulses</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 20-27°C</li>
                    <li><strong>Rainfall:</strong> Around 25-60 cm.</li>
                    <li><strong>Soil Type:</strong> Sandy-loamy soil.</li>
                    <li><strong>Top Pulses Producing States:</strong> Madhya Pradesh > Rajasthan > Maharashtra > Uttar Pradesh > Karnataka.</li>
                    <li>India is the largest producer as well as the consumer of pulses in the world.</li>
                    <li>These are the major source of protein in a vegetarian diet.</li>
                    <li>Being leguminous crops, all these crops except arhar help in restoring soil fertility by fixing nitrogen from the air. Therefore, these are mostly grown in rotation with other crops.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Major Cash Crops">
                <h4 className="text-xl font-semibold mt-4">Sugarcane</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 21-27°C with hot and humid climate.</li>
                    <li><strong>Rainfall:</strong> Around 75-100 cm.</li>
                    <li><strong>Soil Type:</strong> Deep rich loamy soil.</li>
                    <li><strong>Top Sugarcane Producing States:</strong> Uttar Pradesh > Maharashtra > Karnataka > Tamil Nadu > Bihar.</li>
                    <li>It is the main source of sugar, gur (jaggery), khandsari and molasses.</li>
                </ul>

                <h4 className="text-xl font-semibold mt-4">Oil Seeds</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 15-30°C</li>
                    <li><strong>Rainfall:</strong> Around 30-75 cm.</li>
                    <li><strong>Soil Type:</strong> Loam to clayey loam and well drained sandy loams.</li>
                    <li><strong>Top Oilseeds Producing States:</strong> Madhya Pradesh > Rajasthan > Gujarat > Maharashtra > Uttar Pradesh.</li>
                    <li>Main oil-seeds produced in India are groundnut, mustard, coconut, sesamum (til), soyabean, castor seeds, cotton seeds, linseed and sunflower.</li>
                </ul>
                
                <h4 className="text-xl font-semibold mt-4">Horticulture Crops</h4>
                <p>India is the second largest producer of fruits and vegetables and it produces both tropical and temperate fruits. India produces about 13 percent of the world’s vegetables. It is an important producer of peas, cauliflower, onions, cabbage, tomato, brinjal and potato.</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fruit</TableHead>
                            <TableHead>States</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Mangoes</TableCell>
                            <TableCell>Maharashtra, Andhra Pradesh, Telangana, Uttar Pradesh and West Bengal</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Oranges</TableCell>
                            <TableCell>Nagpur and Cherrapunjee (Meghalaya)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bananas</TableCell>
                            <TableCell>Kerala, Mizoram, Maharashtra and Tamil Nadu</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Litchi and Guava</TableCell>
                            <TableCell>Uttar Pradesh and Bihar</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Pineapples</TableCell>
                            <TableCell>Meghalaya</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Grapes</TableCell>
                            <TableCell>Andhra Pradesh, Telangana and Maharashtra</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Apples, Pears, Apricots and Walnuts</TableCell>
                            <TableCell>Jammu and Kashmir and Himachal Pradesh</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Plantation & Fibre Crops">
                 <h4 className="text-xl font-semibold mt-4">Tea</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 20-30°C</li>
                    <li><strong>Rainfall:</strong> Around 150-300 cm.</li>
                    <li><strong>Soil Type:</strong> Deep and fertile well-drained soil, rich in humus and organic matter.</li>
                    <li><strong>Top Tea Producing States:</strong> Assam > West Bengal > Tamil Nadu.</li>
                </ul>
                 <h4 className="text-xl font-semibold mt-4">Coffee</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 15-28°C</li>
                    <li><strong>Rainfall:</strong> Around 150-250 cm.</li>
                    <li><strong>Soil Type:</strong> Well drained, deep friable loamy soil.</li>
                    <li><strong>Top Coffee Producing States:</strong> Karnataka > Kerala > Tamil Nadu.</li>
                </ul>
                <h4 className="text-xl font-semibold mt-4">Rubber</h4>
                 <ul>
                    <li><strong>Temperature:</strong> Above 25°C with moist and humid climate.</li>
                    <li><strong>Rainfall:</strong> More than 200 cm.</li>
                    <li><strong>Soil Type:</strong> Rich well drained alluvial soil.</li>
                    <li><strong>Top Rubber Producing States:</strong> Kerala > Tamil Nadu > Karnataka.</li>
                </ul>
                <h4 className="text-xl font-semibold mt-4">Cotton</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 21-30°C</li>
                    <li><strong>Rainfall:</strong> Around 50-100cm.</li>
                    <li><strong>Soil Type:</strong> Well drained black cotton soil of Deccan Plateau.</li>
                    <li><strong>Top Cotton Producing States:</strong> Gujarat > Maharashtra > Telangana > Andhra Pradesh > Rajasthan.</li>
                </ul>
                 <h4 className="text-xl font-semibold mt-4">Jute</h4>
                <ul>
                    <li><strong>Temperature:</strong> Between 25-35°C</li>
                    <li><strong>Rainfall:</strong> Around 150-250 cm</li>
                    <li><strong>Soil Type:</strong> Well drained alluvial soil</li>
                    <li><strong>Top Jute Producing States:</strong> West Bengal > Bihar > Assam > Andhra Pradesh > Odisha.</li>
                    <li>It is known as the golden fibre.</li>
                </ul>
            </SectionCard>

             <SectionCard title="Changing Cropping Patterns of India">
                <p>Cropping pattern is a dynamic concept because it changes over space and time. It can be defined as the proportion of area under various crops at a point of time. Sometimes a number of crops are cultivated in combinations and rotations over a period.</p>
                <p>In India, the cropping pattern is determined by rainfall, climate, temperature, soil type, technology and socio-economic conditions of the farmers.</p>
                <p>These changes in the cropping pattern mainly occurred due to increase in the prices of crops. After independence a lot of changes had been recorded in the cropping pattern in India.</p>
                <ul>
                    <li>Green Revolution also led to changes in the cropping patterns. Rice was introduced to Punjab, Haryana and Uttar Pradesh.</li>
                    <li>Cultivation of food crops has become very remunerative and productive due to the introduction of new technologies in Indian agriculture.</li>
                    <li>Farmers are more intensively moving towards cultivation of cash/commercial crops such as oilseeds, fruits, vegetables, spices, etc. from the traditional non-cash/non-commercial crops such as cereals and pulses.</li>
                    <li>Farmers have changed their crop patterns in order to reap the benefits of economic expansion as well.</li>
                    <li>Climate change has affected the Indian monsoon due to which cropping patterns are also changing.</li>
                    <li>Population explosion and urbanisation has led to land conversion, boosting intensive farming and has brought changes in cropping patterns.</li>
                </ul>
            </SectionCard>
        </div>
      </div>
    </>
  );
}
