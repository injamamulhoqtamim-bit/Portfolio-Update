"use client";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion } from "framer-motion"; // অ্যানিমেশনের জন্য ইমপোর্ট
import { FiUser, FiMapPin, FiMail, FiBookOpen } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-[5%] bg-dark2 overflow-hidden">
      <Reveal>
        <div className="flex flex-col items-center mb-12 md:mb-20">
          <h2 className="font-syne text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-center">
            About <span className="text-cyan">Me</span>
          </h2>
          <div className="w-[70px] h-[4px] bg-gradient-to-r from-cyan to-cyan2 rounded-full mt-4"></div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        
        {/* LEFT SIDE - Profile Photo (Animates on Scroll In & Out) */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }} // শুরুতে বামে এবং ইনভিজিবল থাকবে
          whileInView={{ opacity: 1, x: 0 }} // স্ক্রিনে আসলে সামনে আসবে
          exit={{ opacity: 0, x: -100 }} // স্ক্রিন থেকে চলে গেলে আবার বামে চলে যাবে (ঐচ্ছিক, কিছু ক্ষেত্রে দরকার হয়)
          transition={{ duration: 0.8, ease: "easeOut" }}
          // key পরিবর্তন: once: false অ্যানিমেশনটিকে বারবার ট্রিগার করবে। 
          // amount: 0.3 মানে এলিমেন্টের ৩০% স্ক্রিনে আসলে অ্যানিমেশন শুরু হবে।
          viewport={{ once: false, amount: 0.3 }} 
          className="lg:col-span-5 flex justify-center relative"
        >
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-full lg:h-[450px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan/10 to-pink/10 rounded-3xl blur-3xl -z-10"></div>
            
            {/* Actual Image */}
            <div className="w-full h-full relative z-10 transition-all duration-700 hover:scale-[1.03]">
              <Image 
                src="/about me.jpg" 
                alt="Md. Injamamul Hoq" 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,212,255,0.2)]" 
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Info Grid (Animates on Scroll In & Out) */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }} // শুরুতে ডানে এবং ইনভিজিবল থাকবে
          whileInView={{ opacity: 1, x: 0 }} // স্ক্রিনে আসলে সামনে আসবে
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          // key পরিবর্তন: একবারের বদলে বারবার অ্যানিমেশন হবে
          viewport={{ once: false, amount: 0.3 }} 
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Hi, I&apos;m <span className="bg-gradient-to-r from-cyan via-cyan2 to-pink text-transparent bg-clip-text">Injamamul Hoq</span>
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
            {[
              { title: "Name", value: "Md. Injamamul Hoq", icon: <FiUser /> },
              { title: "Location", value: "Banani BTCL Colony, Dhaka", icon: <FiMapPin /> },
              { title: "Email", value: "injamamulhoqtamim@gmail.com", icon: <FiMail />, isEmail: true },
              { title: "Education", value: "BSc in CSE", icon: <FiBookOpen /> }
            ].map((info, i) => (
              <div 
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-center transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-xl text-cyan group-hover:bg-cyan group-hover:text-black transition-all duration-500">
                  {info.icon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-xs text-gray-500 block uppercase tracking-widest font-bold mb-1">{info.title}</span>
                  {info.isEmail ? (
                    <a href={`mailto:${info.value}`} className="text-[0.95rem] text-white font-medium hover:text-cyan truncate block transition-colors">
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