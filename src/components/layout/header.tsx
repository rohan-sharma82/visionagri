
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf } from 'lucide-react';

import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PillNav from '../pill-nav';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSwitcher from '../language-switcher';


export default function Header() {
  const pathname = usePathname();
  const { t, setLanguage } = useTranslation();

  const translatedNavLinks = navLinks.map(link => ({
    ...link,
    label: t(link.label)
  }));


  return (
    <header className="relative w-full py-4 flex items-center justify-between px-4">
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <LanguageSwitcher onLanguageChange={setLanguage} />
        </div>
        <div className="flex-1 flex justify-center">
            <PillNav
                items={translatedNavLinks}
                activeHref={pathname}
                baseColor="#35753D"
                pillColor="hsl(var(--background))"
                hoveredPillTextColor="hsl(var(--background))"
                pillTextColor="hsl(var(--foreground))"
            />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <ThemeToggle />
        </div>
    </header>
  );
}
