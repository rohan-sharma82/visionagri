
'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';


const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
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
            <Link href="#" key={state}>
                <div className="state-card">
                    <div className="state-card-info">
                        <p className="title">{state}</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
