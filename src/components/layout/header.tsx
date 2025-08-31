
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

interface HeaderProps {
  onLanguageChange?: (lang: string) => void;
  showLanguageSwitcher?: boolean;
}

export default function Header({ onLanguageChange, showLanguageSwitcher = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="relative w-full py-4 flex items-center justify-center">
        <PillNav
            items={navLinks}
            activeHref={pathname}
            baseColor="#35753D"
            pillColor="hsl(var(--background))"
            hoveredPillTextColor="hsl(var(--background))"
            pillTextColor="hsl(var(--foreground))"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center space-x-2">
            <ThemeToggle />
        </div>
    </header>
  );
}
