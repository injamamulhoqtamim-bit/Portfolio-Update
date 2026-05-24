"use client";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiMongodb, 
  SiTailwindcss, 
  SiGit, 
  SiReacthookform, 
  SiGithub
} from "react-icons/si";
import { FaShieldAlt } from "react-icons/fa"; 

export default function Technologies() {
  const technologies = [
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" />, url: "https://react.dev" },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, url: "https://nodejs.org" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white bg-black rounded-full p-0.5" />, url: "https://nextjs.org" },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, url: "https://www.mongodb.com" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" />, url: "https://tailwindcss.com" },
    { name: "React Hook Form", icon: <SiReacthookform className="text-[#EC5990]" />, url: "https://react-hook-form.com" },
    { name: "Better Auth", icon: <FaShieldAlt className="text-[#FF5733]" />, url: "https://better-auth.com" }, 
    { name: "Git", icon: <SiGit className="text-[#F05032]" />, url: "https://git-scm.com" },
    { name: "GitHub", icon: <SiGithub className="text-white" />, url: "https://github.com" },
  ];

  // Container Variant (কার্ডগুলো একটির পর একটি আসার জন্য)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08 
      },
    },
  };

  // 🌟 Spring/Loading Bounce অ্যানিমেশন ভ্যারিয়েন্ট
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 12, 
        mass: 0.5 
      }
    },
  };

  return (
    <section id="technologies" className="py-20 md:py-28 px-[5%] bg-dark1 overflow-hidden">
      <Reveal>
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <h2 className="font-syne text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-white">
            Tech <span className="text-cyan">nologies</span> 
          </h2>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan/70 font-semibold mt-2 block">
            My Tech Stack
          </span>
        </div>
      </Reveal>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl mx-auto"
      >
        {technologies.map((tech, i) => (
          <motion.a
            key={i}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="block bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 hover:shadow-[0_10px_25px_rgba(0,212,255,0.08)] group cursor-pointer no-underline"
          >
            {/* 🛠️ আইকন সাইজ */}
            <div className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
              {tech.icon}
            </div>
            <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide group-hover:text-cyan transition-colors duration-300 text-center">
              {tech.name}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}