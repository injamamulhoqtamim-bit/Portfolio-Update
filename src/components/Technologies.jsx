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
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white bg-black rounded-full p-0.5" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "React Hook Form", icon: <SiReacthookform className="text-[#EC5990]" /> },
    { name: "Better Auth", icon: <FaShieldAlt className="text-[#FF5733]" /> }, 
    { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    { name: "GitHub", icon: <SiGithub className="text-white" /> },
  ];

  // Container Variant (কার্ডগুলো একটির পর একটি আসার জন্য)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08 // বাউন্স ইফেক্ট দ্রুত করার জন্য টাইমিং কমানো হয়েছে
      },
    },
  };

  // 🌟 Spring/Loading Bounce অ্যানিমেশন ভ্যারিয়েন্ট
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6, // ছোট থেকে বড় হবে (Loading Effect)
      y: 40       // নিচ থেকে উপরে উঠবে
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",       // স্প্রিং অ্যানিমেশন টাইপ
        stiffness: 150,       // স্প্রিংয়ের টান বা গতি
        damping: 12,          // বাউন্স বা কাঁপুনির পরিমাণ (যত কম, তত বেশি বাউন্স হবে)
        mass: 0.5             // এলিমেন্টের ওজন (হালকা করার কারণে বাউন্স স্মুথ লাগবে)
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
        viewport={{ once: false, amount: 0.15 }} // স্ক্রল ইন-আউটে বারবার ট্রিগার হবে
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl mx-auto"
      >
        {technologies.map((tech, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 hover:shadow-[0_10px_25px_rgba(0,212,255,0.08)] group cursor-pointer"
          >
            {/* 🛠️ আইকন সাইজ ছোট করা হয়েছে (text-3xl sm:text-4xl) */}
            <div className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
              {tech.icon}
            </div>
            <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide group-hover:text-cyan transition-colors duration-300 text-center">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}