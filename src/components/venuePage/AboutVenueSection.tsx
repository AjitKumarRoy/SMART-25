"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import pageData from '@/data/venuePage/venuePage.json';

export const AboutVenueSection = () => {
    return (
        <Section>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                <motion.div 
                    className="relative h-96 w-full rounded-xl shadow-2xl overflow-hidden" 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true, amount: 0.3 }} 
                    transition={{ duration: 0.8 }}
                >
                    <Image src={pageData.aboutVenue.mainImage} alt="NERIST Main Gate" fill className="object-cover" />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, amount: 0.3 }} 
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{pageData.aboutVenue.name}</h2>
                    <p className="mt-1 text-lg font-semibold text-indigo-600">{pageData.aboutVenue.location}</p>
                    <p className="mt-6 text-lg leading-8 text-gray-700">{pageData.aboutVenue.description}</p>
                    <ul className="mt-6 space-y-3">
                        {pageData.aboutVenue.features.map(feature => (
                            <li key={feature} className="flex items-center gap-3">
                                <FaCheckCircle className="h-5 w-5 text-green-500 flex-none" />
                                <span className="font-medium text-gray-800">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </Section>
    );
};