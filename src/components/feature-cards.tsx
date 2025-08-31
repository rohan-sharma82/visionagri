
'use client';
import { featuresData } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export default function FeatureCards() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-3xl font-bold text-center font-headline text-foreground">
        {t('features.title')}
      </h2>
      <p className="mt-2 text-lg text-center text-muted-foreground mb-8">
        {t('features.subtitle')}
      </p>
      <div className="flex flex-wrap justify-center gap-8">
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
    </>
  );
}
