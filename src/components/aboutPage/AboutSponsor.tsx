import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import aboutData from '@/data/aboutPage/aboutSponsor.json'



export const AboutSponsor = () => (
  <Section className="bg-indigo-50">
    <SectionTitle>About the Title Sponsor</SectionTitle>
    <div className="grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-4">
        <Image
          src={aboutData.image}
          alt={`Konnifel Logo`}
          className="rounded-lg shadow-2xl"
          width={500}
          height={500}
        />
      </div>
      <div className="md:col-span-8">
        <p className="text-lg text-gray-600 leading-relaxed">{aboutData.text}</p>
        {/* <Link href="/about" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-6 inline-block">
          Learn More <FaArrowRight className="inline ml-1" />
        </Link> */}
      </div>
    </div>
  </Section>
);