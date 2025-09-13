
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/use-translation';

export default function LanguageSwitcher() {
  const { t, setLanguage } = useTranslation();
  const handleSelect = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="valorant-button">
            <span className="valorant-button_lg">
                <span className="valorant-button_sl"></span>
                <span className="valorant-button_text">{t('languageSwitcher.button')}</span>
            </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleSelect('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('hi')}>
          हिंदी (Hindi)
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
