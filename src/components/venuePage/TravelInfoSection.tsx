"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import pageData from '@/data/venuePage/venuePage.json';
import { FaPlane, FaTrain, FaBus, FaChevronDown } from 'react-icons/fa';

const iconMap: { [key: string]: React.ReactElement } = {
    FaPlane: <FaPlane />,
    FaTrain: <FaTrain />,
    FaBus: <FaBus />,
};

export const TravelInfoSection = () => {
    return (
        <Section className="bg-indigo-50">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <SectionTitle>Find Us</SectionTitle>
                    <div className="mt-8 overflow-hidden rounded-xl shadow-lg border border-gray-200">
                       <iframe
                            src={pageData.map.embedUrl}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div>
                    <SectionTitle>How to Reach</SectionTitle>
                    <div className="mt-8 space-y-4">
                        {pageData.howToReach.map(method => (
                             <Disclosure as="div" key={method.method} className="rounded-lg bg-white p-1 border border-gray-200 shadow-sm">
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 focus:outline-none">
                                      <span className="flex items-center gap-3 text-lg font-bold">
                                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">{iconMap[method.icon]}</div>
                                          {method.method}
                                      </span>
                                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <FaChevronDown className="h-5 w-5 text-gray-500" />
                                      </motion.span>
                                    </Disclosure.Button>
                                    <AnimatePresence>
                                      {open && (
                                        // THE FIX: Render motion.div INSIDE Disclosure.Panel
                                        <Disclosure.Panel static className="overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            >
                                                <p className="px-4 pb-4 pt-2 text-gray-600">{method.details}</p>
                                            </motion.div>
                                        </Disclosure.Panel>
                                      )}
                                    </AnimatePresence>
                                  </>
                                )}
                              </Disclosure>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};