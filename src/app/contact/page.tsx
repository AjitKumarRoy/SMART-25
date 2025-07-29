"use client";

import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/contactPage/contactPage.json';
import Head from 'next/head';
import { FaEnvelope, FaPhone, FaUserCircle } from 'react-icons/fa';
import { ContactForm } from '@/components/contactPage/ContactForm'; // Import the new form

export default function ContactPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    
    return (
        <>
            <Head>
                <title>Contact | SMART-25 Conference</title>
                <meta name="description" content="Contact the organizing committee of the SMART-25 international conference." />
            </Head>

            <motion.div
                className="bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <PageHero
                    title={pageData.hero.title}
                    subtitle={pageData.hero.subtitle}
                    backgroundImage={pageData.hero.backgroundImage}
                />

                {/* Contact Hub */}
                <Section>
                    <SectionTitle>Get in Touch</SectionTitle>
                    {/* General Queries Card with new gradient */}
                    <motion.div 
                        className="mx-auto mt-12 max-w-2xl rounded-xl bg-gradient-to-br from-gray-800 via-slate-900 to-black p-8 text-center text-white shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaEnvelope className="mx-auto h-10 w-10" />
                        <h3 className="mt-4 text-2xl font-bold">{pageData.generalQuery.title}</h3>
                        <a href={`mailto:${pageData.generalQuery.email}`} className="mt-2 inline-block text-xl text-gray-300 hover:underline">
                            {pageData.generalQuery.email}
                        </a>
                    </motion.div>

                    {/* Contact Persons Grid with new animations */}
                    <motion.div
                        className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {pageData.contactPersons.map(person => (
                            <motion.div
                                key={person.name}
                                className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                                variants={itemVariants}
                            >
                                <FaUserCircle className="mx-auto h-12 w-12 text-gray-400" />
                                <h4 className="mt-4 text-xl font-bold text-gray-900">{person.name}</h4>
                                <a href={`tel:${person.phone}`} className="mt-1 flex items-center justify-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                                    <FaPhone className="h-4 w-4" />
                                    {person.phone}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </Section>
                
                {/* New Contact Form Section */}
                <ContactForm />

                {/* Redesigned Map Section */}
                <Section className="bg-gray-50">
                    <SectionTitle>SMART&apos;25 Venue Location</SectionTitle>
                    <motion.div 
                        className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <iframe
                            src={pageData.mapEmbedUrl}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </Section>
            </motion.div>
        </>
    );
}