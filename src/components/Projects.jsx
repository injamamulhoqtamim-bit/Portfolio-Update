"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: 'Sun Cart',
    desc: 'A modern e-commerce web application where users can seamlessly browse products, manage profiles, and access secure, protected pages.',
    image: '/suncart.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Auth', 'TailwindCSS'],
    live: '#',
    code: '#',
    challenges: 'Implementing robust route protection for product details and ensuring dynamic state management during profile updates.',
    improvements: 'Adding an integrated payment gateway (Stripe/SSLCommerz), advanced product filtering, and an admin dashboard.',
    longDesc: 'SunCart is a fully functional e-commerce web platform designed for a seamless shopping experience. It features user authentication, a dynamic profile management system, an interactive product catalog, and strictly protected detail pages accessible only to registered members.'
  },
  {
    id: 2,
    title: 'Keen Keeper',
    desc: 'A simple and intuitive friendship management app that helps you organize and keep track of meaningful personal relationships.',
    image: '/kinkeper.jpg',
    tech: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion', 'Prisma', 'Clerk Auth'],
    live: '#', 
    code: '#',
    challenges: 'Designing an intuitive UI to represent relationship "tending" milestones without cluttering the screen.',
    improvements: 'Integrating automated follow-up reminders, calendar syncing for birthdays, and AI-driven conversational icebreakers.',
    longDesc: 'KeenKeeper serves as a dedicated personal CRM. In today’s busy digital era, this application provides a focused space to track interactions, log shared memories, and nurture the connections that matter most to you.'
  },
  {
    id: 3,
    title: 'Digitools Platform',
    desc: 'An elite SaaS hub offering access to premium AI tools and high-quality digital assets to supercharge your creative workflow.',
    image: '/digiTools.png',
    tech: ['React.js', 'PostgreSQL', 'OpenAI API', 'TailwindCSS', 'Framer Motion'],
    live: '#', 
    code: '#',
    challenges: 'Optimizing API response handling from AI models and ensuring smooth asset loading performance.',
    improvements: 'Adding direct Figma/Adobe plugin integration, team workspaces, and real-time generation history logs.',
    longDesc: 'Digitools Platform is an all-in-one suite designed specifically for creators. It unlocks access to custom-trained AI generators, premium layout templates, and workflow boosters, making content creation faster and smarter.'
  },
  {
    id: 4,
    title: 'Zyntrix Lab',
    desc: 'A polished, interactive corporate business website tailored to display professional services and drive enterprise growth.',
    image: '/zyntrix.png', 
    tech: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'Nodemailer'],
    live: '#', 
    code: '#',
    challenges: 'Creating fluid, high-performance page transitions and building a secure contact/lead validation form.',
    improvements: 'Implementing a built-in booking/consultation calendar system and multi-language internationalization (i18n).',
    longDesc: 'Zyntrix Lab is a top-tier business ecosystem web application. It functions to establish a robust online presence through dynamic service showcase cards, interactive case studies, and responsive contact hooks.'
  },
  {
    id: 5,
    title: 'GitHub Tracker',
    desc: 'A specialized developer productivity tool built to monitor, analyze, and manage active GitHub repositories and issues smoothly.',
    image: '/github-tracker.png', 
    tech: ['React', 'GitHub Rest API', 'TailwindCSS', 'Recharts'],
    live: '#', 
    code: '#',
    challenges: 'Handling GitHub API rate limits efficiently and crafting responsive data charts for active issues.',
    improvements: 'Adding multi-repo comparison matrices, email alerts for critical bug openings, and sprint timeline charts.',
    longDesc: 'GitHub Tracker streamlines open-source management by aggregating repository statistics. Developers can view real-time issue states, track assignment logs, and visual bug closure frequencies in a sleek unified interface.'
  },
  {
    id: 6,
    title: 'Job Tracker',
    desc: 'An essential web dashboard designed for active job seekers to easily track, update, and manage their recruitment pipelines.',
    image: '/job-tracker.png', 
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
    live: '#', 
    code: '#',
    challenges: 'Structuring a dynamic drag-and-drop or status-update flow for jobs shifting across various application cycles.',
    improvements: 'Integrating resume scanning matching scores, interview date calendar overlays, and automated offer comparison charts.',
    longDesc: 'Job Tracker relieves the chaos of career hunting. It allows users to store corporate postings, set current application statuses (Applied, Interviewing, Offered, Rejected), track custom notes, and monitor response time analytics.'
  }
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // 📱 রেসপন্সিভ পেজিনেশন হ্যান্ডলার
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

  // পেজ সাইজ চেঞ্জ হলে কারেন্ট পেজ যাতে সীমার বাইরে না চলে যায়
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

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const openModal = (p) => {
    setSelectedProject(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  return (
    <>
      <section id="projects" className="py-16 md:py-24 px-[5%] bg-dark select-none">
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

        {/* 📦 রেসপন্সিভ প্রজেক্ট গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto min-h-[auto] md:min-h-[530px]">
          {visibleProjects.map((p, i) => (
            <div key={p.id} className="transition-all duration-500 transform opacity-100 scale-100 h-full">
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
                    {/* বাটনের রেসপন্সিভ ফ্লেক্স লেআউট */}
                    <div className="flex flex-wrap xs:flex-nowrap gap-2">
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:opacity-85 transition-all">🔴 Live</a>
                      <button onClick={() => openModal(p)} className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-cyan hover:border-[rgba(0,212,255,0.3)] transition-all">👁 Details</button>
                      <a href={p.code} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[75px] px-2 py-2 rounded-lg text-center text-[0.72rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-pink hover:border-[rgba(255,45,120,0.3)] transition-all">&lt;/&gt; Code</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* 🔘 রেসপন্সিভ PREV / NEXT এবং ডটস কন্ট্রোলার */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-8 mt-12 md:mt-16 w-full">
          {/* PREV BUTTON */}
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`order-1 sm:order-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl border font-bold text-[0.78rem] md:text-[0.85rem] transition-all duration-300 flex items-center justify-center bg-transparent ${currentPage === 0 ? 'border-dashed border-gray-600 text-gray-500 opacity-40 cursor-not-allowed' : 'border-white text-white hover:bg-white hover:text-black cursor-pointer'}`}
          >
            ← PREV
          </button>

          {/* DOTS INDICATORS */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center my-2 sm:my-0 order-none">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2.5 rounded-full transition-all duration-400 ${index === currentPage ? 'w-6 md:w-7 bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'w-2.5 bg-gray-500 hover:bg-gray-400'}`}
              />
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`order-2 sm:order-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-[0.78rem] md:text-[0.85rem] transition-all duration-300 flex items-center justify-center ${currentPage === totalPages - 1 ? 'bg-gray-700 text-gray-500 opacity-40 cursor-not-allowed' : 'bg-[#5b00ff] text-white hover:bg-[#4b00d1] shadow-[0_4px_15px_rgba(91,0,255,0.4)] cursor-pointer'}`}
          >
            NEXT →
          </button>
        </div>
      </section>

      {/* 📱 ফুলি রেসপন্সিভ ডিটেইলস মোডাল পপআপ */}
      <div
        className={`fixed inset-0 bg-[rgba(3,11,24,0.95)] z-[9990] flex items-center justify-center p-4 md:p-8 backdrop-blur-md transition-opacity duration-300 ${modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        {selectedProject && (
          <div className={`bg-card border border-border rounded-[20px] md:rounded-[24px] w-full max-w-[720px] max-h-[90vh] overflow-y-auto relative transition-transform duration-400 ${modalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-5'}`}>
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
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 md:px-5 md:py-2.5 rounded-[10px] text-[0.78rem] md:text-[0.82rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:scale-105 transition-all text-center flex-1 sm:flex-none">🔴 Live Project</a>
                <a href={selectedProject.code} target="_blank" rel="noopener noreferrer" className="px-4 py-2 md:px-5 md:py-2.5 rounded-[10px] text-[0.78rem] md:text-[0.82rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-cyan hover:text-cyan transition-all text-center flex-1 sm:flex-none">&lt;/&gt; GitHub Repository</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}