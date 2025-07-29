"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import attractionsData from '@/data/homePage/attractions.json';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const AttractionsSection = () => {
  // Initialize Embla Carousel with the Autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <Section id="attraction">
      <SectionTitle>Places of attraction in Maldives</SectionTitle>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {attractionsData.map((attraction, index) => (
              <div className="embla__slide group" key={index}>
                <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={attraction.imageSrc}
                    alt={attraction.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 767px) 90vw, (max-width: 1024px) 50vw, 30vw"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">
                      {attraction.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};