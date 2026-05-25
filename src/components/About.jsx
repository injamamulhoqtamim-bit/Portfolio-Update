"use client";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUser, FiMapPin, FiMail, FiBookOpen } from "react-icons/fi";

export default function About() {
  const infoData = [
    { title: "Name", value: "Md. Injamamul Hoq", icon: <FiUser /> },
    { 
      title: "Location", 
      value: "Banani BTCL Colony, Dhaka", 
      icon: <FiMapPin />, 
      isLocation: true, 
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Banani+BTCL+Colony,+Dhaka" 
    },
    { title: "Email", value: "injamamulhoqtamim@gmail.com", icon: <FiMail />, isEmail: true },
    { title: "Education", value: "BSc in CSE", icon: <FiBookOpen /> }
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-[5%] bg-dark2 overflow-hidden relative">
      <Reveal>
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
          <h2 className="font-syne text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold">
            About <span className="text-cyan">Me</span>
          </h2>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan/70 font-semibold mt-2 block">
            My Introduction
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        
        {/* LEFT SIDE - Profile Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }} 
          className="lg:col-span-5 flex justify-center relative"
        >
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-full lg:h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan/10 to-pink/10 rounded-3xl blur-3xl -z-10"></div>
            
            <div className="w-full h-full relative z-10 transition-all duration-700 hover:scale-[1.03]">
              <Image 
                src="/aboutme.png" 
                alt="Md. Injamamul Hoq" 
                fill 
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 450px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,212,255,0.2)]" 
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Info Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }} 
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-cyan via-cyan2 to-pink text-transparent bg-clip-text">Injamamul Hoq</span>
              <span className="block text-gray-400 font-normal text-lg sm:text-xl mt-3">
                a passionate Frontend Developer who loves building modern and responsive web applications.
              </span>
            </h3>
            
            <p className="text-gray-400 leading-[1.8] text-base md:text-[1.05rem]">
              I specialize in creating beautiful user interfaces using HTML, CSS, JavaScript, Tailwind CSS and React. I also enjoy exploring Cybersecurity and learning how to build more secure web systems.
            </p>
            
            <p className="text-gray-400 leading-[1.8] text-base md:text-[1.05rem]">
              My goal is to become a professional developer who creates innovative and secure digital experiences for people around the world.
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {infoData.map((info, i) => (
              <div 
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-center transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-xl text-cyan group-hover:bg-cyan group-hover:text-black transition-all duration-500 flex-shrink-0">
                  {info.icon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-xs text-gray-500 block uppercase tracking-widest font-bold mb-1">{info.title}</span>
                  
                  {info.isEmail ? (
                    <a href={`mailto:${info.value}`} className="text-[0.95rem] text-white font-medium hover:text-cyan truncate block transition-colors">
                      {info.value}
                    </a>
                  ) : info.isLocation ? (
                    <a href={info.mapUrl} target="_blank" rel="noopener noreferrer" className="text-[0.95rem] text-white font-medium hover:text-cyan truncate block transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-[0.95rem] text-white font-medium block truncate">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}