"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: 'English Janala',
    desc: 'A premium language learning platform with a focus on responsive design and interactive education. Features structured lessons, vocabulary building, and a sleek user interface for all devices.',
    image: '/english.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase Auth', 'TailwindCSS', 'Framer Motion'],
    live: 'https://english-janala-by.netlify.app/', code: 'https://github.com/farabi-x09/English-janala',
    challenges: 'Optimizing the responsive layout for diverse devices (Laptop, Tablet, Mobile) and ensuring a seamless interactive experience. Implementing a real-time progress tracking system.',
    improvements: 'Adding AI-driven pronunciation feedback, a community leaderboard, and downloadable offline study materials.',
    longDesc: 'English Janala (English Window) is a state-of-the-art platform for language enthusiasts. It offers a comprehensive curriculum from basic to advanced levels, featuring "English is Easy !!" philosophy. The platform includes interactive vocabulary modules, lesson-based learning (7+ levels), and a fully responsive design that works beautifully on desktops, iPad Pros, and iPhones.'
  },
  {
    id: 2,
    title: 'DigiTools',
    desc: 'An all-in-one platform for digital creators, offering premium AI tools, design assets, and productivity software. Features a streamlined workflow and intuitive asset management.',
    image: '/digiTools.png',
    tech: ['React.js', 'PostgreSQL', 'OpenAI API', 'TailwindCSS', 'Framer Motion'],
    live: 'https://my-digi-tools.netlify.app/', code: 'https://github.com/farabi-x09/Digi-Tools',
    challenges: 'Integrating multiple AI models and ensuring high performance when processing large design assets. Optimizing the dashboard for a seamless user experience across devices.',
    improvements: 'Adding more AI-powered design tools, collaborative workspace features, and direct integration with popular design software like Figma and Adobe Creative Cloud.',
    longDesc: 'DigiTools is a comprehensive SaaS platform designed to supercharge digital workflows. It provides creators with access to a curated collection of AI tools, professional templates, and design assets. Built with scalability in mind, it features a powerful backend for asset processing and a modern, responsive frontend for an optimal user experience.'
  },
  {
    id: 3,
    title: 'KeenKeeper',
    desc: 'Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most. Features relationship tracking, interaction history, and social insights.',
    image: '/kinkeper.jpg',
    tech: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion', 'PostgreSQL', 'Prisma', 'Clerk'],
    live: 'https://kinkeeper-theta.vercel.app/', code: 'https://github.com/farabi-x09/KeenKeeper',
    challenges: 'Designing a meaningful way to visualize social connections and implementing an intuitive "tending" system for relationships. Balancing feature richness with a clean, focused user interface.',
    improvements: 'Planning to add AI-driven interaction suggestions, calendar integration for important dates, and a mobile app for on-the-go relationship management.',
    longDesc: 'KeenKeeper is a sophisticated personal CRM designed to help you maintain and deepen your most important relationships. In an era of digital noise, KeenKeeper provides a dedicated space to track interactions, set reminders for reaching out, and gain insights into your social health.'
  }
];

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openModal = (p) => {
    setSelectedProject(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400); // Wait for animation
  };

  return (
    <>
      <section id="projects" className="py-24 px-[5%] bg-dark">
        <Reveal>
          <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">My <span className="text-cyan">Projects</span></h2>
        </Reveal>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>
        <Reveal>
          <p className="text-center text-muted max-w-[600px] mx-auto mt-[-2rem] mb-10 text-[0.88rem]">
            A selection of my favorite work. I&apos;m passionate about building clean, efficient, and user-friendly applications.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <div className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 relative group hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className="h-[240px] relative overflow-hidden bg-white">
                  <Image 
                    className="transition-transform duration-400 group-hover:scale-105 p-2" 
                    src={p.image} 
                    alt={p.title} 
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                  <div className="absolute top-3 left-3 bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-cyan w-8 h-8 rounded-lg flex items-center justify-center text-[0.75rem] font-bold backdrop-blur-sm z-10">
                    0{i + 1}
                  </div>
                </div>
                <div className="p-[1.4rem]">
                  <h3 className="font-syne text-[1.15rem] font-bold mb-2 text-white">{p.title}</h3>
                  <p className="text-[0.83rem] text-muted leading-[1.65] mb-4 line-clamp-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map(t => <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-[0.6rem] py-[0.25rem] rounded-full text-[0.7rem] font-medium">{t}</span>)}
                  </div>
                  <div className="flex gap-[0.7rem]">
                    <a href={p.live} target="_blank" className="flex-1 px-[0.55rem] py-2 rounded-lg text-center text-[0.78rem] font-semibold no-underline cursor-none transition-all duration-300 border-none bg-gradient-to-br from-cyan to-cyan2 text-black hover:opacity-85 hover:scale-105">🔴 Live Demo</a>
                    <button onClick={() => openModal(p)} className="flex-1 px-[0.55rem] py-2 rounded-lg text-center text-[0.78rem] font-semibold no-underline cursor-none transition-all duration-300 bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-[rgba(0,212,255,0.3)] hover:text-cyan">👁 Details</button>
                    <a href={p.code} target="_blank" className="flex-1 px-[0.55rem] py-2 rounded-lg text-center text-[0.78rem] font-semibold no-underline cursor-none transition-all duration-300 bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-[rgba(255,45,120,0.3)] hover:text-pink">&lt;/&gt; Code</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <div
        className={`fixed inset-0 bg-[rgba(3,11,24,0.95)] z-[9990] flex items-center justify-center p-8 backdrop-blur-md transition-opacity duration-300 ${modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        {selectedProject && (
          <div className={`bg-card border border-border rounded-[24px] w-full max-w-[720px] max-h-[85vh] overflow-y-auto relative transition-transform duration-400 ${modalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-5'}`}>
            <button onClick={closeModal} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.06)] border border-border text-text w-9 h-9 rounded-full cursor-none text-[1.2rem] flex items-center justify-center transition-all duration-300 z-[1] hover:border-pink hover:text-pink">✕</button>
            <div className="w-full h-[400px] relative bg-white">
              <Image 
                className="rounded-t-[24px] p-4" 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
            <div className="p-8">
              <h2 className="font-syne text-[1.6rem] font-extrabold mb-2">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedProject.tech.map(t => <span key={t} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-[0.6rem] py-[0.25rem] rounded-full text-[0.7rem] font-medium">{t}</span>)}
              </div>
              <p className="text-muted leading-[1.75] mb-6 text-[0.9rem]">{selectedProject.longDesc}</p>

              <div className="mb-5">
                <h4 className="text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-2.5">⚡ Challenges Faced</h4>
                <p className="text-muted text-[0.85rem] leading-[1.65]">{selectedProject.challenges}</p>
              </div>

              <div className="mb-5">
                <h4 className="text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-2.5">🚀 Future Improvements</h4>
                <p className="text-muted text-[0.85rem] leading-[1.65]">{selectedProject.improvements}</p>
              </div>

              <div className="flex gap-3 flex-wrap mt-6">
                <a href={selectedProject.live} target="_blank" className="px-5 py-2.5 rounded-[10px] text-[0.82rem] font-semibold no-underline cursor-none transition-all duration-300 bg-gradient-to-br from-cyan to-cyan2 text-black hover:scale-105">🔴 Live Project</a>
                <a href={selectedProject.code} target="_blank" className="px-5 py-2.5 rounded-[10px] text-[0.82rem] font-semibold no-underline cursor-none transition-all duration-300 bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-cyan hover:text-cyan">&lt;/&gt; GitHub (Client)</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
