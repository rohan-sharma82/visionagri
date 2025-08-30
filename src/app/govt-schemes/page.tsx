
'use client';
import { schemesData } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GovtSchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
  return (
    <div className="govt-scheme-card">
      <div className="govt-scheme-card__image-container">
        <Image
          src={scheme.imageUrl}
          alt={scheme.name}
          width={150}
          height={150}
          data-ai-hint={scheme.dataAiHint}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="govt-scheme-card__content">
        <p className="govt-scheme-card__title">{scheme.shortName}</p>
        <p className="govt-scheme-card__description">{scheme.description}</p>
        <Link href={scheme.url} target="_blank" rel="noopener noreferrer">
          <button className="govt-scheme-card__button">Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default function GovtSchemesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          Government Schemes for Farmers
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore beneficial programs and support from the government.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {schemesData.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GovtSchemeCard scheme={scheme} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
