
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
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
        <button className="language-button">
          Farm in Your Language
          <div id="clip">
            <div id="leftTop" className="corner"></div>
            <div id="rightBottom" className="corner"></div>
            <div id="rightTop" className="corner"></div>
            <div id="leftBottom" className="corner"></div>
          </div>
          <span id="rightArrow" className="arrow"></span>
          <span id="leftArrow" className="arrow"></span>
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
