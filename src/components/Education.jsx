"use client";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-24 px-[5%] bg-dark2">
      <Reveal>
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">Education<span className="text-cyan">.</span></h2>
      </Reveal>
      <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>

      <Reveal>
        <div className="max-w-[680px] mx-auto bg-card border border-border rounded-[20px] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink"></div>
          <span className="absolute top-6 right-6 bg-gradient-to-br from-[rgba(0,212,255,0.15)] to-[rgba(0,255,204,0.08)] border border-[rgba(0,212,255,0.25)] text-cyan px-[0.9rem] py-[0.3rem] rounded-full text-[0.75rem] font-semibold hidden md:inline-block">Currently Enrolled</span>
          
          <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center text-[1.5rem] mb-4">
            🎓
          </div>
          
          <h3 className="font-syne text-[1.4rem] font-bold mb-1">Diploma in Engineering</h3>
          <p className="text-cyan text-[0.9rem] mb-1">Computer Science & Technology</p>
          <p className="text-muted text-[0.82rem] mb-5">Graphic Arts Institute, Dhaka &nbsp;·&nbsp; 2023–2027</p>
          
          <p className="text-[0.82rem] text-muted mb-3">Key Courses & Skills Learned:</p>
          <div className="flex flex-wrap gap-2">
            {["Programming Fundamentals", "Web Development", "Database Management", "Software Engineering", "Data Structures", "Computer Networks"].map((course, i) => (
              <span key={i} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-text px-[0.8rem] py-[0.3rem] rounded-full text-[0.75rem]">
                {course}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
