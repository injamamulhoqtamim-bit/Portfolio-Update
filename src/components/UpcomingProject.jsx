"use client";
import Reveal from "./Reveal";
import Image from "next/image";
// 🚀 Framer Motion ইমপোর্ট করা হলো অ্যানিমেশনের জন্য
import { motion } from "framer-motion";
import { 
  Route, 
  BedDouble, 
  Compass, 
  Smartphone, 
  Layers3, 
  ArrowUpRight, 
  Sparkles,
  FileCode2,
  Paintbrush,
  Server,
  Database,
  ShieldCheck
} from "lucide-react";

export default function UpcomingProject() {
  const upcomingProject = {
    title: 'Ghuro Dekho',
    tagline: 'Explore the Beauty of Bangladesh',
    desc: 'Ghure Dekho! Ghuro Bangla is a modern Tour & Travel platform designed to help users explore the beautiful destinations across Bangladesh with ease. It simplifies vacation planning by offering an all-in-one ecosystem for travelers.',
    image: '/ghurobangla.png',
    features: [
      { name: 'Tour Packages', icon: Route },
      { name: 'Hotel Booking', icon: BedDouble },
      { name: 'Destination Guide', icon: Compass },
      { name: 'Responsive Design', icon: Smartphone }
    ],
    tech: [
      { name: 'React.js', icon: FileCode2 },
      { name: 'Tailwind CSS', icon: Paintbrush },
      { name: 'Node.js', icon: Server },
      { name: 'MongoDB', icon: Database },
      { name: 'Better Auth', icon: ShieldCheck }
    ]
  };

  // 🌀 Spring Effect কনফিগারেশন (কার্ডগুলোর জন্য)
  const springVariant = {
    hidden: { scale: 0.3, opacity: 0 },
    visible: (idx) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 15,
        delay: idx * 0.08, // একের পর এক স্প্রিং হয়ে আসবে
      },
    }),
  };

  // 🌊 নদীর ঢেউয়ের মতো টেক্সট ইফেক্ট (Coming Soon-এর প্রতিটি অক্ষরের জন্য)
  const waveContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1, // অক্ষরের মাঝে ঢেউয়ের গ্যাপ
      },
    },
  };

  const waveLetter = {
    animate: {
      y: [0, -4, 0], // উপর-নিচ মুভমেন্ট পরিমাণ (ইমেজের ওপর চিকন বাটনের জন্য কিছুটা অপ্টিমাইজড)
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="upcoming" className="py-16 sm:py-24 px-[4%] sm:px-[5%] bg-dark border-t border-border select-none relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* 📢 সেকশন হেডার */}
        <Reveal direction="down">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-[#5b00ff] font-bold text-[0.75rem] sm:text-[0.85rem] uppercase tracking-[2px] sm:tracking-[3px] bg-[rgba(91,0,255,0.08)] px-3.5 sm:px-4 py-1.5 rounded-full border border-[rgba(91,0,255,0.2)]">
              <Sparkles size={14} className="animate-pulse" /> Next Big Thing
            </span>
            <h2 className="font-syne text-[clamp(1.75rem,5vw,3rem)] font-extrabold mt-3 sm:mt-4 text-white leading-tight">
              Upcoming <span className="text-cyan">Project</span>
            </h2>
          </div>
        </Reveal>

        {/* 📦 একক CARD লেআউট */}
        <div className="max-w-[850px] mx-auto">
          <Reveal direction="up">
            <div className="bg-card border border-border rounded-[20px] sm:rounded-[24px] overflow-hidden transition-all duration-300 group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
              
              {/* 📸 ১. ইমেজের অংশ (Coming Soon বাটনটি এখন এখানে অন্তর্ভুক্ত) */}
              <div className="w-full h-[200px] xs:h-[240px] sm:h-[350px] md:h-[420px] relative bg-white border-b border-border/40 overflow-hidden rounded-t-[20px] sm:rounded-t-[24px]">
                <Image 
                  className="transition-transform duration-700 group-hover:scale-103" 
                  src={upcomingProject.image} 
                  alt={upcomingProject.title} 
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 850px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                
                {/* 🏷️ বাম পাশের লেবেল: In Development */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-md border border-border text-white text-[0.7rem] sm:text-[0.75rem] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-2 z-10">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan animate-ping opacity-75"></span>
                    <span className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan"></span>
                  </div>
                  <Layers3 size={14} className="text-cyan sm:w-[16px] sm:h-[16px]" strokeWidth={2.5} />
                  In Development
                </div>

                {/* 🌊 ডান পাশের লেবেল: ঢেউ খেলানো Coming Soon বাটন (ইমেজের ওপর সেট করা) */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <button 
                    disabled
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-border bg-black/70 backdrop-blur-md text-muted text-[0.7rem] sm:text-[0.8rem] font-medium cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <motion.span 
                      variants={waveContainer} 
                      animate="animate" 
                      className="flex items-center"
                    >
                      {"Coming Soon".split("").map((letter, index) => (
                        <motion.span
                          key={index}
                          variants={waveLetter}
                          className={`inline-block ${letter === " " ? "w-1" : ""}`}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.span>
                    <ArrowUpRight size={14} className="opacity-40" />
                  </button>
                </div>

              </div>

              {/* 📝 ২. ডিটেইলসের অংশ */}
              <div className="p-5 xs:p-6 sm:p-10 bg-gradient-to-b from-card to-card/60">
                
                <div className="mb-5 sm:mb-6">
                  <h3 className="font-syne text-[1.5rem] xs:text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-1">
                    {upcomingProject.title}
                  </h3>
                  <p className="text-cyan text-[0.85rem] sm:text-[0.9rem] font-medium tracking-[0.5px]">
                    {upcomingProject.tagline}
                  </p>
                </div>

                <p className="text-muted text-[0.88rem] sm:text-[0.96rem] leading-[1.65] sm:leading-[1.75] mb-6 sm:mb-8">
                  {upcomingProject.desc}
                </p>

                {/* 🎯 কি ফিচারসমূহ (Spring Animation Cards) */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="flex items-center gap-2 text-[0.78rem] sm:text-[0.82rem] font-semibold text-cyan uppercase tracking-[1px] mb-3.5">
                    <Sparkles size={14} /> Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {upcomingProject.features.map((feature, idx) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div 
                          key={idx}
                          custom={idx}
                          variants={springVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-3.5 bg-[rgba(255,255,255,0.015)] border border-border/40 rounded-xl p-3.5 transition-all duration-300 group/item hover:border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.02)] origin-center"
                        >
                          <div className="p-2 rounded-lg bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.1)] text-cyan transition-all duration-300 group-hover/item:bg-cyan group-hover/item:text-black group-hover/item:shadow-[0_0_15px_rgba(0,212,255,0.4)] shrink-0">
                            <IconComponent size={18} strokeWidth={2} />
                          </div>
                          <span className="text-text text-[0.85rem] sm:text-[0.9rem] font-medium group-hover/item:text-white transition-colors">
                            {feature.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 🛠️ টেক স্ট্যাক (Spring Animation Cards) */}
                <div className="border-t border-border/40 pt-5 sm:pt-6">
                  <h4 className="flex items-center gap-2 text-[0.78rem] sm:text-[0.82rem] font-semibold text-cyan uppercase tracking-[1px] mb-4">
                    <FileCode2 size={14} /> Planned Tech Stack
                  </h4>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {upcomingProject.tech.map((t, idx) => {
                      const TechIcon = t.icon;
                      return (
                        <motion.div 
                          key={idx}
                          custom={idx + 4} // ফিচার কার্ডগুলোর পর স্প্রিং হবে
                          variants={springVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col xs:flex-row items-center justify-center xs:justify-start gap-2 bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.1)] text-cyan px-3 py-2.5 rounded-xl hover:border-cyan/40 transition-all text-center xs:text-left group/tech origin-center"
                        >
                          <TechIcon size={15} className="text-cyan/70 group-hover/tech:text-cyan transition-colors shrink-0" />
                          <span className="text-[0.75rem] sm:text-[0.78rem] font-bold tracking-[0.3px]">
                            {t.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div> {/* ডিটেইলস এরিয়া শেষ */}

            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}