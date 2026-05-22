"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 📜 ইউজার অন্তত ৩০০ পিক্সেল স্ক্রল করলে বাটনটি দেখাবে
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <button
        onClick={scrollToTop}
        title="Back to top"
        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-cyan2 border border-white/10 cursor-pointer flex items-center justify-center text-black text-[1.3rem] font-bold shadow-[0_4px_20px_rgba(0,212,255,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,212,255,0.45)] active:scale-90"
      >
        ↑
      </button>
    </div>
  );
}