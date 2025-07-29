import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import aboutData from '@/data/aboutPage/aboutPage.json';



export const Scope = () => (
  <Section className="bg-indigo-50">
    <SectionTitle>Scope of Conference</SectionTitle>
    <div className="grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-4">
        <Image
          src={aboutData.scope.image}
          alt={`SMART-25 Logo`}
          className="rounded-lg shadow-2xl"
          width={500}
          height={500}
        />
      </div>
      <div className="md:col-span-8">
        <p className="text-lg text-gray-600 leading-relaxed">{aboutData.scope.text}</p>
      </div>
    </div>
  </Section>
);