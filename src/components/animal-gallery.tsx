'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const images = [
  '/dairy-farming-in-india_orig.png',
  '/Imageee.png',
  '/cow baby.png',
  '/dairy-farmingg.png',
  '/dairy-farming.png',
  '/bull.png',
  '/brahman-bull.png',
  '/Water_buffalo_bull.png',
  '/buffalo.png',
  '/Murrah_buffalo.png',
  '/cowcalf.png',
  '/Cow3.png',
  '/cow 2.png',
  '/cow1.png',
];

const AnimalGallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastMouseX = useRef<number>(0);
  const speed = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let rotateY = 0;

    const start = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      lastMouseX.current = startX;
      scrollLeft = track.scrollLeft;
      if (track) track.style.cursor = 'grabbing';
      cancelAnimationFrame(animationFrameRef.current!);
    };

    const end = () => {
      isDown = false;
      if (track) track.style.cursor = 'grab';
      requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
      const walk = (x - startX) * 2; // Adjust scroll speed
      if (track) {
        track.scrollLeft = scrollLeft - walk;
        rotateY = -walk * 0.1; // Adjust rotation speed
        track.style.transform = `rotateY(${rotateY}deg)`;
      }
      speed.current = x - lastMouseX.current;
      lastMouseX.current = x;
    };
    
    const animate = () => {
        if (isDown || !track) return;

        speed.current *= 0.95; // Dampening effect
        rotateY += speed.current * 0.1;
        track.style.transform = `rotateY(${rotateY}deg)`;

        if (Math.abs(speed.current) > 0.1) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
    };


    track.addEventListener('mousedown', start);
    track.addEventListener('mouseleave', end);
    track.addEventListener('mouseup', end);
    track.addEventListener('mousemove', move);

    track.addEventListener('touchstart', start, { passive: true });
    track.addEventListener('touchend', end);
    track.addEventListener('touchmove', move, { passive: true });
    
    requestAnimationFrame(animate);

    return () => {
      if (track) {
        track.removeEventListener('mousedown', start);
        track.removeEventListener('mouseleave', end);
        track.removeEventListener('mouseup', end);
        track.removeEventListener('mousemove', move);
        track.removeEventListener('touchstart', start);
        track.removeEventListener('touchend', end);
        track.removeEventListener('touchmove', move);
      }
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-content">
        <div className="gallery-track" ref={trackRef}>
          {images.map((src, index) => {
            const angle = (360 / images.length) * index;
            const translateZ = 350; // Adjust for circle radius
            return (
              <div
                key={src}
                className="gallery-item"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                }}
              >
                <Image
                  src={src}
                  alt={`Animal ${index + 1}`}
                  width={300}
                  height={120}
                  className="gallery-img"
                  unoptimized // Since we don't know the remote patterns
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="gallery-gradient gallery-gradient-right" />
    </div>
  );
};

export default AnimalGallery;
