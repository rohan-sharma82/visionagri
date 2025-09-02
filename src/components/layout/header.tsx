
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf } from 'lucide-react';

import { cn } from '@/lib/utils';
import { mainNavLinks, cardNavItems } from '@/lib/constants';
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
import CardNavMenu from '../card-nav-menu';

export default function Header() {
  const pathname = usePathname();
  const { t, setLanguage } = useTranslation();

  const translatedMainNavLinks = mainNavLinks.map(link => ({
    ...link,
    label: t(link.label)
  }));

  const translatedCardNavItems = cardNavItems.map(item => ({
    ...item,
    label: t(item.label),
    links: item.links.map(link => ({
        ...link,
        label: t(link.label)
    }))
  }));


  return (
    <header className="relative w-full py-4 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="flex-1 flex justify-start">
            {/* Language Switcher Removed from here */}
        </div>
        <div className="flex-none flex items-center gap-2">
            <PillNav
                items={translatedMainNavLinks}
                activeHref={pathname}
                baseColor="#35753D"
                pillColor="hsl(var(--background))"
                hoveredPillTextColor="hsl(var(--background))"
                pillTextColor="hsl(var(--foreground))"
            />
            <CardNavMenu items={translatedCardNavItems} />
        </div>
        <div className="flex-1 flex justify-end">
        </div>
    </header>
  );
}
