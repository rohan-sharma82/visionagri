
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LogIn, LogOut, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTranslation } from '@/hooks/use-translation';
import { logout } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user ?? null);
    });

    // Initial check
    supabase.auth.getUser().then(({ data: { user } }) => {
        setCurrentUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const allNavLinks = [
    ...mainNavLinks,
    { href: '/govt-schemes', label: 'nav.govtSchemes' },
    { href: '/farm-school', label: 'features.farmSchool.title' },
  ];

  const translatedNavLinks = allNavLinks.map(link => ({
    ...link,
    label: t(link.label)
  }));
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return names[0].substring(0, 2);
  }

  const AuthButton = () => {
    if (!isMounted) {
      return null;
    }

    if (currentUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(currentUser.user_metadata?.full_name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.user_metadata?.full_name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={logout}>
                <DropdownMenuItem asChild>
                    <button className="w-full text-left">
                        <LogOut className="mr-2 h-4 w-4 inline-block" />
                        <span>{t('dashboard.logout')}</span>
                    </button>
                </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Link href="/login">
        <Button variant="default" size="sm" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          {t('login.buttons.signin')}
        </Button>
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex items-center flex-1">
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
        
        <div className="flex flex-1 items-center justify-end space-x-4 hidden md:flex">
          <AuthButton />
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
                        <SheetTitle>{t('header.menu')}</SheetTitle>
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
                         <div className="pt-4 border-t">
                           <AuthButton />
                         </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
