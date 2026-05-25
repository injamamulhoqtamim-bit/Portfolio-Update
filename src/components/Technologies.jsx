"use client";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { 
  SiHtml5,
  SiCss,        
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiExpress,     
  SiMongodb, 
  SiTailwindcss, 
  SiReacthookform, 
  SiGit, 
  SiGithub,
  SiNpm
} from "react-icons/si";

// 🌼 DaisyUI অফিশিয়াল কাস্টম SVG আইকন
const DaisyUiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M12 0a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 9a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 0zm0 15a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 24a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 15zM4.5 7.5A4.5 4.5 0 0 0 0 12a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 9 12a4.5 4.5 0 0 0-4.5-4.5zm15 0A4.5 4.5 0 0 0 15 12a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 24 12a4.5 4.5 0 0 0-4.5-4.5z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

// 🛡️ Better Auth অফিশিয়াল কাস্টম SVG আইকন
const BetterAuthIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
  </svg>
);

// 🚀 HeroUI অফিশিয়াল কাস্টম SVG আইকন
const HeroUiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.1L12 20.1l-8-4V7.9l8-4 8 4v8.2zM12 6.5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
  </svg>
);

export default function Technologies() {
  const technologies = [
    { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" />, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", icon: <SiCss className="text-[#1572B6]" />, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" }, 
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" />, url: "https://react.dev" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" />, url: "https://nextjs.org" }, 
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, url: "https://nodejs.org" },
    { name: "Express.js", icon: <SiExpress className="text-white" />, url: "https://expressjs.com" }, 
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, url: "https://www.mongodb.com" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" />, url: "https://tailwindcss.com" },
    { name: "DaisyUI", icon: <div className="w-9 h-9 text-[#FFB800]"><DaisyUiIcon /></div>, url: "https://daisyui.com" }, 
    { name: "HeroUI", icon: <div className="w-9 h-9 text-[#0072F5]"><HeroUiIcon /></div>, url: "https://heroui.com/" }, 
    { name: "React Hook Form", icon: <SiReacthookform className="text-[#EC5990]" />, url: "https://react-hook-form.com" },
    { name: "Better Auth", icon: <div className="w-9 h-9 text-[#FF5733]"><BetterAuthIcon /></div>, url: "https://better-auth.com" }, 
    { name: "Git", icon: <SiGit className="text-[#F05032]" />, url: "https://git-scm.com" },
    { name: "GitHub", icon: <SiGithub className="text-white" />, url: "https://github.com" },
    { name: "npm", icon: <SiNpm className="text-[#CB3837]" />, url: "https://www.npmjs.com" },
  ];

  // Container Variant 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04 /* একটার পর একটা আইকন আসার গতি সামান্য ফাস্ট করা হলো */
      },
    },
  };

  // 🔄 ৪-দিক (Left, Right, Up, Down) থেকে আসার ডাইনামিক অ্যানিমেশন ভ্যারিয়েন্ট
  const multiDirectionVariants = {
    hidden: (i) => {
      // ইনডেক্স অনুযায়ী ডিরেকশন ভাগ করা হচ্ছে
      const directions = [
        { x: -50, y: 0 },  // Left থেকে আসবে
        { x: 50, y: 0 },   // Right থেকে আসবে
        { x: 0, y: -40 },  // Up (ওপর) থেকে আসবে
        { x: 0, y: 40 },   // Down (নিচ) থেকে আসবে
      ];
      const currentDirection = directions[i % 4];
      
      return {
        opacity: 0,
        scale: 0.7,
        x: currentDirection.x,
        y: currentDirection.y,
      };
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 12, 
        mass: 0.4
      }
    },
  };

  return (
    <section id="technologies" className="py-20 md:py-28 px-[5%] bg-dark1 overflow-hidden">
      <Reveal>
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <h2 className="font-syne text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-white">
            Tech <span className="text-cyan">nologies</span> 
          </h2>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan/70 font-semibold mt-2 block">
            My Tech Stack
          </span>
        </div>
      </Reveal>

      {/* আইকন ও নামের গ্রিড লেআউট */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-6 max-w-5xl mx-auto justify-items-center items-start"
      >
        {technologies.map((tech, i) => (
          <motion.a
            key={i}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={i} /* এখানে ইনডেক্স পাস করা হচ্ছে যাতে দিক নির্ধারণ করা যায় */
            variants={multiDirectionVariants}
            className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer no-underline w-full transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* আইকন এরিয়া */}
            <div className="text-4xl sm:text-5xl flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_12px_rgba(0,212,255,0.25)]">
              {tech.icon}
            </div>
            
            {/* আইকনের নিচের নাম */}
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide text-center group-hover:text-cyan transition-colors duration-300 select-none max-w-full truncate">
              {tech.name}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}