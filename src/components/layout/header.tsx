
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { mainNavLinks } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/use-translation';

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const allNavLinks = [
    ...mainNavLinks,
    { href: '/govt-schemes', label: 'nav.govtSchemes' },
    { href: '/farm-school', label: 'features.farmSchool.title' },
  ];

  const translatedNavLinks = allNavLinks.map(link => ({
    ...link,
    label: t(link.label)
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              AgriVision AI
            </span>
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {translatedNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors rounded-md px-3 py-2 hover:bg-accent',
                  pathname === link.href
                    ? 'text-foreground bg-accent'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold">
                    AgriVision AI
                </span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {translatedNavLinks.map((link) => (
                            <Link
                                href={link.href}
                                key={link.href}
                                className={cn(
                                    'block w-full rounded-md p-2 text-left text-lg font-medium hover:bg-accent',
                                     pathname === link.href ? "bg-accent" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
