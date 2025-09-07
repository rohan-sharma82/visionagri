
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import {
  ArrowLeft,
  TestTube,
  Wrench,
  Link as LinkIcon,
  PlusCircle,
  Shield,
  Coins,
  Sprout,
  Droplets,
  BarChart,
  BrainCircuit,
  Package,
  ShoppingCart,
  Book,
  Repeat,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfitMakingTipsPage() {
  const { t } = useTranslation();

  const profitTips = [
    {
      title: 'farmSchool.profitMakingTips.tip1_title',
      icon: <Sprout className="h-8 w-8 text-green-500" />,
      description: 'farmSchool.profitMakingTips.tip1_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip2_title',
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      description: 'farmSchool.profitMakingTips.tip2_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip3_title',
      icon: <Droplets className="h-8 w-8 text-cyan-500" />,
      description: 'farmSchool.profitMakingTips.tip3_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip4_title',
      icon: <TestTube className="h-8 w-8 text-purple-500" />,
      description: 'farmSchool.profitMakingTips.tip4_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip5_title',
      icon: <PlusCircle className="h-8 w-8 text-indigo-500" />,
      description: 'farmSchool.profitMakingTips.tip5_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip6_title',
      icon: <BrainCircuit className="h-8 w-8 text-pink-500" />,
      description: 'farmSchool.profitMakingTips.tip6_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip7_title',
      icon: <Package className="h-8 w-8 text-orange-500" />,
      description: 'farmSchool.profitMakingTips.tip7_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip8_title',
      icon: <ShoppingCart className="h-8 w-8 text-amber-600" />,
      description: 'farmSchool.profitMakingTips.tip8_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip9_title',
      icon: <Repeat className="h-8 w-8 text-teal-500" />,
      description: 'farmSchool.profitMakingTips.tip9_desc',
    },
    {
      title: 'farmSchool.profitMakingTips.tip10_title',
      icon: <Book className="h-8 w-8 text-gray-500" />,
      description: 'farmSchool.profitMakingTips.tip10_desc',
    },
  ];

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
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('farmSchool.profitMakingTips.pageTitle')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.profitMakingTips.pageSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profitTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">{tip.icon}</div>
                <div>
                    <CardTitle className="text-xl">{t(tip.title)}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-base text-muted-foreground">{t(tip.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
