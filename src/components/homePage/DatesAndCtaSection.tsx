import Link from 'next/link';
import { FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import datesData from '@/data/homePage/importantDates.json'; // Import new dates data
import conferenceData from '@/data/homePage/conference.json'; // Import global data for the link

// interface ImportantDate {
//   event: string;
//   date: string;
//   link: string;
// }

// interface DatesAndCtaSectionProps {
//   data: {
//     importantDates: ImportantDate[];
//     cmtLink: string;
//   };
// }

export const DatesAndCtaSection = () => (
  <Section id="dates">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Call for Papers</h2>
        <p className="text-lg text-gray-600 mb-8">
        We invite you to share your latest research and innovations at SMART’25 conference. Your work will gain valuable visibility and open doors for networking and future partnerships within the field of Sustainable Multidisciplinary Artificial Intelligence.
        </p>
        <Link href={conferenceData.cmtLink} target="_blank" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 inline-block">
          Submit Now <FaPaperPlane className="inline ml-2"/>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Important Dates</h2>
        <ul className="space-y-4">
          {datesData.map((item) => (
            <li key={item.event} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <FaCalendarAlt className="text-indigo-500 text-2xl mr-4"/>
              <div>
                <p className="font-semibold text-gray-700">{item.event}</p>
                <p className="text-gray-500">{item.date}</p>
                <Link
                      href={item.link}
                      className="text-indigo-500 hover:text-indigo-700 text-sm transition duration-300"
                    >
                      Learn More
                    </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);