"use client";
import { useEffect, useState, useRef } from "react";

// 📊 আপডেট করা স্ট্যাটস ডাটা (সার্টিফিকেটের জন্য targetId সহ)
const stats = [
  { label: "Technologies", value: 8, suffix: "+", targetId: "technologies" },
  { label: "Projects Built", value: 10, suffix: "+", targetId: "projects" },
  { label: "Internship", value: 0, suffix: "+" },
  { label: "Publication", value: 0, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "+", targetId: "certificates" }, // এখানে সার্টিফিকেট আইডি যুক্ত করা হয়েছে
  { label: "Dedication", value: 100, suffix: "%" },
];

const StatCard = ({ label, value, suffix, targetId }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  // 🖱️ নির্দিষ্ট সেকশনে স্মুথ স্ক্রল করার ফাংশন
  const handleClick = () => {
    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div 
      ref={countRef} 
      onClick={handleClick} // ক্লিকের ইভেন্ট
      className={`flex flex-col items-center justify-center p-5 md:p-6 bg-[rgba(13,31,53,0.3)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-2xl hover:border-[#00d4ff]/50 transition-all duration-300 group ${
        targetId ? "cursor-pointer active:scale-95" : ""
      }`}
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#00d4ff] transition-colors">
        {count}{suffix}
      </h3>
      <p className="text-[#94a3b8] text-[0.75rem] sm:text-xs md:text-sm font-medium mt-2 uppercase tracking-wider text-center">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-[5%] max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}