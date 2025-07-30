"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import pageData from '@/data/programSchedulePage/programSchedule.json';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { FaRegClock, FaUsers, FaChalkboardTeacher, FaMugHot, FaAward } from 'react-icons/fa';

// Map event types to icons and colors
const eventTypeDetails = {
  keynote: { icon: <FaChalkboardTeacher />, color: "bg-indigo-500" },
  session: { icon: <FaUsers />, color: "bg-blue-500" },
  break: { icon: <FaMugHot />, color: "bg-teal-500" },
  panel: { icon: <FaUsers />, color: "bg-purple-500" },
  ceremony: { icon: <FaAward />, color: "bg-yellow-500" },
  default: { icon: <FaRegClock />, color: "bg-gray-500" }
};

export const ScheduleTabs = () => {
    const scheduleDays = [pageData.schedule.day1, pageData.schedule.day2];

    return (
        <Section>
            <div className="mx-auto max-w-4xl">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
                        {scheduleDays.map((day, index) => (
                            <Tab as={Fragment} key={index}>
                                {({ selected }) => (
                                    <button
                                        className={`w-full rounded-lg py-3 text-lg font-bold leading-5 transition-all duration-300 focus:outline-none 
                                            ${selected ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-500 hover:bg-white/60'}`}
                                    >
                                        Day {index + 1} <span className="font-normal text-sm block">{day.date}</span>
                                    </button>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-8">
                        {scheduleDays.map((day, index) => (
                            <Tab.Panel key={index}>
                                <motion.div
                                    className="relative border-l-2 border-indigo-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                                >
                                    {day.events.map((event, eventIndex) => {
                                        const details = eventTypeDetails[event.type as keyof typeof eventTypeDetails] || eventTypeDetails.default;
                                        return (
                                            <motion.div 
                                                key={eventIndex} 
                                                className="mb-10 ml-8"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <span className={`absolute -left-[11px] flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white ${details.color}`}>
                                                    <div className="text-white text-sm">{details.icon}</div>
                                                </span>
                                                <time className="block text-base font-semibold text-indigo-700">{event.time}</time>
                                                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                                {event.speaker && <p className="text-md text-gray-600">{event.speaker}</p>}
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </Section>
    );
};