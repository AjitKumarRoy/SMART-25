"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import previousConferenceData from '@/data/homePage/previousConference.json';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const PreviousConferenceSection = () => {
  // Initialize Embla Carousel with the Autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);

  return (
    <Section className="bg-indigo-50">
      <SectionTitle>Glimpses of SMART&apos;24</SectionTitle>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {previousConferenceData.map((glimpse, index) => (
              <div className="embla__slide group" key={index}>
                <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={glimpse.imageSrc}
                    alt={glimpse.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 767px) 90vw, (max-width: 1024px) 50vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">
                      {glimpse.title}
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