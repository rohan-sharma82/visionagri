
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shovel, TestTube2, Calculator, Lightbulb } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'optimizeQuality',
    }}
    viewBox="0 0 784.11 815.53"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
);



export default function FarmSchoolDialog() {
  const { t } = useTranslation();
  
  const schoolTopics = [
    {
        title: t('features.farmSchool.tools.title'),
        description: t('features.farmSchool.tools.description'),
        icon: <Shovel className="h-8 w-8 text-accent" />,
        href: '/farm-school/tools'
    },
    {
        title: t('farmSchool.fertilizers.title'),
        description: t('farmSchool.fertilizers.description'),
        icon: <TestTube2 className="h-8 w-8 text-accent" />,
        href: '/farm-school/fertilizers'
    },
    {
        title: t('farmSchool.areaCalculator.title'),
        description: t('farmSchool.areaCalculator.description'),
        icon: <Calculator className="h-8 w-8 text-accent" />,
        href: '/farm-school/area-calculator'
    },
    {
        title: t('farmSchool.profitMakingTips.title'),
        description: t('farmSchool.profitMakingTips.description'),
        icon: <Lightbulb className="h-8 w-8 text-accent" />,
        href: '#'
    }
]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="language-button-stars">
            {t('farmSchool.button')}
            <div className="star-1"><Star /></div>
            <div className="star-2"><Star /></div>
            <div className="star-3"><Star /></div>
            <div className="star-4"><Star /></div>
            <div className="star-5"><Star /></div>
            <div className="star-6"><Star /></div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('farmSchool.title')}</DialogTitle>
          <DialogDescription>
            {t('farmSchool.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {schoolTopics.map((topic) => (
                 <Link href={topic.href} key={topic.title} target={topic.href.startsWith('/') ? undefined : '_blank'} rel={topic.href.startsWith('/') ? undefined : 'noopener noreferrer'}>
                    <Card className="hover:shadow-lg hover:border-accent transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            {topic.icon}
                            <CardTitle className="text-xl font-medium">{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </CardContent>
                    </Card>
                 </Link>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
