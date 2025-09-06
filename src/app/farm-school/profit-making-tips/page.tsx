
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
      title: 'farmSchool.profitMakingTips.tip1_title',
      icon: <Target className="h-8 w-8 text-green-500" />,
      points: [
        'farmSchool.profitMakingTips.tip1_p1',
        'farmSchool.profitMakingTips.tip1_p2',
        'farmSchool.profitMakingTips.tip1_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip2_title',
      icon: <Sprout className="h-8 w-8 text-yellow-600" />,
      points: [
        'farmSchool.profitMakingTips.tip2_p1',
        'farmSchool.profitMakingTips.tip2_p2',
        'farmSchool.profitMakingTips.tip2_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip3_title',
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      points: [
        'farmSchool.profitMakingTips.tip3_p1',
        'farmSchool.profitMakingTips.tip3_p2',
        'farmSchool.profitMakingTips.tip3_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip4_title',
      icon: <Wrench className="h-8 w-8 text-gray-500" />,
      points: [
        'farmSchool.profitMakingTips.tip4_p1',
        'farmSchool.profitMakingTips.tip4_p2',
        'farmSchool.profitMakingTips.tip4_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip5_title',
      icon: <PlusCircle className="h-8 w-8 text-indigo-500" />,
      points: [
        'farmSchool.profitMakingTips.tip5_p1',
        'farmSchool.profitMakingTips.tip5_p2',
        'farmSchool.profitMakingTips.tip5_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip6_title',
      icon: <Coins className="h-8 w-8 text-amber-500" />,
      points: [
        'farmSchool.profitMakingTips.tip6_p1',
        'farmSchool.profitMakingTips.tip6_p2',
        'farmSchool.profitMakingTips.tip6_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip7_title',
      icon: <LinkIcon className="h-8 w-8 text-cyan-500" />,
      points: [
        'farmSchool.profitMakingTips.tip7_p1',
        'farmSchool.profitMakingTips.tip7_p2',
        'farmSchool.profitMakingTips.tip7_p3',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip8_title',
      icon: <TestTube className="h-8 w-8 text-purple-500" />,
      points: [
        'farmSchool.profitMakingTips.tip8_p1',
        'farmSchool.profitMakingTips.tip8_p2',
      ],
    },
    {
      title: 'farmSchool.profitMakingTips.tip9_title',
      icon: <Shield className="h-8 w-8 text-red-500" />,
      points: [
        'farmSchool.profitMakingTips.tip9_p1',
        'farmSchool.profitMakingTips.tip9_p2',
      ],
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profitTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">{tip.icon}</div>
                <CardTitle className="text-xl">{t(tip.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
                  {tip.points.map((point, i) => (
                    <li key={i}>{t(point)}</li>
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
