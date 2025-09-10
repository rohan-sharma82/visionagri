
'use client';

import { useState } from 'react';
import {
  Check,
  Scaling,
  Droplets,
  Heart,
  Thermometer,
  Leaf,
  Shield,
  ArrowLeft,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const cattleBreedsData = {
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
  'Sahiwal': {
    origin: 'Punjab region (India/Pakistan)',
    size: 'Large (600 kg)',
    size_rating: 5,
    milk: '7-10 L/day',
    milk_rating: 2,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Low',
    feed_rating: 4,
    disease: 'Excellent',
    disease_rating: 5,
  },
  'Jersey': {
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
  'Gir': {
    origin: 'Gujarat, India',
    size: 'Large (544 kg)',
    size_rating: 4,
    milk: '12 L/day',
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
  'Red Sindhi': {
    origin: 'Sindh, Pakistan',
    size: 'Medium (Male: 530 kg)',
    size_rating: 4,
    milk: '12 L/day',
    milk_rating: 3,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Excellent',
    disease_rating: 5,
  },
  'Ongole': {
    origin: 'Andhra Pradesh, India',
    size: 'Large (Male: 500 kg)',
    size_rating: 4,
    milk: '17 L/day',
    milk_rating: 4,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Excellent',
    disease_rating: 5,
  },
  'Deoni': {
    origin: 'Maharashtra, India',
    size: 'Large (Male: 590 kg)',
    size_rating: 5,
    milk: '3-4 L/day',
    milk_rating: 1,
    temperament: 'Calm',
    temperament_rating: 5,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Tharparkar': {
    origin: 'Sindh, Pakistan',
    size: 'Medium (450 kg)',
    size_rating: 3,
    milk: '8-10 L/day',
    milk_rating: 2,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Low',
    feed_rating: 5,
    disease: 'Good',
    disease_rating: 4,
  },
  'Kankrej': {
    origin: 'Gujarat, India',
    size: 'Large (590 kg)',
    size_rating: 5,
    milk: '5-6 L/day',
    milk_rating: 2,
    temperament: 'Active',
    temperament_rating: 3,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Excellent',
    disease_rating: 5,
  },
  'Krishna Valley': {
    origin: 'Karnataka, India',
    size: 'Large (550 kg)',
    size_rating: 4,
    milk: '3 L/day',
    milk_rating: 1,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'High',
    feed_rating: 2,
    disease: 'Good',
    disease_rating: 4,
  },
  'Hariana': {
    origin: 'Haryana, India',
    size: 'Medium (430 kg)',
    size_rating: 3,
    milk: '10-15 L/day',
    milk_rating: 3,
    temperament: 'Active',
    temperament_rating: 3,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
};

const buffaloBreedsData = {
  'Murrah': {
    origin: 'Haryana/Punjab, India',
    size: 'Very Large (650-750 kg)',
    size_rating: 5,
    milk: '1500-2000 kg/lactation',
    milk_rating: 5,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'High',
    feed_rating: 2,
    disease: 'Good',
    disease_rating: 4,
  },
  'Surti': {
    origin: 'Gujarat, India',
    size: 'Medium (400-500 kg)',
    size_rating: 3,
    milk: '900-1300 kg/lactation',
    milk_rating: 3,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Mehsana': {
    origin: 'Gujarat, India',
    size: 'Large (650-750 kg)',
    size_rating: 5,
    milk: '1200-1500 kg/lactation',
    milk_rating: 4,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Bhadawari': {
    origin: 'UP/MP, India',
    size: 'Medium (425-475 kg)',
    size_rating: 3,
    milk: '800-1000 kg/lactation (High Fat)',
    milk_rating: 2,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Excellent',
    climate_rating: 5,
    feed: 'Low',
    feed_rating: 5,
    disease: 'Good',
    disease_rating: 4,
  },
  'Jaffarabadi': {
    origin: 'Gujarat, India',
    size: 'Very Large (450-600 kg)',
    size_rating: 5,
    milk: '1100 kg/lactation',
    milk_rating: 3,
    temperament: 'Active',
    temperament_rating: 3,
    climate: 'Good',
    climate_rating: 4,
    feed: 'High',
    feed_rating: 2,
    disease: 'Good',
    disease_rating: 4,
  },
  'Nagpuri': {
    origin: 'Maharashtra, India',
    size: 'Medium (425-525 kg)',
    size_rating: 3,
    milk: '700-1200 kg/lactation',
    milk_rating: 3,
    temperament: 'Hardy',
    temperament_rating: 3,
    climate: 'Excellent (Semi-arid)',
    climate_rating: 5,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Godavari': {
    origin: 'Andhra Pradesh, India',
    size: 'Medium-Large (400-600 kg)',
    size_rating: 4,
    milk: '1200-1500 kg/lactation',
    milk_rating: 4,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Toda': {
    origin: 'Tamil Nadu, India',
    size: 'Medium (380 kg)',
    size_rating: 3,
    milk: '500 kg/lactation (High Fat)',
    milk_rating: 1,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good (Hilly)',
    climate_rating: 4,
    feed: 'Low',
    feed_rating: 5,
    disease: 'Good',
    disease_rating: 4,
  },
  'Pandharpuri': {
    origin: 'Maharashtra, India',
    size: 'Medium (420-450 kg)',
    size_rating: 3,
    milk: '1000-1500 kg/lactation',
    milk_rating: 4,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'Medium',
    feed_rating: 3,
    disease: 'Good',
    disease_rating: 4,
  },
  'Nili-Ravi': {
    origin: 'Punjab, India/Pakistan',
    size: 'Large (600-700 kg)',
    size_rating: 5,
    milk: '1500-2000 kg/lactation',
    milk_rating: 5,
    temperament: 'Docile',
    temperament_rating: 4,
    climate: 'Good',
    climate_rating: 4,
    feed: 'High',
    feed_rating: 2,
    disease: 'Good',
    disease_rating: 4,
  },
};

const allBreedsData = { ...cattleBreedsData, ...buffaloBreedsData };

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

const BreedGrid = ({ title, breeds, selected, onSelect }: { title: string, breeds: object, selected: string[], onSelect: (breed: string) => void }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.keys(breeds).map((breed) => (
                <div
                    key={breed}
                    onClick={() => onSelect(breed)}
                    className={cn(
                        'border rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-between',
                        selected.includes(breed)
                        ? 'border-green-500 bg-green-500/10 ring-2 ring-green-500'
                        : 'border-border hover:border-primary'
                    )}
                >
                    <h3 className="font-semibold">{breed}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {allBreedsData[breed as keyof typeof allBreedsData].origin}
                    </p>
                    <div className="h-5 mt-2 flex justify-center items-center">
                        {selected.includes(breed) && (
                        <Check className="h-5 w-5 text-green-500" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export default function AnimalComparisonPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>(['Sahiwal', 'Murrah']);

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
      <div className="container mx-auto px-4 py-8 relative">
        <Link href="/animal-classification" className="absolute top-8 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmSchool.backToHome')}
          </Button>
        </Link>
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Cattle & Buffalo Breed Comparison
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select up to two breeds to compare their characteristics side-by-side.
          </p>
        </div>
        
        <BreedGrid title="Cattle Breeds" breeds={cattleBreedsData} selected={selected} onSelect={handleSelect} />
        <BreedGrid title="Buffalo Breeds" breeds={buffaloBreedsData} selected={selected} onSelect={handleSelect} />

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/50 font-semibold">
            <div className="p-4">Characteristics</div>
            {selected.map((breedName) => (
              <div key={breedName} className="p-4 text-center border-l">
                {breedName}
                <p className="text-sm text-muted-foreground font-normal">
                  {allBreedsData[breedName as keyof typeof allBreedsData].origin}
                </p>
              </div>
            ))}
            {Array.from({ length: 2 - selected.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="p-4 border-l"></div>
            ))}
          </div>
          
          <div>
            {characteristics.map(({ key, label, icon }) => (
              <div key={key} className="grid grid-cols-3 items-center border-t">
                <div className="p-4 flex items-center gap-2 text-muted-foreground">
                  {icon}
                  <span>{label}</span>
                </div>
                 {selected.map((breedName) => {
                    const breed = allBreedsData[breedName as keyof typeof allBreedsData];
                    const characteristicKey = key as keyof typeof breed;
                    const ratingKey = `${key}_rating` as keyof typeof breed;
                    return (
                        <div key={breedName} className="p-4 text-center border-l">
                            <p>{breed[characteristicKey] as string}</p>
                            <StarRating rating={breed[ratingKey] as number} />
                        </div>
                    )
                 })}
                 {Array.from({ length: 2 - selected.length }).map((_, i) => (
                    <div key={`placeholder-cell-${i}`} className="p-4 border-l"></div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

    