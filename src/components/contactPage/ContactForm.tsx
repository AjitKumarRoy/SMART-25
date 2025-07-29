"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import emailjs from '@emailjs/browser';
import { FaCheckCircle, FaSpinner, FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

export const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            e.currentTarget,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(() => {
            setStatus('success');
        }, (error) => {
            setStatus('error');
            console.error('FAILED...', error);
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <Section className="bg-gradient-to-br from-white to-slate-50">
            <div className="mx-auto max-w-6xl">
                {status === 'success' ? (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <FaCheckCircle className="mx-auto h-20 w-20 text-green-500" />
                        <h3 className="mt-6 text-3xl font-bold text-gray-900">Message Sent Successfully!</h3>
                        <p className="mt-3 text-lg text-gray-600">Thank you for your inquiry. We will get back to you shortly.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                        {/* Left Column: Text */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-gray-900">Send us a Message</motion.h2>
                            <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600">
                                Have a question, comment, or suggestion? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
                            </motion.p>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div 
                            className="rounded-xl border border-gray-200 bg-white p-8 shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <form onSubmit={sendEmail} className="space-y-6">
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="from_name" placeholder="Your Name" required className="w-full rounded-md border-gray-300 py-3 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500 text-gray-900" />
                                </div>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" name="from_email" placeholder="Your Email" required className="w-full rounded-md border-gray-300 py-3 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500 text-gray-900" />
                                </div>
                                <div className="relative">
                                    <FaPen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="subject" placeholder="Subject" required className="w-full rounded-md border-gray-300 py-3 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500 text-gray-900" />
                                </div>
                                <textarea name="message" rows={5} placeholder="Your Message" required className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-gray-500 text-gray-900"></textarea>
                                <button 
                                    type="submit" 
                                    disabled={status === 'sending'}
                                    className="w-full rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:from-indigo-400 disabled:to-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {status === 'sending' ? <FaSpinner className="animate-spin" /> : 'Send Message'}
                                </button>
                                {status === 'error' && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </Section>
    );
};