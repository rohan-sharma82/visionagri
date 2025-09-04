
'use client';

import { useState } from 'react';
import {
  Check,
  HelpCircle,
  Scaling,
  Droplets,
  Heart,
  Thermometer,
  Leaf,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const breedsData = {
  'Holstein Friesian': {
    origin: 'Netherlands',
    size: 'Large (600-700 kg)',
    size_rating: 5,
    milk: '25-30 L/day',
    milk_rating: 5,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Moderate',
    climate_rating: 3,
    feed: 'High',
    feed_rating: 2,
    disease: 'Moderate',
    disease_rating: 3,
  },
  Sahiwal: {
    origin: 'Pakistan/India',
    size: 'Medium (400-500 kg)',
    size_rating: 3,
    milk: '10-15 L/day',
    milk_rating: 3,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Low',
    feed_rating: 4,
    disease: 'Excellent',
    disease_rating: 5,
  },
  Jersey: {
    origin: 'Jersey Island',
    size: 'Small (350-450 kg)',
    size_rating: 2,
    milk: '18-22 L/day',
    milk_rating: 4,
    temperament: 'Active',
    temperament_rating: 3,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Low',
    feed_rating: 5,
    disease: 'Good',
    disease_rating: 4,
  },
  Gir: {
    origin: 'Gujarat, India',
    size: 'Large (550-650 kg)',
    size_rating: 4,
    milk: '12-18 L/day',
    milk_rating: 3,
    temperament: 'Calm',
    temperament_rating: 5,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Excellent',
    disease_rating: 5,
  },
};

const characteristics = [
  { key: 'size', label: 'Size', icon: <Scaling className="h-5 w-5" /> },
  { key: 'milk', label: 'Milk Production', icon: <Droplets className="h-5 w-5" /> },
  { key: 'temperament', label: 'Temperament', icon: <Heart className="h-5 w-5" /> },
  { key: 'climate', label: 'Climate Adaptation', icon: <Thermometer className="h-5 w-5" /> },
  { key: 'feed', label: 'Feed Requirement', icon: <Leaf className="h-5 w-5" /> },
  { key: 'disease', label: 'Disease Resistance', icon: <Shield className="h-5 w-5" /> },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={cn('w-4 h-4', i < rating ? 'text-yellow-400' : 'text-gray-300')}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function AnimalComparisonPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(['Holstein Friesian', 'Jersey']);

  const handleSelect = (breed: string) => {
    setSelected((prev) => {
      if (prev.includes(breed)) {
        return prev.filter((b) => b !== breed);
      }
      if (prev.length < 2) {
        return [...prev, breed];
      }
      return [prev[1], breed]; // Replace the oldest selection
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 relative">
        <Link href="/animal-classification" className="absolute top-8 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classification
          </Button>
        </Link>
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Cattle Breed Comparison
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select up to two breeds to compare their characteristics side-by-side.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.keys(breedsData).map((breed) => (
            <div
              key={breed}
              onClick={() => handleSelect(breed)}
              className={cn(
                'border rounded-lg p-4 text-center cursor-pointer transition-all',
                selected.includes(breed)
                  ? 'border-green-500 bg-green-500/10 ring-2 ring-green-500'
                  : 'border-border hover:border-primary'
              )}
            >
              <HelpCircle className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <h3 className="font-semibold">{breed}</h3>
              <p className="text-sm text-muted-foreground">
                {breedsData[breed as keyof typeof breedsData].origin}
              </p>
              <div className="h-5 mt-2 flex justify-center items-center">
                {selected.includes(breed) && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/50 font-semibold">
            <div className="p-4">Characteristics</div>
            {selected.map((breedName) => (
              <div key={breedName} className="p-4 text-center border-l">
                {breedName}
                <p className="text-sm text-muted-foreground font-normal">
                  {breedsData[breedName as keyof typeof breedsData].origin}
                </p>
              </div>
            ))}
            {selected.length < 2 && <div className="p-4 border-l"></div>}
            {selected.length < 1 && <div className="p-4 border-l"></div>}
          </div>
          
          <div>
            {characteristics.map(({ key, label, icon }) => (
              <div key={key} className="grid grid-cols-3 items-center border-t">
                <div className="p-4 flex items-center gap-2 text-muted-foreground">
                  {icon}
                  <span>{label}</span>
                </div>
                 {selected.map((breedName) => {
                    const breed = breedsData[breedName as keyof typeof breedsData];
                    const characteristicKey = key as keyof typeof breed;
                    const ratingKey = `${key}_rating` as keyof typeof breed;
                    return (
                        <div key={breedName} className="p-4 text-center border-l">
                            <p>{breed[characteristicKey] as string}</p>
                            <StarRating rating={breed[ratingKey] as number} />
                        </div>
                    )
                 })}
                 {selected.length < 2 && <div className="p-4 border-l"></div>}
                 {selected.length < 1 && <div className="p-4 border-l"></div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
