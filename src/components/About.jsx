"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMapPin, FiMail, FiBookOpen } from "react-icons/fi";

export default function About() {
  const [showMapLoader, setShowMapLoader] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 🟢 Hydration error সমাধানের জন্য mounted স্টেট
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // কম্পোনেন্ট মাউন্ট হলে true হবে

    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const result = await res.json();

        if (result.success) {
          setAboutData(result.data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleLocationClick = (e, mapUrl) => {
    e.preventDefault();
    if (showMapLoader || !mapUrl) return;

    setShowMapLoader(true);

    setTimeout(() => {
      window.open(mapUrl, "_blank", "noopener,noreferrer");
      setShowMapLoader(false);
    }, 1500);
  };

  const locationText = aboutData?.location || "Banani BTCL Colony, Dhaka";
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;

  const infoData = [
    { 
      title: "Name", 
      value: aboutData?.name || "Md. Injamamul Hoq", 
      icon: <FiUser /> 
    },
    { 
      title: "Location", 
      value: locationText, 
      icon: <FiMapPin />, 
      isLocation: true, 
      mapUrl: mapSearchUrl
    },
    { 
      title: "Email", 
      value: aboutData?.email || "injamamulhoqtamim@gmail.com", 
      icon: <FiMail />, 
      isEmail: true 
    },
    { 
      title: "Education", 
      value: aboutData?.education || "BSc in CSE", 
      icon: <FiBookOpen /> 
    }
  ];

  // 🟢 সার্ভার রেন্ডারিং সম্পন্ন না হওয়া পর্যন্ত ক্লায়েন্ট সাইড লোডিং দেখাবে না (Hydration mismatch প্রতিরোধ করতে)
  if (!isMounted || loading) {
    return (
      <section className="py-20 md:py-28 px-[5%] bg-dark2 text-center text-cyan flex items-center justify-center min-h-[400px]">
        <p className="animate-pulse">Loading About Details...</p>
      </section>
    );
  }

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
                alt={aboutData?.name || "Md. Injamamul Hoq"} 
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
              Hi, I'm <span className="bg-gradient-to-r from-cyan via-cyan2 to-pink text-transparent bg-clip-text">
                {aboutData?.name || "Injamamul Hoq"}
              </span>
              <span className="block text-gray-400 font-normal text-lg sm:text-xl mt-3">
                {aboutData?.intro}
              </span>
            </h3>
            
            {aboutData?.paragraph1 && (
              <p className="text-gray-400 leading-[1.8] text-base md:text-[1.05rem]">
                {aboutData.paragraph1}
              </p>
            )}

            {aboutData?.paragraph2 && (
              <p className="text-gray-400 leading-[1.8] text-base md:text-[1.05rem]">
                {aboutData.paragraph2}
              </p>
            )}
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {infoData.map((info, i) => (
              <div 
                key={i}
                onClick={(e) => info.isLocation && handleLocationClick(e, info.mapUrl)}
                className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-center transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 group ${
                  info.isLocation ? "cursor-pointer active:scale-[0.98]" : ""
                }`}
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
                    <span className="text-[0.95rem] text-white font-medium hover:text-cyan truncate block transition-colors">
                      {info.value}
                    </span>
                  ) : (
                    <span className="text-[0.95rem] text-white font-medium block truncate">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 📍 Map Overlay Section */}
      <AnimatePresence>
        {showMapLoader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[99999] flex flex-col items-center justify-center pointer-events-auto backdrop-blur-md"
          >
            <div className="map-btn-wrapper">
              <svg height="0" width="0">
                <filter id="land">
                  <feTurbulence result="turb" numOctaves="7" baseFrequency="0.006" type="fractalNoise"></feTurbulence>
                  <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale="700" in="SourceGraphic" in2="turb"></feDisplacementMap>
                </filter>
              </svg>
              <div className="map-btn animated-state">Opening Map...</div>
              <div className="pinpoint animated-state"></div>
              <div className="map-container animated-state">
                <div className="map fold-1"></div>
                <div className="map fold-2"></div>
                <div className="map fold-3"></div>
                <div className="map fold-4"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .map-btn-wrapper {
          --btn-color: #00d4ff;
          --text-color: #000000;
          --land-color: #ffdd9f;
          --veg-color: #36ad5aa9;
          --water-color: #b3e3ff;
          --transition-dur: 0.3s;
          position: relative;
          display: flex;
          font-size: 16px;
          font-family: "Inter", sans-serif;
          user-select: none;
          overflow: hidden;
          border-radius: 50ch;
          box-shadow: 0px 10px 40px rgba(0, 212, 255, 0.2);
        }
        .map-btn {
          padding: 1em 2em 1em 3.5em;
          border-radius: 50ch;
          background-color: var(--btn-color);
          font-weight: 600;
          color: var(--text-color);
        }
        .map-btn.animated-state {
          animation: mapBtnPulse 1.5s ease-in-out infinite alternate;
        }
        .pinpoint.animated-state {
          pointer-events: none;
          position: absolute;
          height: 60%;
          aspect-ratio: 1;
          top: 20%;
          left: 0.75em;
          background-color: #ff4747;
          z-index: 1;
          mask-image: radial-gradient(circle at center, #0000 0%, #0000 32%, #fff 36%);
          filter: blur(0.25px);
          animation: pinpointMove 1.5s ease-in-out infinite alternate;
        }
        .map-container.animated-state {
          pointer-events: none;
          position: absolute;
          left: 0px;
          top: 115px;
          perspective: 120px;
          transform-origin: 3em 0.5em;
          z-index: 0;
          animation: mapFoldOpen 1.5s ease-in-out infinite alternate;
        }
        .map {
          position: absolute;
          bottom: 100px;
          width: 120px;
          height: 200px;
          background-color: var(--water-color);
          background-image: linear-gradient(to bottom, #fff2, 30%, #0000);
          transform-origin: left bottom;
        }
        .map::after {
          content: "";
          top: -40px;
          left: 12px;
          width: 100%;
          height: 200%;
          background-color: var(--land-color);
          position: absolute;
          filter: url(#land);
          box-shadow: inset 0 0 48px 24px var(--veg-color);
          z-index: 0;
        }
        .fold-1, .fold-2, .fold-3, .fold-4 {
          mask-image: linear-gradient(to top, #fff, 97%, #0000);
          overflow: hidden;
        }
        .fold-1 { left: -60px; transform: rotateY(10deg) translateZ(30px); }
        .fold-2 { left: 60px; transform: rotateY(-10deg) translateZ(10px); }
        .fold-3 { left: -169px; transform: rotateY(-15deg) translateZ(-1px); }
        .fold-4 { left: 166px; transform: rotateY(15deg) translateZ(31px); }
        .fold-1::before, .fold-2::before, .fold-3::before, .fold-4::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 10px 16px 3px #0004;
          z-index: 1;
        }
        @keyframes mapFoldOpen {
          0% {
            transform: perspective(120px) rotateX(35deg) scaleX(0);
            opacity: 0;
          }
          100% {
            transform: perspective(100px) rotateX(35deg) scaleX(0.85);
            opacity: 1;
          }
        }
        @keyframes pinpointMove {
          0% {
            border-radius: 50%;
            transform: rotateZ(45deg);
          }
          100% {
            border-radius: 50% 50% 0 50%;
            transform: rotateZ(45deg) translate(-0.3em, -0.3em);
          }
        }
        @keyframes mapBtnPulse {
          0% { background-color: var(--btn-color); color: var(--text-color); }
          100% { background-color: #ffffff; color: #000000a6; }
        }
      `}</style>
    </section>
  );
}