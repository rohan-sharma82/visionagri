
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';

const images = [
  'https://images.pexels.com/photos/30649600/pexels-photo-30649600.jpeg',
  'https://images.pexels.com/photos/5205221/pexels-photo-5205221.jpeg',
  'https://images.pexels.com/photos/16967639/pexels-photo-16967639.jpeg',
  'https://images.pexels.com/photos/33545852/pexels-photo-33545852.jpeg',
  'https://images.pexels.com/photos/20120620/pexels-photo-20120620.jpeg',
  'https://images.pexels.com/photos/20120619/pexels-photo-20120619.jpeg',
  'https://images.pexels.com/photos/31959161/pexels-photo-31959161.jpeg',
  'https://images.pexels.com/photos/31151141/pexels-photo-31151141.jpeg',
  'https://images.pexels.com/photos/21966880/pexels-photo-21966880.jpeg',
];

const AnimalGallery = ({
  autoplay = false,
  pauseOnHover = false,
}: {
  autoplay?: boolean;
  pauseOnHover?: boolean;
}) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === 'number') {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: any) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: any) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-gradient gallery-gradient-right" />
      <div className="gallery-content">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d',
          }}
          className="gallery-track"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <Image
                src={url}
                alt={`Animal ${i + 1}`}
                width={300}
                height={120}
                className="gallery-img"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimalGallery;
