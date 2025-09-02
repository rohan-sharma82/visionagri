
'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface NavLink {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    bgColor: string;
    textColor: string;
    links: NavLink[];
}

interface CardNavMenuProps {
  items: NavItem[];
}

const CardNavMenu = ({ items }: CardNavMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 38;

    const topBarHeight = 38;
    const padding = 16;
    const gap = 8;
    const cardHeight = 110; 
    const contentHeight = (cardHeight * items.length) + (gap * (items.length -1));
    
    return topBarHeight + contentHeight + padding;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 38, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: 'power3.out'
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback('onReverseComplete', () => setIsMenuOpen(false));
      tl.reverse();
    }
  };

  return (
    <div className="relative w-[42px]">
      <nav
        ref={navRef}
        className={`card-nav ${isMenuOpen ? 'open' : ''}`}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>
        </div>

        <div
          className="card-nav-content"
          aria-hidden={!isMenuOpen}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={el => { if(el) cardsRef.current[idx] = el }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">
                {item.label}
              </div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.label}
                    target={lnk.href.startsWith('/') ? undefined : '_blank'}
                    rel={lnk.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  >
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNavMenu;
