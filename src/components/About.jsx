"use client";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 px-[5%] bg-dark2">
      <Reveal>
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">About <span className="text-cyan">Me</span></h2>
      </Reveal>
      <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          {[
            { icon: "🚀", title: "My Journey", text: "My programming journey started when I discovered the fascinating world of web development. What began as curiosity about how websites work has evolved into a passion for creating digital solutions and learning new technologies every day." },
            { icon: "💡", title: "What I Enjoy", text: "I enjoy working on personal projects that challenge me to learn new concepts and technologies. I'm particularly drawn to frontend development where I can see my code come to life visually and create engaging user experiences." },
            { icon: "🎯", title: "Beyond Coding", text: "When I'm not coding, you'll find me exploring new programming tutorials, practicing coding challenges, reading tech blogs, or working on personal projects. I also enjoy outdoor activities like hiking and photography." },
            { icon: "🔥", title: "My Motivation", text: "I'm motivated by the endless possibilities in web development and the opportunity to create digital experiences that make a difference. Every project is a chance to learn something new and sharpen my skills." },
          ].map((item, i) => (
            <Reveal key={i}>
              <div className="bg-card border border-border rounded-[16px] p-[1.4rem] flex gap-4 items-start transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:translate-x-1.5">
                <div className="w-[44px] h-[44px] min-w-[44px] rounded-xl bg-gradient-to-br from-[rgba(0,212,255,0.15)] to-[rgba(0,255,204,0.08)] flex items-center justify-center text-[1.2rem]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[0.95rem] font-semibold mb-1 text-white">{item.title}</h4>
                  <p className="text-[0.83rem] text-muted leading-[1.65]">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "1+", label: "Years Learning" },
                { num: "10+", label: "Projects Built" },
                { num: "8+", label: "Technologies" },
                { num: "100%", label: "Dedication" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-[14px] p-[1.2rem] text-center transition-all duration-300 hover:border-[rgba(0,212,255,0.25)] hover:bg-card2">
                  <div className="font-syne text-[2rem] font-extrabold text-cyan">{stat.num}</div>
                  <div className="text-[0.78rem] text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal>
            <div className="bg-gradient-to-br from-[rgba(0,212,255,0.06)] to-[rgba(255,45,120,0.04)] border border-border rounded-[14px] p-[1.4rem] relative">
              <span className="absolute -top-2.5 left-3.5 text-[3.5rem] text-pink font-serif leading-none">“</span>
              <p className="italic text-text mt-4 leading-[1.65] text-[0.88rem]">Code is like humor. When you have to explain it, it&apos;s bad.</p>
              <p className="text-cyan text-[0.78rem] mt-3 font-semibold">— Cory House</p>
            </div>
          </Reveal>
          
          <Reveal>
            <div className="bg-card border border-border rounded-[14px] p-[1.2rem]">
              <p className="text-[0.78rem] text-muted mb-3">Currently working with</p>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Firebase", "Express.js", "Next.js", "Redux"].map((tag, i) => (
                  <span key={i} className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] text-cyan px-[0.75rem] py-[0.3rem] rounded-full text-[0.75rem] font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
