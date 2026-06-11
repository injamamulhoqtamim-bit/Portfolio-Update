"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: 'Teachers Finding Platform',
    desc: 'A modern and user-friendly Teachers Finding Platform helps students easily find suitable home tutors based on subject, budget, and teacher preferences.',
    image: '/teachersfinding.jpg',
    tech: ['React.js', 'TailwindCSS', 'Vite', 'PostCSS', 'Node.js', 'Vercel'],
    live: 'https://teachersfinding.vercel.app/', 
    code: '#',
    challenges: 'Designing an intuitive UI to represent relationship "tending" milestones without cluttering the screen.',
    improvements: 'Add secure Authentication & Authorization system • Implement Teacher Reviews and Ratings feature • Add Real-time Chat between students and teachers • Integrate Online Payment Gateway • Create an Admin Dashboard for platform management.',
    longDesc: 'A modern and user-friendly Teachers Finding Platform built with React.js, Vite, and Tailwind CSS.This platform helps students easily find suitable home tutors based on subject, budget, and teacher preferences.The main goal of this project is to create a platform similar to BD JOBS, but focused on finding and booking home tutors in Bangladesh.'
  },
  {
    id: 2,
    title: 'Sun Cart',
    desc: 'A modern e-commerce web application where users can seamlessly browse products, manage profiles, and access secure, protected pages.',
    image: '/suncart.jpg',
    tech: ['React', 'Node.js', 'Better Auth', 'TailwindCSS'],
    live: 'https://sun-cart-e-commerce-website.vercel.app/',
    code: '#',
    challenges: 'Implementing robust route protection for product details and ensuring dynamic state management during profile updates.',
    improvements: 'Adding an integrated payment gateway (Stripe/SSLCommerz), advanced product filtering, and an admin dashboard.',
    longDesc: 'SunCart is a fully functional e-commerce web platform designed for a seamless shopping experience. It features user authentication, a dynamic profile management system, an interactive product catalog, and strictly protected detail pages accessible only to registered members.'
  },
  {
    id: 3,
    title: 'Keen Keeper',
    desc: 'A simple and intuitive friendship management app that helps you organize and keep track of meaningful personal relationships.',
    image: '/keenkeeper.jpg',
    tech: ['React', 'TailwindCSS', 'HTML', 'React Hook'],
    live: 'https://keen-keeper-blue.vercel.app/', 
    code: '#',
    challenges: 'Designing an intuitive UI to represent relationship "tending" milestones without cluttering the screen.',
    improvements: 'Integrating automated follow-up reminders, calendar syncing for birthdays, and AI-driven conversational icebreakers.',
    longDesc: 'KeenKeeper serves as a dedicated personal CRM. In today’s busy digital era, this application provides a focused space to track interactions, log shared memories, and nurture the connections that matter most to you.'
  },
  {
    id: 4,
    title: 'Digitools Platform',
    desc: 'An elite SaaS hub offering access to premium AI tools and high-quality digital assets to supercharge your creative workflow.',
    image: '/digitools.jpg',
    tech: ['React.js', 'Vite','TailwindCSS', 'JavaScript'],
    live: 'https://digitools-platfrom.vercel.app/', 
    code: '#',
    challenges: 'Optimizing API response handling from AI models and ensuring smooth asset loading performance.',
    improvements: 'Adding direct Figma/Adobe plugin integration, team workspaces, and real-time generation history logs.',
    longDesc: 'Digitools Platform is an all-in-one suite designed specifically for creators. It unlocks access to custom-trained AI generators, premium layout templates, and workflow boosters, making content creation faster and smarter.'
  },
  {
    id: 5,
    title: 'English জানালা',
    desc: 'English Janala is an interactive English vocabulary and language learning web application. Users can navigate through various difficulty levels, search for specific terms, and hear correct pronunciations using the Web Speech API. ',
    image: '/EnglilshJanala.jpg',
    tech: ['HTML', 'CSS','TailwindCSS', 'JavaScript'],
    live: 'https://english-janala-dusky.vercel.app/', 
    code: '#',
    challenges: 'Ensuring the custom brand logo scaled responsively across mobile layouts while seamlessly aligning its asymmetric elements alongside the text components.',
    improvements: 'Backend and Database Integration: Migrate from mock static data/local JSON arrays to a secure backend database.',
    longDesc: 'English Janala is an interactive English vocabulary and language learning web application. It is designed to help users learn new words, improve their vocabulary across different levels, and enhance their English language skills in an engaging and user-friendly way.'
  },
  {
    id: 6,
    title: 'Zyntrix Lab',
    desc: 'A polished, interactive corporate business website tailored to display professional services and drive enterprise growth.',
    image: '/zyntrixLab.jpg', 
    tech: ['HTML', 'TailwindCSS', 'JavaScript', 'React', 'Tawk.to'],
    live: 'https://zyntrix-lab-website.vercel.app/', 
    code: '#',
    challenges: 'Creating fluid, high-performance page transitions and building a secure contact/lead validation form.',
    improvements: 'Implementing a built-in booking/consultation calendar system and multi-language internationalization (i18n).',
    longDesc: 'Zyntrix Lab is a top-tier business ecosystem web application. It functions to establish a robust online presence through dynamic service showcase cards, interactive case studies, and responsive contact hooks.'
  },
  {
    id: 7,
    title: 'GitHub Tracker',
    desc: 'A specialized developer productivity tool built to monitor, analyze, and manage active GitHub repositories and issues smoothly.',
    image: '/github tracker.jpg', 
    tech: ['HTML', 'TailwindCSS', 'JavaScript'],
    live: 'https://github-issue-tracker.injamamulhoqtamim.workers.dev/', 
    code: '#',
    challenges: 'Handling GitHub API rate limits efficiently and crafting responsive data charts for active issues.',
    improvements: 'Adding multi-repo comparison matrices, email alerts for critical bug openings, and sprint timeline charts.',
    longDesc: 'GitHub Tracker streamlines open-source management by aggregating repository statistics. Developers can view real-time issue states, track assignment logs, and visual bug closure frequencies in a sleek unified interface.'
  },
  {
    id: 8,
    title: 'Job Tracker',
    desc: 'An essential web dashboard designed for active job seekers to easily track, update, and manage their recruitment pipelines.',
    image: '/Job Application.jpg', 
    tech: ['HTML', 'JavaScript', 'TailwindCSS'], 
    live: 'https://job-application-tracker.injamamulhoqtamim.workers.dev/', 
    code: '#',
    challenges: 'Structuring a dynamic drag-and-drop or status-update flow for jobs shifting across various application cycles.',
    improvements: 'Integrating resume scanning matching scores, interview date calendar overlays, and automated offer comparison charts.',
    longDesc: 'Job Tracker relieves the chaos of career hunting. It allows users to store corporate postings, set current application statuses (Applied, Interviewing, Offered, Rejected), track custom notes, and monitor response time analytics.'
  },
  {
    id: 9, 
    title: 'Dream-11',
    desc: 'Claim Free Credits instantly! Banan apnar Dream 11 Squad.',
    image: '/Dream-11.jpg', 
    tech: ['HTML5', 'TailwindCSS','React.js', 'DaisyUI','JavaScript(ES6+)', 'React-Toastify'],
    live: 'https://dream-11-cricket.vercel.app/', 
    code: '#',
    challenges: 'Handling dynamic budget math alongside selection limits in real-time was a key challenge. Ensuring that the available players pool instantly updates (preventing duplicate selections) while keeping the coin balance accurately synced across a split-view dashboard required deep state architecture in React.',
    improvements: 'Strategic Limits & Live Stats: Adding cricket-specific squad rules (e.g., mandatory wicketkeeper) and live player stats via API for analytical bidding.Persistent Storage & Drafting: Implementing LocalStorage to save teams on refresh and adding a real-time multiplayer mock draft system.',
    longDesc: 'My Team Dream 11 is a highly interactive, responsive, and dynamic fantasy sports dashboard designed to replicate the strategic thrill of a real-world cricket tournament auction. Built using React.js and styled with Tailwind CSS & DaisyUI, the platform transforms the user into a team manager starting with a clean slate of zero coins.'
  },
  {
    id: 10, 
    title: 'Green-Earth',
    desc: 'Green Earth is a modern, responsive web application designed to help users browse, filter, and purchase various types of plants.',
    image: '/GreenEarth.jpg', 
    tech: ['HTML5', 'CSS', 'JavaScript(ES6+)'],
    live: 'https://green-earth-three.vercel.app/', 
    code: '#',
    challenges: 'Dynamic State Management: Implementing the shopping cart logic required careful handling of array methods to ensure that items could be added or removed dynamically without causing UI desynchronization...',
    improvements: 'Persistent Cart: Implement localStorage so that a users cart items remain saved even if they refresh the browser page.Search Functionality: Add a search bar to allow users to quickly find specific plants by name regardless of their category...',
    longDesc: 'Green Earth is a modern, responsive web application designed to help users browse, filter, and purchase various types of plants. By integrating a dynamic API, the platform provides a seamless shopping experience where users can categorize plants, view detailed product information through interactive modals, and manage their selections in real-time via a functional shopping cart.'
  }
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (p) => {
    setSelectedProject(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  const getCardStyles = (index) => {
    const total = projects.length;
    let diff = index - currentIndex;
    
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;

    const isActive = diff === 0;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) return { opacity: 0, display: "none" };

    const stepX = isMobile ? 45 : 110; 
    const translateX = diff * stepX;
    
    const scale = isActive ? 1 : (isMobile ? 0.75 : 0.85) - absDiff * 0.05;
    const zIndex = 50 - absDiff;
    const rotateY = diff * (isMobile ? -8 : -12); 
    const filter = isActive ? "none" : `grayscale(50%) blur(${absDiff * 0.5}px)`;

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity: isActive ? 1 : (isMobile ? 0.4 : 0.6) / absDiff,
      filter,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
    };
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
    }
  };

  return (
    <>
      <section id="projects" className="py-12 md:py-24 px-4 sm:px-[5%] bg-dark select-none overflow-hidden">
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-center mb-2 text-white">
            My <span className="text-cyan">Projects</span>
          </h2>
        </Reveal>
        
        <Reveal direction="down">
          <p className="text-center text-muted font-medium tracking-[1px] text-[0.85rem] md:text-[0.95rem] uppercase mt-1 mb-10 md:mb-14">
            My <span className="text-cyan2">Favourite Work</span>
          </p>
        </Reveal>

        {/* --- 3D Carousel Wrapper --- */}
        <div className="relative max-w-[1200px] mx-auto min-h-[480px] md:min-h-[580px] flex items-center justify-center [perspective:1200px]">
          
          {/* প্রফেশনাল বামের বাটন (Chevron Left SVG) */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 md:left-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5b00ff] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(91,0,255,0.4)] hover:shadow-[0_4px_25px_rgba(91,0,255,0.7)] hover:bg-[#4b00d1] active:scale-90 transition-all duration-300 group"
            aria-label="Previous Project"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.75-7.75" />
            </svg>
          </button>

          {/* স্লাইড কার্ড এরিয়া */}
          <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[450px] md:h-[520px] flex items-center justify-center">
            {projects.map((p, index) => {
              return (
                <motion.div 
                  key={p.id} 
                  style={getCardStyles(index)}
                  className="absolute w-full h-full pointer-events-auto"
                  drag={isMobile ? "x" : false} 
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                >
                  <div className="bg-card border border-border rounded-[20px] overflow-hidden relative group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col h-full bg-[#0b1329]">
                    <div className="h-[160px] sm:h-[200px] md:h-[220px] relative overflow-hidden bg-white w-full">
                      <Image 
                        className="transition-transform duration-400 group-hover:scale-105 p-2" 
                        src={p.image} 
                        alt={p.title} 
                        fill
                        sizes="(max-width: 768px) 280px, 380px"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        priority={index === 0}
                      />
                      <div className="absolute top-3 left-3 bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-cyan w-8 h-8 rounded-lg flex items-center justify-center text-[0.75rem] font-bold backdrop-blur-sm z-10">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-[1.4rem] flex flex-col flex-grow">
                      <h3 className="font-syne text-[1rem] md:text-[1.15rem] font-bold mb-1 md:mb-2 text-white text-center line-clamp-1">{p.title}</h3>
                      <p className="text-[0.75rem] md:text-[0.83rem] text-muted leading-[1.5] md:leading-[1.65] mb-3 md:mb-4 line-clamp-3 text-center">{p.desc}</p>
                      
                      <div className="flex flex-wrap justify-center gap-1 mb-4 mt-auto">
                        {p.tech.slice(0, isMobile ? 3 : 4).map(t => ( 
                          <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-2 py-0.5 rounded-full text-[0.62rem] md:text-[0.68rem] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-1.5 md:gap-2">
                        <a 
                          href={p.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:opacity-85 transition-all flex items-center justify-center gap-0.5 sm:gap-1"
                        >
                          Live
                        </a>
                        
                        <button onClick={() => openModal(p)} className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-cyan hover:border-[rgba(0,212,255,0.3)] transition-all">👁 Details</button>
                        <a href={p.code} target="_blank" rel="noopener noreferrer" className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-pink hover:border-[rgba(255,45,120,0.3)] transition-all">&lt;/&gt; Code</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* প্রফেশনাল ডানের বাটন (Chevron Right SVG) */}
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-4 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5b00ff] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(91,0,255,0.4)] hover:shadow-[0_4px_25px_rgba(91,0,255,0.7)] hover:bg-[#4b00d1] active:scale-90 transition-all duration-300 group"
            aria-label="Next Project"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* --- Bottom Dots Pagination --- */}
        <div className="flex items-center gap-1.5 md:gap-2 justify-center mt-6 md:mt-10">
          {projects.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-400 ${index === currentIndex ? 'w-5 md:w-7 bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'w-2 bg-gray-500 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </section>

      {/* --- Modal Window --- */}
      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[rgba(3,11,24,0.85)] z-[9990] flex items-center justify-center p-3 sm:p-4 md:p-8 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border border-border rounded-[20px] md:rounded-[24px] w-full max-w-[720px] max-h-[92vh] overflow-y-auto relative bg-[#0b1329] shadow-2xl"
            >
              <button onClick={closeModal} className="absolute top-3 right-3 md:top-4 md:right-4 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-border text-text w-8 h-8 md:w-9 md:h-9 rounded-full text-[0.9rem] md:text-[1.2rem] flex items-center justify-center transition-all z-[10] hover:border-pink hover:text-pink">✕</button>
              
              <div className="w-full h-[180px] sm:h-[260px] md:h-[360px] relative bg-white">
                <Image 
                  className="rounded-t-[20px] md:rounded-t-[24px] p-4" 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>

              <div className="p-5 md:p-8">
                <h2 className="font-syne text-[1.2rem] md:text-[1.6rem] font-extrabold mb-2 text-white">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-1 md:gap-1.5 mb-4">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-2 py-0.5 rounded-full text-[0.65rem] md:text-[0.68rem] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-muted leading-[1.6] md:leading-[1.7] mb-6 text-[0.8rem] md:text-[0.9rem]">{selectedProject.longDesc}</p>

                <div className="mb-4 md:mb-5">
                  <h4 className="text-[0.75rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-1.5">⚡ Challenges Faced</h4>
                  <p className="text-muted text-[0.8rem] md:text-[0.85rem] leading-[1.5] md:leading-[1.6]">{selectedProject.challenges}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-[0.75rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-1.5">🚀 Future Improvements</h4>
                  <p className="text-muted text-[0.8rem] md:text-[0.85rem] leading-[1.5] md:leading-[1.6]">{selectedProject.improvements}</p>
                </div>

                <div className="flex gap-2 sm:gap-3 flex-wrap mt-6">
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2.5 rounded-[10px] text-[0.75rem] md:text-[0.82rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:scale-[1.02] active:scale-95 transition-all text-center flex-1 sm:flex-none flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 12 10 10-4.477 10-12S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    Live Project
                  </a>
                  
                  <a href={selectedProject.code} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-[10px] text-[0.75rem] md:text-[0.82rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-cyan hover:text-cyan hover:scale-[1.02] active:scale-95 transition-all text-center flex-1 sm:flex-none">&lt;/&gt; GitHub Repository</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}