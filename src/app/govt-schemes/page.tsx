
'use client';
import { schemesData } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, Newspaper, Handshake } from 'lucide-react';

const GovtSchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
    // Simple logic to pick an icon based on the scheme name
    const getIcon = () => {
      if (scheme.name.toLowerCase().includes('bima') || scheme.name.toLowerCase().includes('insurance')) {
        return <Handshake size={48} />;
      }
      if (scheme.name.toLowerCase().includes('card')) {
        return <Newspaper size={48} />;
      }
      return <Book size={48} />;
    };

  return (
    <div className="govt-scheme-card">
      {getIcon()}
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
