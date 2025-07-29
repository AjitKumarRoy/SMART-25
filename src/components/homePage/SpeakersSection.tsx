import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import speakersData from '@/data/homePage/speakers.json';

// interface Speaker {
//   name: string;
//   title: string;
//   affiliation: string;
//   image: string;
// }


export const SpeakersSection = () => (
  <Section id="speakers" className="bg-indigo-50">
    <SectionTitle>Keynote Speakers</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {speakersData.map((speaker) => (
        <div key={speaker.name} className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
          <Image
            src={speaker.image}
            alt={speaker.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            width={128}
            height={128}
          />
          <h3 className="text-xl font-bold text-gray-800">{speaker.name}</h3>
          <p className="text-indigo-500 font-semibold">{speaker.title}</p>
          <p className="text-gray-500">{speaker.affiliation}</p>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <Link href="/speakers" className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg">
        View All Speakers <FaArrowRight className="inline ml-1" />
      </Link>
    </div>
  </Section>
);