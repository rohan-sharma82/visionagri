
'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

export default function FindVeterinarianPage() {
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
        <div className="text-center pt-24">
          <Construction className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Find a Veterinarian
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This feature is currently under construction.
          </p>
          <p className="text-muted-foreground">
            We are working hard to bring you a directory of trusted veterinarians in your area.
          </p>
        </div>
      </div>
    </>
  );
}
