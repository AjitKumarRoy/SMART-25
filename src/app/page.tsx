// FILE: src/app/page.tsx
"use client"; // This component needs to be client-side to use state, effects, and Framer Motion

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Removed useEffect, useRef if no longer directly needed here
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiCpu, FiZap, FiLayers, FiBarChart2, FiGlobe, FiTool, FiUsers, FiAward, FiBookOpen } from "react-icons/fi";
import Slider from "react-slick"; // For carousels, a popular choice
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your data
import homepageData from "@/data/homepage.json";

// Import new components
import { AnnouncementRecruitment } from "@/components/sections/AnnouncementRecruitment";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";

// Dynamic icon mapping for research areas (keep this if you still use it)
const researchIcons: { [key: string]: React.ElementType } = {
  FiCpu,
  FiZap,
  FiLayers,
  FiBarChart2,
  FiGlobe,
  FiTool,
};

// Animation Variants for sections (keep this)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

// Animation Variants for cards/items (keep this)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
      duration: 0.6,
    },
  },
};


export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Settings for the Hero Carousel (keep this)
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "ease-in-out",
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
        <ul className="flex space-x-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${i === currentSlide ? "bg-white scale-125" : "bg-transparent"}`}></div>
    )
  };

  // Settings for Research Areas/Projects/News Carousels (keep this)
  const generalCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  // Parallax effect for the hero section (keep this)
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="overflow-hidden font-jakarta">

      {/* Hero Section with Parallax Carousel */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white">
        <Slider {...heroSliderSettings} className="absolute inset-0 w-full h-full">
          {homepageData.heroCarousel.map((item, index) => (
            <div key={item.id} className="relative w-full h-screen">
              <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center p-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg"
                >
                  {item.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 drop-shadow-md"
                >
                  {item.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <Link href="/about" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
                    Learn More <FiArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* About/Mission Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At IIT Bhilai's AMDCG, we are dedicated to pushing the boundaries of technology
            through groundbreaking research in computational modeling, machine learning, and intelligent systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
          >
            <Image
              src="/images/lab.jpg"
              alt="AMDCG Lab"
              width={800}
              height={500}
              className="rounded-3xl shadow-2xl object-cover w-full h-auto transform hover:scale-102 transition-transform duration-300"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Innovating for a Smarter Future
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
              Our interdisciplinary team works tirelessly to bridge the gap between theoretical research
              and practical applications. We aim to develop real-world solutions that address
              critical global challenges across various domains.
            </p>
            <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold inline-flex items-center gap-2 group">
              Discover Our Story
              <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- NEW COMPONENTS INTEGRATION START --- */}

      {/* Announcements & Recruitment Section */}
      <div className="py-20"> {/* Added a div for spacing */}
         <AnnouncementRecruitment />
      </div>

      {/* Upcoming Events Section */}
      <div className="py-20"> {/* Added a div for spacing */}
        <UpcomingEvents />
      </div>

      {/* --- NEW COMPONENTS INTEGRATION END --- */}


      {/* Key Research Areas Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Our Core Research Areas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exploring diverse fields to create impactful advancements and foster a culture of scientific inquiry.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homepageData.researchAreas.map((area, index) => {
            const IconComponent = researchIcons[area.icon];
            return (
              <motion.div
                key={area.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2"
              >
                {IconComponent && <IconComponent className="text-blue-600 dark:text-blue-400 text-5xl mb-4" />}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 flex-grow">{area.description}</p>
                <Link href={area.link} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold inline-flex items-center gap-2 group">
                  Learn More
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Carousel Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Showcasing Our Latest Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore the innovative work and impactful contributions of the AMDCG group.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Slider {...generalCarouselSettings}>
            {homepageData.featuredProjects.map((project) => (
              <div key={project.id} className="px-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1">
                  <div className="relative w-full h-52">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
                    <Link href={project.link} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold inline-flex items-center gap-2 group">
                      View Project
                      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </section>

      {/* Team Spotlight Carousel Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Meet Our Brilliant Minds
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Dedicated researchers and innovators driving our group's success.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Slider {...{ ...generalCarouselSettings, slidesToShow: 4, responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
          ]}}>
            {homepageData.teamMembers.map((member) => (
              <div key={member.id} className="px-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6 text-center transform hover:-translate-y-1 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-200 dark:border-blue-700">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{member.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </section>

      {/* Latest News & Events Section (This will now be replaced by UpcomingEvents component) */}
      {/* <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Latest News & Events
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with our recent breakthroughs, announcements, and upcoming activities.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <Slider {...generalCarouselSettings}>
            {homepageData.newsEvents.map((item) => (
              <div key={item.id} className="px-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">{item.title}</h3>
                    <Link href={item.link} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-semibold inline-flex items-center gap-2 group">
                      Read More
                      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </section> */}

      {/* Call to Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800 py-20 px-6 text-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Join Us in Shaping the Future of Technology
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Whether you're a prospective student, a collaborating researcher, or an industry partner,
            we invite you to explore opportunities with the AMDCG group.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
                Get in Touch <FiArrowRight />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link href="/careers" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-800 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
                View Careers <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}