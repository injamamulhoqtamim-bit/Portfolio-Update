"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// 🎨 থিমের সাথে মানানসই Lucide Icons (Chevron icons যুক্ত করা হয়েছে)
import { Award, Calendar, ShieldCheck, ArrowUpRight, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function Certificates() {
  // 📜 আপনার সার্টিফিকেট ডাটা লিস্ট
  const certificates = [
    {
      title: "Professional Online Digital Marketing",
      organization: "UY Lab",
      date: "Nov 2023",
      image: encodeURI("/digital marketing image.png"), 
      credentialLink: encodeURI("/Digital Marketing.pdf"), 
    },
    {
      title: "Spoken English Excellence",
      organization: "UY Lab",
      date: "Nov 2024",
      image: encodeURI("/spoken image.png"), 
      credentialLink: encodeURI("/spoken english.pdf"), 
    },
    {
      title: "UI/UX Design",
      organization: "Southeast University",
      date: "Jan 2025",
      image: "/ui certificate.jpg", 
      credentialLink: "/ui certificate.jpg", 
    }
  ];

  // 📱 মোবাইল স্লাইডারের জন্য স্টেট
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  // 🌀 ডেস্কটপ গ্রিডের জন্য Spring Animation
  const cardSpring = {
    hidden: { scale: 0.6, opacity: 0, y: 40 },
    visible: (idx) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 15,
        delay: idx * 0.08,
      },
    }),
  };

  // 📱 মোবাইল স্লাইডের অ্যানিমেশন ভ্যারিয়েন্ট
  const slideVariants = {
    enter: { x: 50, opacity: 0, scale: 0.95 },
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { x: -50, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  // 🎨 কমন কার্ড কন্টেন্ট রেন্ডারার ফাংশন (যাতে কোড ডুপ্লিকেট না হয়)
  const renderCardContent = (cert, idx) => (
    <>
      {/* 📸 ১. রেস্পন্সিভ ইমেজ কন্টেইনার */}
      <div className="w-full h-[170px] xs:h-[200px] sm:h-[210px] md:h-[220px] relative bg-neutral-900 overflow-hidden border-b border-border/40 flex items-center justify-center">
        {cert.image ? (
          <Image
            className="transition-transform duration-700 group-hover:scale-105"
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority={idx === 0}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan/10 via-transparent to-[#5b00ff]/10 flex flex-col items-center justify-center gap-3 text-cyan/40 group-hover:text-cyan/70 transition-colors duration-500">
            <div className="p-3.5 rounded-full bg-card border border-border/60 shadow-inner">
              <FileText size={28} strokeWidth={1.5} className="animate-pulse" />
            </div>
            <span className="text-[0.7rem] font-medium tracking-[1px] uppercase opacity-60">PDF Document Included</span>
          </div>
        )}
        
        {/* ভেরিফাইড ব্যাজ */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-border/60 text-[0.65rem] text-cyan font-semibold px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-1 z-10">
          <ShieldCheck size={12} strokeWidth={2.5} /> Verified
        </div>
      </div>

      {/* 📝 ২. টেক্সট ও ডিটেইলস এরিয়া */}
      <div className="p-4 xs:p-5 sm:p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-card to-card/70">
        <div>
          {/* অর্গানাইজেশন ও ডেট */}
          <div className="flex items-center justify-between gap-2 text-muted text-[0.7rem] sm:text-[0.75rem] font-medium mb-2">
            <span className="text-cyan/90 font-semibold uppercase tracking-[0.5px] truncate max-w-[65%]">
              {cert.organization}
            </span>
            <span className="flex items-center gap-1 text-muted/70 flex-shrink-0">
              <Calendar size={11} /> {cert.date}
            </span>
          </div>

          {/* সার্টিফিকেটের টাইটেল */}
          <h3 className="text-[0.98rem] xs:text-[1.05rem] sm:text-[1.15rem] font-bold text-white leading-snug group-hover:text-cyan transition-colors mb-4 line-clamp-2 min-h-[2.6rem] sm:min-h-[3.2rem]">
            {cert.title}
          </h3>
        </div>

        {/* 🔘 ৩. বটম অ্যাকশন বাটন */}
        <div className="border-t border-border/30 pt-3.5 mt-2">
          <a
            href={cert.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.78rem] sm:text-[0.82rem] font-bold text-muted transition-all duration-300 group-hover:text-cyan hover:opacity-90"
          >
            View Document
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan" />
          </a>
        </div>
      </div>
    </>
  );

  return (
    <section id="certificates" className="py-16 sm:py-24 px-4 xs:px-6 sm:px-[5%] bg-dark border-t border-border select-none relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* 📢 সেকশন হেডার */}
        <Reveal direction="down">
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-[#5b00ff] font-bold text-[0.7rem] sm:text-[0.85rem] uppercase tracking-[2px] sm:tracking-[3px] bg-[rgba(91,0,255,0.08)] px-3 sm:px-4 py-1.5 rounded-full border border-[rgba(91,0,255,0.2)]">
              <Award size={13} className="animate-pulse" /> My Achievements
            </span>
            <h2 className="font-syne text-[1.6rem] xs:text-[1.8rem] sm:text-[clamp(2rem,5vw,3rem)] font-extrabold mt-3 text-white leading-tight">
              Certificates & <span className="text-cyan">Achievements</span>
            </h2>
          </div>
        </Reveal>

        {/* 📱 ১. মোবাইল ভিউ স্লাইডার (শুধুমাত্র ছোট স্ক্রিনের জন্য - `sm:hidden`) */}
        <div className="block sm:hidden relative w-full max-w-[360px] mx-auto">
          <div className="overflow-hidden min-h-[340px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-card border border-border rounded-[20px] overflow-hidden flex flex-col h-full w-full group shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                {renderCardContent(certificates[currentIndex], currentIndex)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 🔘 স্লাইডার নেভিগেশন বাটনসমূহ */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* ডট ইন্ডিকেটর */}
            <div className="flex gap-1.5">
              {certificates.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-5 bg-cyan" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>

            {/* Next / Prev বাটন */}
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-card border border-border text-white hover:text-cyan hover:border-cyan/50 active:scale-95 transition-all"
                aria-label="Previous Certificate"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-card border border-border text-white hover:text-cyan hover:border-cyan/50 active:scale-95 transition-all"
                aria-label="Next Certificate"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 💻 ২. ডেস্কটপ ও ট্যাবলেট ভিউ গ্রিড (বড় স্ক্রিনের জন্য - `hidden sm:grid`) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardSpring}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }} 
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col h-full"
            >
              {renderCardContent(cert, idx)}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}