"use client";
import { GraduationCap, Code, ShieldAlert } from "lucide-react"; 
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-24 px-[5%] bg-dark2 overflow-x-hidden">
      
      {/* 🌟 স্ক্রোল করলে মেইন টাইটেলটি উপর থেকে নিচে আলতো করে নেমে আসবে এবং স্ক্রোল শেষে চলে যাবে */}
      <Reveal direction="down">
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">
          Education <span className="text-cyan">&</span> Experience
        </h2>
      </Reveal>
      
      <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>

      <div className="max-w-[760px] mx-auto flex flex-col gap-8">
        
        {/* 🎓 1. Bachelor of Science in Computer Science */}
        {/* স্ক্রোল করলে বাম দিক থেকে স্লাইড হয়ে আসবে এবং স্ক্রোল পার হলে আবার হাইড হবে */}
        <Reveal direction="left">
          <div className="bg-card border border-border rounded-[20px] p-8 relative overflow-hidden group hover:border-[rgba(0,212,255,0.3)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center text-white text-[1.5rem] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <GraduationCap size={26} />
              </div>
              <span className="bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)] text-cyan px-[0.9rem] py-[0.3rem] rounded-full text-[0.75rem] font-semibold self-start md:self-auto">
                2022 - 2026
              </span>
            </div>
            
            <h3 className="font-syne text-[1.4rem] font-bold mb-1 text-white">Bachelor of Science in Computer Science</h3>
            <p className="text-cyan text-[0.95rem] font-medium mb-3">Southeast University</p>
            <p className="text-[0.88rem] text-muted leading-relaxed">
              Studying core computer science concepts including web development, data structures, algorithms, and software engineering while building modern web applications.
            </p>
          </div>
        </Reveal>

        {/* 💻 2. Complete Web Development Course With Programming Hero */}
        {/* স্ক্রোল করলে ডান দিক থেকে স্লাইড হয়ে ভেতরে আসবে এবং স্ক্রোল পার হলে চলে যাবে */}
        <Reveal direction="right">
          <div className="bg-card border border-border rounded-[20px] p-8 relative overflow-hidden group hover:border-[rgba(0,212,255,0.3)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center text-white text-[1.5rem] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <Code size={24} />
              </div>
              <span className="bg-[rgba(255,107,157,0.12)] border border-[rgba(255,107,157,0.2)] text-pink px-[0.9rem] py-[0.3rem] rounded-full text-[0.75rem] font-semibold self-start md:self-auto">
                2026 - Present
              </span>
            </div>
            
            <h3 className="font-syne text-[1.4rem] font-bold mb-1 text-white">Complete Web Development Course</h3>
            <p className="text-pink text-[0.95rem] font-medium mb-4">Programming Hero</p>
            
            <ul className="flex flex-col gap-2.5 text-[0.85rem] text-muted list-none pl-1">
              <li className="flex items-start gap-2">
                <span className="text-cyan mt-0.5">▹</span>
                Currently learning modern web development technologies including HTML, CSS, JavaScript, React, and Tailwind CSS.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan mt-0.5">▹</span>
                Building responsive web interfaces and reusable UI components.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan mt-0.5">▹</span>
                Practicing real-world projects such as dashboards and interactive web applications.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan mt-0.5">▹</span>
                Improving problem-solving and performance optimization skills.
              </li>
            </ul>
          </div>
        </Reveal>

        {/* 🛡️ 3. Cybersecurity Research & Learning */}
        {/* স্ক্রোল করলে নিচ থেকে উপরের দিকে মসৃণভাবে ভেসে উঠবে এবং স্ক্রোল পার হলে চলে যাবে */}
        <Reveal direction="up">
          <div className="bg-card border border-border rounded-[20px] p-8 relative overflow-hidden group hover:border-[rgba(0,212,255,0.3)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center text-white text-[1.5rem] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <ShieldAlert size={24} />
              </div>
              <span className="bg-[rgba(167,139,250,0.12)] border border-[rgba(167,139,250,0.2)] text-[#a78bfa] px-[0.9rem] py-[0.3rem] rounded-full text-[0.75rem] font-semibold self-start md:self-auto">
                2026 - Present
              </span>
            </div>
            
            <h3 className="font-syne text-[1.4rem] font-bold mb-1 text-white">Cybersecurity Research & Learning</h3>
            <p className="text-[#a78bfa] text-[0.95rem] font-medium mb-4">Self Learning</p>
            
            <ul className="flex flex-col gap-2.5 text-[0.85rem] text-muted list-none pl-1">
              <li className="flex items-start gap-2">
                <span className="text-[#a78bfa] mt-0.5">▹</span>
                Conducting research on <span className="text-text font-medium">“An Empirical Study of Administrative Interface Exposure Dynamics and Governance Maturity Across Industry Sectors.”</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#a78bfa] mt-0.5">▹</span>
                Analyzing security risks related to administrative interface exposure and organizational governance practices.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#a78bfa] mt-0.5">▹</span>
                Writing a thesis book focused on cybersecurity vulnerabilities and secure system management.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#a78bfa] mt-0.5">▹</span>
                Exploring ethical hacking, web security vulnerabilities, and secure web development practices to improve application security.
              </li>
            </ul>
          </div>
        </Reveal>

      </div>
    </section>
  );
}