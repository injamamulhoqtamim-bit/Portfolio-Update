"use client";
import Reveal from "./Reveal";
import Image from "next/image";

export default function UpcomingProject() {
  // আপকামিং প্রজেক্টের ডাটা
  const upcomingProject = {
    title: 'Ghuro Bangla',
    tagline: 'Explore the Beauty of Bangladesh',
    desc: 'Ghure Dekho! Ghuro Bangla is a modern Tour & Travel platform designed to help users explore the beautiful destinations across Bangladesh with ease. It simplifies vacation planning by offering an all-in-one ecosystem for travelers.',
    image: '/ghurobangla.png', // 📸 আপনার public ফোল্ডারে থাকা ইমেজ পাথ
    features: [
      { name: 'Tour Packages', icon: '🗺️' },
      { name: 'Hotel Booking', icon: '🏨' },
      { name: 'Destination Guide', icon: '🧭' },
      { name: 'Responsive Design', icon: '📱' }
    ],
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Better Auth']
  };

  return (
    <section id="upcoming" className="py-24 px-[5%] bg-dark border-t border-border select-none">
      <div className="max-w-[1200px] mx-auto">
        
        {/* 📢 সেকশন হেডার */}
        <Reveal direction="down">
          <div className="text-center mb-16">
            <span className="text-[#5b00ff] font-bold text-[0.85rem] uppercase tracking-[3px] bg-[rgba(91,0,255,0.08)] px-4 py-1.5 rounded-full border border-[rgba(91,0,255,0.2)]">
              ✨ Next Big Thing
            </span>
            <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold mt-4 text-white">
              Upcoming <span className="text-cyan">Project</span>
            </h2>
          </div>
        </Reveal>

        {/* 📦 একক কার্ড লেআউট (সবকিছু একটি বডি ফ্রেমের ভেতর) */}
        <div className="max-w-[850px] mx-auto">
          <Reveal direction="up">
            <div className="bg-card border border-border rounded-[24px] overflow-hidden transition-all duration-300 group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              
              {/* 📸 ১. ইমেজের অংশ (কার্ডের একদম উপরে) */}
              <div className="w-full h-[240px] sm:h-[360px] md:h-[420px] relative bg-white overflow-hidden border-b border-border/40">
                <Image 
                  className="transition-transform duration-700 group-hover:scale-102 p-4 sm:p-6" 
                  src={upcomingProject.image} 
                  alt={upcomingProject.title} 
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 850px"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
                {/* লেবেল ওভারলে */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-border text-white text-[0.75rem] font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span> In Development
                </div>
              </div>

              {/* 📝 ২. ডিটেইলসের অংশ (একই কার্ডের ভেতরের বডি) */}
              <div className="p-6 sm:p-10 bg-gradient-to-b from-card to-card/60">
                
                {/* টাইটেল ও ট্যাগলাইন */}
                <div className="mb-6">
                  <h3 className="font-syne text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-1">
                    {upcomingProject.title}
                  </h3>
                  <p className="text-cyan text-[0.9rem] font-medium tracking-[0.5px]">
                    {upcomingProject.tagline}
                  </p>
                </div>

                {/* ডেসক্রিপশন */}
                <p className="text-muted text-[0.92rem] sm:text-[0.96rem] leading-[1.75] mb-8">
                  {upcomingProject.desc}
                </p>

                {/* 🎯 কি ফিচারসমূহ (Features Grid) */}
                <div className="mb-8">
                  <h4 className="text-[0.82rem] font-semibold text-cyan uppercase tracking-[1px] mb-4">
                    🚀 Key Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {upcomingProject.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-border/40 rounded-xl p-3.5 hover:border-[rgba(0,212,255,0.12)] transition-all"
                      >
                        <span className="text-[1.2rem]">{feature.icon}</span>
                        <span className="text-text text-[0.9rem] font-medium">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 🛠️ টেক স্ট্যাক (Tech Stack) */}
                <div className="border-t border-border/40 pt-6">
                  <h4 className="text-[0.82rem] font-semibold text-cyan uppercase tracking-[1px] mb-3.5">
                    🛠️ Planned Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {upcomingProject.tech.map((t) => (
                      <span 
                        key={t} 
                        className="bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.12)] text-cyan px-3.5 py-2 rounded-xl text-[0.78rem] font-semibold hover:border-cyan/30 transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div> {/* ডিটেইলস এরিয়া শেষ */}

            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}