
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Calculator, Lightbulb, Shovel, TestTube2, Leaf, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function FarmSchoolPage() {
  const { t } = useTranslation();

  const schoolTopics = [
    {
      title: t('farmSchool.tools.title'),
      description: t('farmSchool.tools.description'),
      icon: <Shovel className="h-8 w-8 text-accent" />,
      href: '/farm-school/tools',
    },
    {
      title: t('farmSchool.fertilizers.title'),
      description: t('farmSchool.fertilizers.description'),
      icon: <TestTube2 className="h-8 w-8 text-accent" />,
      href: '/farm-school/fertilizers',
    },
    {
      title: t('farmSchool.areaCalculator.title'),
      description: t('farmSchool.areaCalculator.description'),
      icon: <Calculator className="h-8 w-8 text-accent" />,
      href: '/farm-school/area-calculator',
    },
    {
      title: t('farmSchool.profitMakingTips.title'),
      description: t('farmSchool.profitMakingTips.description'),
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      href: '/farm-school/profit-making-tips',
    },
    {
        title: t('farmSchool.cropsKnowledge.title'),
        description: t('farmSchool.cropsKnowledge.description'),
        icon: <Leaf className="h-8 w-8 text-accent" />,
        href: '/farm-school/crops-knowledge',
    },
    {
        title: t('farmSchool.croppingPatterns.title'),
        description: t('farmSchool.croppingPatterns.description'),
        icon: <LayoutGrid className="h-8 w-8 text-accent" />,
        href: '/farm-school/cropping-patterns',
    }
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            {t('farmSchool.title')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {schoolTopics.map((topic) => (
            <Link
              href={topic.href}
              key={topic.title}
              className="w-full max-w-sm"
              target={topic.href.startsWith('/') ? undefined : '_blank'}
              rel={topic.href.startsWith('/') ? undefined : 'noopener noreferrer'}
            >
              <Card className="hover:shadow-lg hover:border-accent transition-all cursor-pointer h-full text-center">
                <CardHeader className="items-center">
                  <div className="bg-primary/20 p-4 rounded-full mb-4">
                    {topic.icon}
                  </div>
                  <CardTitle className="text-xl font-medium">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">
                    {topic.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
