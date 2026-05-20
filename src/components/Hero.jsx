"use client";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion"; // বাবল অ্যানিমেশনের জন্য ইমপোর্ট করা হয়েছে
import { 
  SiHtml5, 
  SiCss, // 👈 এখানে SiCss3 এর বদলে SiCss হবে
  SiTailwindcss, 
  SiGithub, 
  SiJavascript, 
  SiReact, 
  SiNodedotjs 
} from "react-icons/si";

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

  // ব্যাকগ্রাউন্ড বাবলসের জন্য আইকন লিস্ট ও পজিশন ডেটা
 const bubbleIcons = [
  { icon: <SiHtml5 className="text-[#E34F26]" />, left: "10%", size: 30, delay: 0, duration: 12 },
  { icon: <SiCss className="text-[#1572B6]" />, left: "40%", size: 24, delay: 3, duration: 14 }, // 👈 এখানেও SiCss হবে
  { icon: <SiTailwindcss className="text-[#06B6D4]" />, left: "75%", size: 36, delay: 1, duration: 11 },
  { icon: <SiGithub className="text-white" />, left: "25%", size: 28, delay: 5, duration: 15 },
  { icon: <SiJavascript className="text-[#F7DF1E]" />, left: "60%", size: 32, delay: 2, duration: 13 },
  { icon: <SiReact className="text-[#61DAFB]" />, left: "90%", size: 35, delay: 6, duration: 10 },
  { icon: <SiNodedotjs className="text-[#339933]" />, left: "50%", size: 26, delay: 4, duration: 16 },
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
      { ring: 1, angle: Math.PI / 2 },
      { ring: 1, angle: Math.PI },
      { ring: 1, angle: (3 * Math.PI) / 2 },
      { ring: 2, angle: 0 },
      { ring: 2, angle: (2 * Math.PI) / 5 },
      { ring: 2, angle: (4 * Math.PI) / 5 },
      { ring: 2, angle: (6 * Math.PI) / 5 },
      { ring: 2, angle: (8 * Math.PI) / 5 }
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
    {
      name: "React",
      icon: (
        <svg width="22" height="22" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      ),
    },
    {
      name: "Node.js",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#339933" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.5l8.25 4.75v9.5L12 20.5l-8.25-4.75v-9.5L12 1.5zm0 2.3L6.15 7.15v6.7L12 17.2l5.85-3.35v-6.7L12 3.8z"/>
        </svg>
      ),
    },
    {
      name: "MongoDB",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#47A248" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .133c-.15 0-.3.045-.435.135C10.74 1.133 5.43 5.922 5.43 11.455c0 4.14 2.685 7.8 6.57 9.045v3.367c0 .1.03.18.09.255a.39.39 0 0 0 .54 0c.06-.075.09-.155.09-.255v-3.367c3.885-1.245 6.57-4.905 6.57-9.045 0-5.533-5.31-10.322-6.135-11.187A.765.765 0 0 0 12 .133zM12 2.1c.06.075 4.41 4.545 4.41 9.355 0 2.91-1.635 5.61-4.41 6.645V2.1zm0 0V18.1c-2.775-1.035-4.41-3.735-4.41-6.645 0-4.81 4.35-9.28 4.41-9.355z"/>
        </svg>
      ),
    },
    {
      name: "Firebase",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.89 15.75L9.31 4.91c.2-.39.77-.39.97 0l1.8 3.59-8.19 7.25z" fill="#FFC400"/>
          <path d="M13.92 10.38l1.9-3.78c.2-.39.77-.39.97 0l3.32 6.58-6.19-2.8z" fill="#FF9100"/>
          <path d="M2.5 18.25l1.62-1.43 8.32-7.36 2.05 4.08 5.86-5.83 1.15 2.28c.17.34.05.76-.27.95l-8.6 4.97c-.32.18-.72.18-1.04 0l-9.09-5.26z" fill="#DD2C00"/>
        </svg>
      ),
    },
    {
      name: "Tailwind",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6.5c-2.3 0-3.6 1.1-4 3.4.9-1.2 2-1.6 3.4-1.2.8.3 1.4.9 2 1.5 1.1 1.1 2.3 2.3 4.8 2.3 2.3 0 3.6-1.1 4-3.4-.9 1.2-2 1.6-3.4 1.2-.8-.3-1.4-.9-2-1.5-1.1-1.1-2.3-2.3-4.8-2.3zM6 12.5c-2.3 0-3.6 1.1-4 3.4.9-1.2 2-1.6 3.4-1.2.8.3 1.4.9 2 1.5 1.1 1.1 2.3 2.3 4.8 2.3 2.3 0 3.6-1.1 4-3.4-.9 1.2-2 1.6-3.4 1.2-.8-.3-1.4-.9-2-1.5-1.1-1.1-2.3-2.3-4.8-2.3z" fill="#06B6D4"/>
        </svg>
      ),
    },
    {
      name: "Express",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 10.15h-4.3c-.4 0-.7.3-.7.7v2.3c0 .4.3.7.7.7H24v1.5h-4.3c-1.2 0-2.2-1-2.2-2.2v-2.3c0-1.2 1-2.2 2.2-2.2H24v1.5zM15.4 8.65h-4.8v6.8h1.5v-2.3h3.3c1.2 0 2.2-1 2.2-2.2v-.1c0-1.2-1-2.2-2.2-2.2zm0 3H12.1v-1.5h3.3v1.5zM7.3 8.65H1v1.5h4.8v1.1H2.4c-1.2 0-2.2 1-2.2 2.2v.1c0 1.2 1 2.2 2.2 2.2H7.3v-1.5H2.4v-1.2h3.4c1.2 0-2.2-1-2.2-2.2v-.9c0-1.2-1-2.3-2.2-2.3z"/>
        </svg>
      ),
    },
    {
      name: "JavaScript",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#F7DF1E" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0zm21.734 17.41c-.26-.64-.9-1.07-1.74-1.07-.94 0-1.56.51-1.56 1.54 0 1.4.88 1.69 2.15 2.2.16.06.33.12.5.19 1.76.67 2.45 1.5 2.45 3.03 0 2.1-1.57 3.33-4.13 3.33-2.2 0-3.52-1.05-4.04-2.4l1.5-1c.36.85.99 1.52 2.45 1.52 1.07 0 1.72-.47 1.72-1.4 0-1.08-.53-1.4-1.85-1.92l-.6-.24c-1.58-.64-2.45-1.39-2.45-3.14 0-2 1.52-3.1 3.73-3.1 1.8 0 3.14.86 3.72 2.2l-1.5.96zM11.234 16h1.77v6.64c0 2.23-1.12 3.36-3.4 3.36-1.54 0-2.73-.72-3.23-1.93l1.5-.96c.33.69.83 1.05 1.67 1.05.97 0 1.46-.44 1.46-1.52V16z"/>
        </svg>
      ),
    },
    {
      name: "Daisy UI",
      icon: (
        <svg width="22" height="22" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 0C9.4 0 0 9.4 0 21s9.4 21 21 21 21-9.4 21-21S32.6 0 21 0zm7.1 27.6c-1.2 2.4-3.7 4-6.6 4-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5c2.9 0 5.4 1.7 6.6 4h4.4c-1.5-4.7-5.9-8-11-8-6.4 0-11.5 5.1-11.5 11.5S15.1 35.5 21.5 35.5c5.1 0 9.5-3.3 11-8h-4.4z" fill="#FFB800" />
        </svg>
      ),
    },
    {
      name: "Better Auth",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 11l2 2 4-4"/>
        </svg>
      ),
    },
  ];

  const techs = [
    "Firebase", "Tailwind CSS", "HTML", "JavaScript", "React.js", 
    "Next.js", "MongoDB", "Express.js", "Git", "GitHub", 
    "UI/UX Design", "React Hook Form", "DaisyUI", "Email.js", "Date-fns", "Better Auth"
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-20 md:pt-[100px]">
      <div className="hero-grid-bg absolute inset-0 pointer-events-none"></div>
      <div className="absolute top-[15%] right-[5%] md:right-[10%] w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.12)_0%,transparent_70%)] pointer-events-none animate-pulse-glow hidden md:block"></div>
      
      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 md:px-[5%] flex-grow content-center py-8">
        
        {/* LEFT SIDE - Photo + Orbit Animation */}
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
                ref={el => { orbitNodesRef.current[i] = el; }} 
                className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1 cursor-none group"
              >
                <div className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-[14px] bg-card2 border border-border flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] group-hover:border-cyan group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] group-hover:scale-110">
                  {node.icon}
                </div>
                <span className="text-[0.55rem] sm:text-[0.6rem] text-muted whitespace-nowrap font-medium">{node.name}</span>
              </div>
            ))}

            {/* Profile Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] md:w-[240px] md:h-[240px] z-10 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-[rgba(0,212,255,0.4)] shadow-[0_0_60px_rgba(0,212,255,0.25),inset_0_0_60px_rgba(0,212,255,0.05)] animate-photo-float relative">
                <Image 
                  src="/injamam.jpg" 
                  alt="Injamamul Hoq" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="absolute bg-gradient-to-r from-[#0a1428] via-[#112244] to-[#0a1428] border border-cyan-400/40 rounded-2xl px-6 py-3 text-[0.82rem] font-medium text-white whitespace-nowrap backdrop-blur-xl shadow-[0_10px_30px_rgba(0,212,255,0.2)] bottom-[16%] sm:bottom-[18%] left-1/3 -translate-x-1/2 animate-tag-float2 z-20">
               <span className="font-bold text-[#00f0ff]">Modern</span> Web Developer
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Text Content + 🌟 Floating Bubbles */}
        <div className="flex-1 text-center md:text-left order-1 md:order-2 z-[2] pt-8 md:pt-0 animate-slideInRight relative min-h-[400px]">
          
          {/* 🌟 Bubble Container (ডানদিকের টেক্সটের ঠিক পেছনে থাকবে) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {bubbleIcons.map((bubble, index) => (
              <motion.div
                key={index}
                className="absolute opacity-15 filter blur-[0.5px]"
                style={{ 
                  left: bubble.left, 
                  bottom: "-50px", // স্ক্রিনের নিচ থেকে শুরু হবে
                  fontSize: bubble.size 
                }}
                animate={{
                  y: ["0px", "-500px"], // নিচ থেকে উপরে যাবে
                  x: ["0px", index % 2 === 0 ? "25px" : "-25px", "0px"], // হালকা আঁকাবাঁকা (Sway) মোশন
                  rotate: [0, 180, 360] // ভাসার সাথে সাথে আলতো ঘুরবে
                }}
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {bubble.icon}
              </motion.div>
            ))}
          </div>

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
            {[
              { icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>), url: "https://github.com/injamamulhoqtamim-bit" },
              { icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>), url: "https://www.linkedin.com/in/injamamul-hoq-tamim/" },
              { icon: (<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>), url: "https://www.facebook.com/injamamulo" },
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
      <div className="w-full border-t border-b border-cyan-900/50 bg-black/60 backdrop-blur-md py-4 select-none pointer-events-none mt-auto">
        <div className="overflow-hidden flex">
          <div className="flex animate-marquee-continuous whitespace-nowrap gap-8 md:gap-12 text-sm md:text-base font-medium text-cyan-300 will-change-transform">
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

      {/* Tailwind & Custom Keyframes */}
      <style jsx>{`
        @keyframes marqueeContinuous {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .animate-marquee-continuous {
          animation: marqueeContinuous 25s linear infinite !important;
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