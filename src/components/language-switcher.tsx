
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/use-translation';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'optimizeQuality',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    }}
    viewBox="0 0 784.11 815.53"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      ></path>
    </g>
  </svg>
);

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const handleSelect = (lang: string) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    } else {
      console.warn('onLanguageChange handler not provided to LanguageSwitcher');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="language-button-stars">
          {t('languageSwitcher.button')}
          <div className="star-1">
            <Star />
          </div>
          <div className="star-2">
            <Star />
          </div>
          <div className="star-3">
            <Star />
          </div>
          <div className="star-4">
            <Star />
          </div>
          <div className="star-5">
            <Star />
          </div>
          <div className="star-6">
            <Star />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleSelect('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('pa')}>
          ਪੰਜਾਬੀ (Punjabi)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('ta')}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('te')}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('bn')}>
          বাংলা (Bengali)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('mr')}>
          मराठी (Marathi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
