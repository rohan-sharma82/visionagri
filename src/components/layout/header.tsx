
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import LanguageSwitcher from '../language-switcher';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">AgriVision AI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-lg transition-colors hover:text-foreground/80',
                        pathname === link.href
                          ? 'text-foreground'
                          : 'text-foreground/60'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
      <div className="container hidden md:flex justify-center py-2 border-t border-border/40">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
