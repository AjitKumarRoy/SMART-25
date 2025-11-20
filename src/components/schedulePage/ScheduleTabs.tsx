"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import pageData from '@/data/programSchedulePage/programSchedule.json';
import { Tab } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { FaRegClock, FaUsers, FaChalkboardTeacher, FaMugHot, FaAward, FaFilePdf } from 'react-icons/fa';

// --- 1. Define Types for your Data ---
interface ScheduleEvent {
  time: string;
  title: string;
  type: string;
  speaker?: string;
}

interface ScheduleTrack {
  name: string;
  downloadLink: string;
  events: ScheduleEvent[];
}

interface ScheduleDay {
  id: string;
  label: string;
  date: string;
  tracks: ScheduleTrack[];
}

// --- 2. Map event types to icons and colors ---
const eventTypeDetails: Record<string, { icon: ReactNode; color: string }> = {
  keynote: { icon: <FaChalkboardTeacher />, color: "bg-indigo-500" },
  session: { icon: <FaUsers />, color: "bg-blue-500" },
  break: { icon: <FaMugHot />, color: "bg-teal-500" },
  panel: { icon: <FaUsers />, color: "bg-purple-500" },
  ceremony: { icon: <FaAward />, color: "bg-yellow-500" },
  default: { icon: <FaRegClock />, color: "bg-gray-500" }
};
export const ScheduleTabs = () => {
  // Cast the JSON data to our defined type
  const scheduleDays = pageData.schedule as ScheduleDay[];

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <Tab.Group>
          {/* Primary Tabs: Days (Day 1 vs Day 2) */}
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1 mb-8">
            {scheduleDays.map((day) => (
              <Tab as={Fragment} key={day.id}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-lg py-3 text-lg font-bold leading-5 transition-all duration-300 focus:outline-none 
                    ${selected ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-500 hover:bg-white/60'}`}
                  >
                    {day.label} <span className="font-normal text-sm block">{day.date}</span>
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {scheduleDays.map((day) => (
              <Tab.Panel key={day.id}>
                 <DayScheduleContent tracks={day.tracks} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Section>
  );
};

// --- 3. Sub-component with explicit prop types ---
const DayScheduleContent = ({ tracks }: { tracks: ScheduleTrack[] }) => {
    const hasMultipleTracks = tracks.length > 1;

    return (
        <Tab.Group>
            {hasMultipleTracks && (
                <Tab.List className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 pb-4">
                    {tracks.map((track, idx) => (
                        <Tab as={Fragment} key={idx}>
                            {({ selected }) => (
                                <button
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                                    ${selected 
                                        ? 'bg-indigo-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {track.name}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
            )}

            <Tab.Panels>
                {tracks.map((track, idx) => (
                    <Tab.Panel key={idx}>
                         {/* Download Button */}
                        <div className="flex justify-end mb-6">
                            <a 
                                href={track.downloadLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                <FaFilePdf /> Download Schedule PDF
                            </a>
                        </div>

                        {/* Timeline Animation */}
                        <motion.div
                            className="relative border-l-2 border-indigo-200 ml-3 md:ml-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        >
                            {track.events.map((event, eventIndex) => {
                                const details = eventTypeDetails[event.type] || eventTypeDetails.default;
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
                                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <time className="block text-sm font-bold text-indigo-600 mb-1">{event.time}</time>
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{event.title}</h3>
                                            {event.speaker && <p className="text-sm text-gray-600 mt-2">{event.speaker}</p>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};