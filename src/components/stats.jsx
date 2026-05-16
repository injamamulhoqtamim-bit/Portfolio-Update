"use client";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Internship", value: 0, suffix: "+" },
  { label: "Publication", value: 0, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "+" },
  { label: "Dedication", value: 100, suffix: "%" },
];

const StatCard = ({ label, value, suffix }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

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
    const duration = 2000; // ২ সেকেন্ড ধরে এনিমেশন চলবে
    const increment = value / (duration / 16); // ১৬মি.সে. প্রতি ফ্রেম

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
    <div ref={countRef} className="flex flex-col items-center justify-center p-6 bg-[rgba(13,31,53,0.3)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-2xl hover:border-[#00d4ff]/50 transition-all duration-300 group">
      <h3 className="text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#00d4ff] transition-colors">
        {count}{suffix}
      </h3>
      <p className="text-[#94a3b8] text-sm md:text-base font-medium mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-[5%] max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}