"use client";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const orbitNodesRef = useRef([]);
  
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    { text: "Web Developer", color: "text-green-400" },
    { text: "UI/UX Designer", color: "text-pink-400" },
    { text: "Cyber Security Researcher", color: "text-red-400" },
  ];

  // Typing Animation
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 80;
    const currentTitle = titles[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentTitle.text.substring(0, currentText.length + 1));
        if (currentText.length === currentTitle.text.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(currentTitle.text.substring(0, currentText.length - 1));
        if (currentText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex]);

  // Orbit Animation
  useEffect(() => {
    const orbitData = [
      { ring: 1, angle: 0 },
      { ring: 1, angle: Math.PI },
      { ring: 2, angle: Math.PI / 4 },
      { ring: 2, angle: Math.PI + Math.PI / 4 },
      { ring: 2, angle: Math.PI / 2 },
      { ring: 2, angle: 3 * Math.PI / 2 }
    ];
    const RADII = { 1: 155, 2: 190 };
    
    let animationFrameId;

    const animOrbits = () => {
      const t = Date.now() / 1000;
      orbitData.forEach((o, i) => {
        const el = orbitNodesRef.current[i];
        if (!el) return;
        const speed = o.ring === 1 ? 0.6 : 0.4;
        const a = o.angle + t * speed * (o.ring === 2 ? -1 : 1);
        const r = RADII[o.ring];
        el.style.transform = `translate(${r * Math.cos(a) - 22}px,${r * Math.sin(a) - 28}px)`;
      });
      animationFrameId = requestAnimationFrame(animOrbits);
    };
    animOrbits();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const nodes = [
    { emoji: "⚛️", name: "React" },
    { emoji: "🟢", name: "Node.js" },
    { emoji: "🍃", name: "MongoDB" },
    { emoji: "🔥", name: "Firebase" },
    { emoji: "🎨", name: "Tailwind" },
    { emoji: "📦", name: "Express" },
  ];

  const techs = [
    "Firebase", "Tailwind CSS", "HTML", "JavaScript", "React.js", 
    "Next.js", "MongoDB", "Express.js", "Git", "GitHub", 
    "UI/UX Design", "React Hook Form", "DaisyUI", "Email.js", "Date-fns"
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col relative overflow-hidden pt-20 md:pt-[100px]">
      <div className="hero-grid-bg absolute inset-0 pointer-events-none"></div>
      <div className="absolute top-[15%] right-[5%] md:right-[10%] w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.12)_0%,transparent_70%)] pointer-events-none animate-pulse-glow hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 md:px-[5%] flex-1">
        
        {/* LEFT SIDE - Photo + Orbit Animation (Slide from Left) */}
        <div className="flex justify-center md:justify-start relative order-2 md:order-1 animate-slideInLeft">
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] lg:w-[420px] lg:h-[420px]">
            
            {/* Orbit Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[310px] md:h-[310px]">
              <div className="w-full h-full rounded-full border border-dashed border-[rgba(0,212,255,0.15)] animate-spin-slow"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[380px] md:h-[380px]">
              <div className="w-full h-full rounded-full border border-dashed border-[rgba(0,212,255,0.15)] animate-spin-slower"></div>
            </div>

            {/* Orbiting Tech Nodes */}
            {nodes.map((node, i) => (
              <div 
                key={i} 
                ref={el => orbitNodesRef.current[i] = el} 
                className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1 cursor-none group"
              >
                <div className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-[14px] bg-card2 border border-border flex items-center justify-center text-[1.3rem] sm:text-[1.4rem] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] group-hover:border-cyan group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] group-hover:scale-110">
                  {node.emoji}
                </div>
                <span className="text-[0.55rem] sm:text-[0.6rem] text-muted whitespace-nowrap font-medium">{node.name}</span>
              </div>
            ))}

            {/* Profile Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] md:w-[240px] md:h-[240px] z-10 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-[rgba(0,212,255,0.4)] shadow-[0_0_60px_rgba(0,212,255,0.25),inset_0_0_60px_rgba(0,212,255,0.05)] animate-photo-float relative">
                <Image 
                  src="/profile.jpg" 
                  alt="Injamamul Hoq" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating Tags */}
            <div className="absolute bg-[rgba(13,31,53,0.9)] border border-[rgba(0,212,255,0.2)] rounded-[10px] px-4 py-2 text-[0.75rem] font-semibold text-cyan whitespace-nowrap backdrop-blur-[8px] top-[8%] right-[5%] animate-tag-float1 hidden sm:block">
              ⚛ React
            </div>

            <div className="absolute bg-gradient-to-r from-[#0a1428] via-[#112244] to-[#0a1428] border border-cyan-400/40 rounded-2xl px-6 py-3 text-[0.82rem] font-medium text-white whitespace-nowrap backdrop-blur-xl shadow-[0_10px_30px_rgba(0,212,255,0.2)] bottom-[15%] sm:bottom-[18%] left-1/2 -translate-x-1/2 animate-tag-float2 z-20">
               <span className="font-bold text-[#00f0ff]">Modern</span> Web Developer
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Text Content (Slide from Right) */}
        <div className="flex-1 text-center md:text-left order-1 md:order-2 z-[2] pt-8 md:pt-0 animate-slideInRight">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] px-4 py-1.5 rounded-full text-[0.8rem] text-cyan mb-6 mx-auto md:mx-0">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-blink"></span> Available for work
          </div>

          <h1 className="font-syne text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.05] mb-4">
            <span className="text-white">Hi, I&apos;m<br/></span>
            <span className="bg-gradient-to-br from-cyan via-cyan2 to-pink text-transparent bg-clip-text">Injamamul Hoq</span>
          </h1>

          <p className={`text-[1.2rem] sm:text-[1.25rem] font-semibold mb-8 tracking-[0.5px] h-[38px] flex items-center justify-center md:justify-start ${titles[currentIndex].color}`}>
            ✦ {currentText}
            <span className="animate-blink">|</span>
          </p>

          <p className="text-muted leading-[1.75] max-w-[460px] mb-8 mx-auto md:mx-0 text-[0.95rem] sm:text-base">
            Design. Build. Secure — From user experience to secure code — designing and building the modern web.
          </p>

          <div className="flex gap-4 flex-wrap mb-8 justify-center md:justify-start">
            <a href="#projects" className="bg-gradient-to-br from-cyan to-cyan2 text-black px-7 py-[0.75rem] rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)]">
              View My Work
            </a>
            <a href="Portfolio CV.pdf" download className="bg-transparent text-text px-7 py-[0.75rem] rounded-full font-semibold border-[1.5px] border-[rgba(0,212,255,0.3)] transition-all duration-300 hover:border-cyan hover:text-cyan hover:-translate-y-0.5 flex items-center gap-2">
              <Download size={16} />
              View Resume
            </a>
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            {/* Social Icons */}
            {[
              { icon: (/* GitHub SVG */ <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>), url: "https://github.com/injamamulhoqtamim-bit" },
              { icon: (/* LinkedIn SVG */ <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>), url: "https://www.linkedin.com/in/injamamul-hoq-tamim/" },
              { icon: (/* Facebook SVG */ <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>), url: "https://www.facebook.com/injamamulo" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-[42px] h-[42px] border border-border rounded-full flex items-center justify-center text-muted hover:border-cyan hover:text-cyan hover:-translate-y-[3px] hover:bg-[rgba(0,212,255,0.08)] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Moving Ticker */}
      <div className="border-t border-b border-cyan-900/50 bg-black/60 backdrop-blur-md py-3.5 mt-auto">
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12 text-sm md:text-base font-medium text-cyan-300">
            {techs.map((tech, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                • {tech}
              </span>
            ))}
            {techs.map((tech, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-1.5">
                • {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}