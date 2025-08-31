
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageSwitcher() {
  const handleLanguageChange = (lang: string) => {
    // Placeholder for language change logic
    console.log(`Language changed to: ${lang}`);
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
        <DropdownMenuItem onSelect={() => handleLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('pa')}>
          ਪੰਜਾਬੀ (Punjabi)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ta')}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('te')}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('bn')}>
          বাংলা (Bengali)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('mr')}>
          मराठी (Marathi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
