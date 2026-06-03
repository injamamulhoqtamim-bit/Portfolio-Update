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
    tech: ['React.js', 'TailwindCSS',  'Vite', 'PostCSS', 'Node.js', 'Vercel' ],
    live: 'https://teachersfinding.vercel.app/', 
    code: '#',
    challenges: 'Designing an intuitive UI to represent relationship "tending" milestones without cluttering the screen.',
    improvements: ' Add secure Authentication & Authorization system- Implement Teacher Reviews and Ratings feature- Add Real-time Chat between students and teachers- Integrate Online Payment Gateway- Create an Admin Dashboard for platform management- Add Profile Image Upload system- Improve Search & Advanced Filtering options- Add Location-based tutor searching- Implement Favorite/Bookmark Teachers feature- Add Tuition Request Posting system- Add Email Notification and Booking Confirmation- Improve Website SEO optimization- Add Dark Mode support- Implement Pagination for better performance- Add Firebase or JWT Authentication- Improve Loading Speed and Performance Optimization- Add Multi-language Support (Bangla & English)- Create Mobile App version in future- Add Teacher Verification System- Implement Availability Scheduling System',
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
    tech: ['React', 'TailwindCSS',  'HTML', 'React Hook'],
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
    improvements: 'Backend and Database Integration: Migrate from mock static data/local JSON arrays to a secure backend database. ',
    longDesc: 'English Janala is an interactive English vocabulary and language learning web application. It is designed to help users learn new words, improve their vocabulary across different levels, and enhance their English language skills in an engaging and user-friendly way.'
  },
  {
    id: 6,
    title: 'Zyntrix Lab',
    desc: 'A polished, interactive corporate business website tailored to display professional services and drive enterprise growth.',
    image: '/zyntrixLab.jpg', 
    tech: ['HTML',  'TailwindCSS', 'JavaScript', 'React', 'Tawk.to'],
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
    tech: ['HTML5', 'TailwindCSS','React.js', ' DaisyUI','JavaScript(ES6+)', 'React-Toastify'],
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
    challenges: 'Dynamic State Management: Implementing the shopping cart logic required careful handling of array methods to ensure that items could be added or removed dynamically without causing UI desynchronization.Asynchronous Data Handling: Managing multiple API endpoints for categories and individual product details required efficient use of async/await to ensure that data loaded smoothly while preventing errors during rapid user interactions.UI/UX Synchronization: Ensuring the "Active" state of the category filter buttons remained consistent with the displayed content required precise DOM manipulation to avoid class conflicts.',
    improvements: 'Persistent Cart: Implement localStorage so that a users cart items remain saved even if they refresh the browser page.Search Functionality: Add a search bar to allow users to quickly find specific plants by name regardless of their category.Advanced Filtering: Include price-range sliders or sorting options  to enhance the shopping experience.Checkout Validation: Integrate a form-based checkout process with validation to simulate a real-world purchasing flow.',
    longDesc: 'Green Earth is a modern, responsive web application designed to help users browse, filter, and purchase various types of plants. By integrating a dynamic API, the platform provides a seamless shopping experience where users can categorize plants, view detailed product information through interactive modals, and manage their selections in real-time via a functional shopping cart.'
  }
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // লোডিং অ্যানিমেশনের নতুন স্টেট

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); 
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); 
      } else {
        setItemsPerPage(3); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [itemsPerPage, currentPage]);

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

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  // লোডিং ট্রিগার করার জন্য হেল্পার ফাংশন
  const triggerPageChange = (action) => {
    setIsLoading(true);
    setTimeout(() => {
      action();
      setIsLoading(false);
    }, 500); // ৫০০ মিলি-সেকেন্ডের একটি সুন্দর লোডিং টাইমিং
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      triggerPageChange(() => setCurrentPage(prev => prev - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      triggerPageChange(() => setCurrentPage(prev => prev + 1));
    }
  };

  const handleDotClick = (index) => {
    if (index !== currentPage) {
      setDirection(index > currentPage ? 1 : -1);
      triggerPageChange(() => setCurrentPage(index));
    }
  };

  const openModal = (p) => {
    setSelectedProject(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };

  return (
    <>
      <section id="projects" className="py-16 md:py-24 px-[5%] bg-dark select-none overflow-hidden">
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2 text-white">
            My <span className="text-cyan">Projects</span>
          </h2>
        </Reveal>
        
        <Reveal direction="down">
          <p className="text-center text-muted font-medium tracking-[1px] text-[0.95rem] uppercase mt-1 mb-14">
            My <span className="text-cyan2">Favourite Work</span>
          </p>
        </Reveal>

        <div className="relative max-w-[1200px] mx-auto min-h-[530px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {isLoading ? (
              /* --- লোডিং অ্যানিমেশন (Skeleton Layer) --- */
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full"
              >
                {[...Array(itemsPerPage)].map((_, idx) => (
                  <div key={`skeleton-${idx}`} className="bg-card border border-border rounded-[20px] p-5 flex flex-col h-[510px] animate-pulse">
                    <div className="h-[220px] bg-gray-800 rounded-[15px] w-full mb-4"></div>
                    <div className="h-6 bg-gray-800 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6 mb-5"></div>
                    <div className="flex gap-2 mb-6 mt-auto">
                      <div className="h-5 bg-gray-800 rounded-full w-14"></div>
                      <div className="h-5 bg-gray-800 rounded-full w-16"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 bg-gray-800 rounded-lg flex-1"></div>
                      <div className="h-9 bg-gray-800 rounded-lg flex-1"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* --- আসল প্রজেক্ট লিস্ট --- */
              <motion.div 
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full"
              >
                {visibleProjects.map((p, i) => (
                  <div key={p.id} className="h-full">
                    <Reveal direction="up">
                      <div className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 relative group hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col h-full">
                        <div className="h-[200px] sm:h-[240px] relative overflow-hidden bg-white w-full">
                          <Image 
                            className="transition-transform duration-400 group-hover:scale-105 p-2" 
                            src={p.image} 
                            alt={p.title} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            style={{ objectFit: 'contain', objectPosition: 'center' }}
                          />
                          <div className="absolute top-3 left-3 bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-cyan w-8 h-8 rounded-lg flex items-center justify-center text-[0.75rem] font-bold backdrop-blur-sm z-10">
                            0{startIndex + i + 1}
                          </div>
                        </div>
                        <div className="p-[1.2rem] md:p-[1.4rem] flex flex-col flex-grow">
                          <h3 className="font-syne text-[1.1rem] md:text-[1.15rem] font-bold mb-2 text-white">{p.title}</h3>
                          <p className="text-[0.8rem] md:text-[0.83rem] text-muted leading-[1.65] mb-4 line-clamp-3">{p.desc}</p>
                          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                            {p.tech.map(t => (
                              <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-[0.55rem] py-[0.2rem] rounded-full text-[0.68rem] font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap xs:flex-nowrap gap-2">
                            <a 
                              href={p.live} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:opacity-85 transition-all flex items-center justify-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 12 10 10-4.477 10-12S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                              </svg>
                              Live
                            </a>
                            
                            <button onClick={() => openModal(p)} className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-cyan hover:border-[rgba(0,212,255,0.3)] transition-all">👁 Details</button>
                            <a href={p.code} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-pink hover:border-[rgba(255,45,120,0.3)] transition-all">&lt;/&gt; Code</a>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Pagination Buttons --- */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-8 mt-12 md:mt-16 w-full">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0 || isLoading}
            className={`order-1 sm:order-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl border font-bold text-[0.78rem] md:text-[0.85rem] transition-all duration-300 flex items-center justify-center bg-transparent ${currentPage === 0 || isLoading ? 'border-dashed border-gray-600 text-gray-500 opacity-40 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black cursor-pointer'}`}
          >
            &larr; PREV
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center my-2 sm:my-0 order-none">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                disabled={isLoading}
                aria-label={`Go to page ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-400 ${isLoading ? 'cursor-not-allowed opacity-50' : ''} ${index === currentPage ? 'w-6 md:w-7 bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'w-2.5 bg-gray-500 hover:bg-gray-400'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1 || isLoading}
            className={`order-2 sm:order-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-[0.78rem] md:text-[0.85rem] transition-all duration-300 flex items-center justify-center ${currentPage === totalPages - 1 || isLoading ? 'bg-gray-700 text-gray-500 opacity-40 cursor-not-allowed' : 'bg-[#5b00ff] text-white hover:bg-[#4b00d1] shadow-[0_4px_15px_rgba(91,0,255,0.4)] cursor-pointer'}`}
          >
            {isLoading ? "LOADING..." : "NEXT →"}
          </button>
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
            className="fixed inset-0 bg-[rgba(3,11,24,0.85)] z-[9990] flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border border-border rounded-[20px] md:rounded-[24px] w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative"
            >
              <button onClick={closeModal} className="absolute top-3 right-3 md:top-4 md:right-4 bg-[rgba(255,255,255,0.06)] border border-border text-text w-8 h-8 md:w-9 md:h-9 rounded-full text-[1rem] md:text-[1.2rem] flex items-center justify-center transition-all z-[10] hover:border-pink hover:text-pink">✕</button>
              <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] relative bg-white">
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
                <h2 className="font-syne text-[1.3rem] md:text-[1.6rem] font-extrabold mb-2 text-white">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-[0.55rem] py-[0.2rem] rounded-full text-[0.68rem] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-muted leading-[1.7] mb-6 text-[0.85rem] md:text-[0.9rem]">{selectedProject.longDesc}</p>

                <div className="mb-5">
                  <h4 className="text-[0.78rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-2">⚡ Challenges Faced</h4>
                  <p className="text-muted text-[0.82rem] md:text-[0.85rem] leading-[1.6]">{selectedProject.challenges}</p>
                </div>

                <div className="mb-5">
                  <h4 className="text-[0.78rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-2">🚀 Future Improvements</h4>
                  <p className="text-muted text-[0.82rem] md:text-[0.85rem] leading-[1.6]">{selectedProject.improvements}</p>
                </div>

                <div className="flex gap-3 flex-wrap mt-6">
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 md:px-5 md:py-2.5 rounded-[10px] text-[0.78rem] md:text-[0.82rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:scale-105 transition-all text-center flex-1 sm:flex-none flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 12 10 10-4.477 10-12S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    Live Project
                  </a>
                  
                  <a href={selectedProject.code} target="_blank" rel="noopener noreferrer" className="px-4 py-2 md:px-5 md:py-2.5 rounded-[10px] text-[0.78rem] md:text-[0.82rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-cyan hover:text-cyan transition-all text-center flex-1 sm:flex-none">&lt;/&gt; GitHub Repository</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}