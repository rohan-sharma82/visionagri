
'use client';
import { featuresData } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function FarmSchoolPage() {
  const { t } = useTranslation();

  return (
    <div className="farm-school-page">
      <div className="farm-school-overlay" />
      <div className="relative z-10 w-full h-full">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
            <Link href="/" className="absolute top-24 left-4">
                <Button variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('farmSchool.backToHome')}
                </Button>
            </Link>
          <h1 className="text-5xl font-bold font-headline text-white drop-shadow-lg">
            {t('farmSchool.title')}
          </h1>
          <p className="mt-4 text-xl text-white/90 drop-shadow-md">
            {t('farmSchool.description')}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {featuresData.map((feature) => (
              <Link href={feature.href} key={feature.title}>
                <div className="feature-card">
                  <div className="feature-card-inner">
                    <div className="feature-card-front">
                      <Image
                        src={feature.imageUrl}
                        alt={t(feature.title)}
                        width={300}
                        height={200}
                        data-ai-hint={feature.dataAiHint}
                        className="rounded-lg object-cover h-full w-full"
                      />
                    </div>
                    <div className="feature-card-back">
                      <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
                      <p>{t(feature.description)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
