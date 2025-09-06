
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
  
  const CropDetail = ({ title, details }: { title: string; details: { [key: string]: string } }) => {
    const { t } = useTranslation();
    return (
        <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-primary">{t(title)}</h3>
        <div className="space-y-2 text-muted-foreground">
            {Object.entries(details).map(([key, value]) => (
            <p key={key}>
                <strong className="text-foreground capitalize">{t(key)}:</strong> {t(value)}
            </p>
            ))}
        </div>
        </div>
    );
  };
  
  const SectionCard = ({ title, children, titleStyle }: { title: string; children: React.ReactNode, titleStyle?: React.CSSProperties }) => {
    const { t } = useTranslation();
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-accent" style={titleStyle}>{t(title)}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
  };
  
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
            {t('farmSchool.cropsKnowledge.pageTitle')}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('farmSchool.cropsKnowledge.pageSubtitle')}
          </p>
        </div>
  
        <div className="max-w-4xl mx-auto">
          <SectionCard title="farmSchool.cropsKnowledge.foodgrain_title" titleStyle={{ color: '#F48E34' }}>
             <CropDetail
              title="farmSchool.cropsKnowledge.rice.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.rice.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.rice.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.rice.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.rice.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.rice.notes',
              }}
            />
             <CropDetail
              title="farmSchool.cropsKnowledge.wheat.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.wheat.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.wheat.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.wheat.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.wheat.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.wheat.notes',
              }}
            />
            <CropDetail
              title="farmSchool.cropsKnowledge.millets.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.millets.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.millets.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.millets.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.millets.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.millets.notes',
              }}
            />
            <CropDetail
              title="farmSchool.cropsKnowledge.maize.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.maize.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.maize.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.maize.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.maize.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.maize.notes',
              }}
            />
            <CropDetail
              title="farmSchool.cropsKnowledge.pulses.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.pulses.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.pulses.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.pulses.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.pulses.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.pulses.notes',
              }}
            />
          </SectionCard>

          <SectionCard title="farmSchool.cropsKnowledge.cash_title">
            <CropDetail
              title="farmSchool.cropsKnowledge.sugarcane.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.sugarcane.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.sugarcane.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.sugarcane.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.sugarcane.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.sugarcane.notes',
              }}
            />
            <CropDetail
              title="farmSchool.cropsKnowledge.oilseeds.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.oilseeds.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.oilseeds.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.oilseeds.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.oilseeds.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.oilseeds.notes',
              }}
            />
          </SectionCard>
  
          <SectionCard title="farmSchool.cropsKnowledge.horticulture_title">
            <p className="mb-4 text-muted-foreground">{t('farmSchool.cropsKnowledge.horticulture_desc')}</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted">
                            <th className="p-2 border">{t('farmSchool.cropsKnowledge.fruit_label')}</th>
                            <th className="p-2 border">{t('farmSchool.cropsKnowledge.states_label')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.mangoes')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.mangoes_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.oranges')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.oranges_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.bananas')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.bananas_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.litchi')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.litchi_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.pineapples')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.pineapples_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.grapes')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.grapes_states')}</td></tr>
                        <tr><td className="p-2 border">{t('farmSchool.cropsKnowledge.apples')}</td><td className="p-2 border">{t('farmSchool.cropsKnowledge.apples_states')}</td></tr>
                    </tbody>
                </table>
            </div>
          </SectionCard>
  
          <SectionCard title="farmSchool.cropsKnowledge.plantation_title">
            <CropDetail
              title="farmSchool.cropsKnowledge.tea.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.tea.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.tea.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.tea.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.tea.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.tea.notes',
              }}
            />
             <CropDetail
              title="farmSchool.cropsKnowledge.coffee.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.coffee.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.coffee.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.coffee.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.coffee.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.coffee.notes',
              }}
            />
             <CropDetail
              title="farmSchool.cropsKnowledge.rubber.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.rubber.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.rubber.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.rubber.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.rubber.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.rubber.notes',
              }}
            />
          </SectionCard>
  
          <SectionCard title="farmSchool.cropsKnowledge.fibre_title">
             <CropDetail
              title="farmSchool.cropsKnowledge.cotton.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.cotton.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.cotton.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.cotton.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.cotton.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.cotton.notes',
              }}
            />
            <CropDetail
              title="farmSchool.cropsKnowledge.jute.title"
              details={{
                'farmSchool.cropsKnowledge.temp': 'farmSchool.cropsKnowledge.jute.temp',
                'farmSchool.cropsKnowledge.rainfall': 'farmSchool.cropsKnowledge.jute.rainfall',
                'farmSchool.cropsKnowledge.soil': 'farmSchool.cropsKnowledge.jute.soil',
                'farmSchool.cropsKnowledge.states': 'farmSchool.cropsKnowledge.jute.states',
                'farmSchool.cropsKnowledge.notes': 'farmSchool.cropsKnowledge.jute.notes',
              }}
            />
          </SectionCard>

          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-accent">{t('farmSchool.cropsKnowledge.changing_title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>{t('farmSchool.cropsKnowledge.changing_p1')}</p>
                <ul>
                    <li>{t('farmSchool.cropsKnowledge.changing_l1')}</li>
                    <li>{t('farmSchool.cropsKnowledge.changing_l2')}</li>
                    <li>{t('farmSchool.cropsKnowledge.changing_l3')}</li>
                    <li>{t('farmSchool.cropsKnowledge.changing_l4')}</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
