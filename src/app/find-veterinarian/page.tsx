
'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';


const indianStates = [
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh' },
    { name: 'Assam', slug: 'assam' },
    { name: 'Bihar', slug: 'bihar' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Goa', slug: 'goa' },
    { name: 'Gujarat', slug: 'gujarat' },
    { name: 'Haryana', slug: 'haryana' },
    { name: 'Himachal Pradesh', slug: 'himachal-pradesh' },
    { name: 'Jharkhand', slug: 'jharkhand' },
    { name: 'Karnataka', slug: 'karnataka' },
    { name: 'Kerala', slug: 'kerala' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
    { name: 'Maharashtra', slug: 'maharashtra' },
    { name: 'Manipur', slug: 'manipur' },
    { name: 'Meghalaya', slug: 'meghalaya' },
    { name: 'Mizoram', slug: 'mizoram' },
    { name: 'Nagaland', slug: 'nagaland' },
    { name: 'Odisha', slug: 'odisha' },
    { name: 'Punjab', slug: 'punjab' },
    { name: 'Rajasthan', slug: 'rajasthan' },
    { name: 'Sikkim', slug: 'sikkim' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu' },
    { name: 'Telangana', slug: 'telangana' },
    { name: 'Tripura', slug: 'tripura' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
    { name: 'Uttarakhand', slug: 'uttarakhand' },
    { name: 'West Bengal', slug: 'west-bengal' }
];


export default function FindVeterinarianPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="container mx-auto px-4 py-8 relative">
        <Link href="/animal-classification" className="absolute top-8 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center pt-16">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Find a Veterinarian
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Contact information for District Animal Husbandry Officers in India. Select your state.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {indianStates.map((state) => (
            <Link href={`/find-veterinarian/${state.slug}`} key={state.slug}>
                <div className="state-card">
                    <div className="state-card-info">
                        <p className="title">{state.name}</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
