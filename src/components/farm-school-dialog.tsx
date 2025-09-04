
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
        href: '/farm-school/profit-making-tips'
    }
]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="valorant-button">
            <span className="valorant-button_lg">
                <span className="valorant-button_sl"></span>
                <span className="valorant-button_text">{t('farmSchool.button')}</span>
            </span>
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
