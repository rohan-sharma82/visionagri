
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Header from '@/components/layout/header';
import { useTranslation } from '@/hooks/use-translation';
import {
  ArrowLeft,
  Target,
  TestTube,
  Wrench,
  Link as LinkIcon,
  PlusCircle,
  Shield,
  Coins,
  Sprout,
  Droplets,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfitMakingTipsPage() {
  const { t } = useTranslation();

  const profitTips = [
    {
      title: 'Choose the Right Crops',
      icon: <Target className="h-8 w-8 text-green-500" />,
      points: [
        'Focus on high-demand crops (vegetables, fruits, pulses) that fetch better market prices.',
        'Try short-duration crops to get faster returns.',
        'Diversify crops to reduce risk.',
      ],
    },
    {
      title: 'Improve Soil Health',
      icon: <Sprout className="h-8 w-8 text-yellow-600" />,
      points: [
        'Use organic manure and biofertilizers to cut input costs.',
        'Do regular soil testing to apply only the required nutrients.',
        'Healthy soil = better yield = more profit.',
      ],
    },
    {
      title: 'Smart Water Management',
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      points: [
        'Adopt drip irrigation and sprinklers to save water and fertilizer.',
        'Store rainwater and use it for irrigation.',
        'Reduce electricity and pumping costs.',
      ],
    },
    {
      title: 'Use Technology',
      icon: <Wrench className="h-8 w-8 text-gray-500" />,
      points: [
        'Mobile apps and agri-portals give weather updates, price trends, and pest alerts.',
        'Use AI-based advisory tools to plan sowing and harvesting.',
        'Precision farming reduces wastage.',
      ],
    },
    {
      title: 'Value Addition',
      icon: <PlusCircle className="h-8 w-8 text-indigo-500" />,
      points: [
        'Process crops into products (e.g., wheat → flour, milk → paneer).',
        'Pack and brand farm produce for direct sales.',
        'Sell through local markets, online apps, or farmer producer companies (FPOs).',
      ],
    },
    {
      title: 'Cut Costs, Increase Efficiency',
      icon: <Coins className="h-8 w-8 text-amber-500" />,
      points: [
        'Share farm machinery (tractor, harvester) with nearby farmers.',
        'Use government schemes for subsidy on seeds, fertilizers, and equipment.',
        'Reduce dependence on middlemen by selling directly.',
      ],
    },
    {
      title: 'Market Linkages',
      icon: <LinkIcon className="h-8 w-8 text-cyan-500" />,
      points: [
        'Check daily mandi prices before selling.',
        'Join FPOs or cooperatives for better bargaining power.',
        'Explore export markets for cash crops and spices.',
      ],
    },
    {
      title: 'Livestock Integration',
      icon: <TestTube className="h-8 w-8 text-purple-500" />,
      points: [
        'Combine farming with dairy, poultry, or goat farming for extra income.',
        'Waste from animals can be used as organic manure for crops.',
      ],
    },
    {
      title: 'Adopt Crop Insurance',
      icon: <Shield className="h-8 w-8 text-red-500" />,
      points: [
        'Protect your income from losses due to droughts, floods, or pests.',
        'Government schemes like PMFBY can reduce financial risk.',
      ],
    },
  ];

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
          <h1 className="text-4xl font-bold font-headline text-foreground">
            💰 Profit Making Tips for Farmers
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover practical strategies to increase your farm's profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profitTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">{tip.icon}</div>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
                  {tip.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
