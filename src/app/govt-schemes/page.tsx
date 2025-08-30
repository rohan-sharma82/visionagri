'use client';
import { schemesData } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SchemeCard = ({ scheme }: { scheme: (typeof schemesData)[0] }) => {
  return (
    <div className="scheme-card">
      <div className="container-image">
        <Image
          src={scheme.imageUrl}
          alt={scheme.name}
          width={125}
          height={125}
          data-ai-hint={scheme.dataAiHint}
          className="image-circle"
        />
      </div>
      <div className="content">
        <div className="detail">
          <span>{scheme.shortName}</span>
          <p>{scheme.description}</p>
          <Link href={scheme.url} target="_blank" className="mt-auto">
            <button>Read More</button>
          </Link>
        </div>
        <div className="product-image">
          <div className="box-image">
            <Image
              src={scheme.imageUrl}
              alt={scheme.name}
              width={112}
              height={112}
              data-ai-hint={scheme.dataAiHint}
              className="img-product"
            />
          </div>
        </div>
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
            <SchemeCard scheme={scheme} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
