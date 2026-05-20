"use client";
import { useState } from "react";
import Reveal from "./Reveal";
// 🎨 এখন শুধু Mail, MessageCircle, এবং Send ল্যুসিড থেকে নেওয়া হচ্ছে
import { Mail, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 4000);
  };

  // 🌐 কন্টাক্ট ডাটা লিস্ট (Facebook ও LinkedIn দুটোর জন্যই কাস্টম SVG ব্যবহার করা হয়েছে)
  const contactItems = [
    { 
      icon: <Mail size={20} className="text-cyan" />, 
      label: "Email", 
      val: "injamamulhoqtamim@gmail.com", 
      link: "mailto:injamamulhoqtamim@gmail.com",
      bg: "from-[rgba(0,212,255,0.15)] to-[rgba(0,212,255,0.02)]" 
    },
    { 
      icon: <MessageCircle size={20} className="text-[#25D366]" />, 
      label: "WhatsApp", 
      val: "+880 1511994008", 
      link: "https://wa.me/8801511994008", 
      bg: "from-[rgba(37,211,102,0.15)] to-[rgba(37,211,102,0.02)]" 
    },
    { 
      // 📘 কাস্টম ফেসবুক SVG আইকন
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1877F2]">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ), 
      label: "Facebook", 
      val: "Injamamul Hoq Tamim", 
      link: "https://www.facebook.com/injamamulo", 
      bg: "from-[rgba(24,119,242,0.15)] to-[rgba(24,119,242,0.02)]" 
    },
    { 
      // 💼 কাস্টম লিঙ্কডইন SVG আইকন (ল্যুসিডের অবিকল ডিজাইন)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A66C2]">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ), 
      label: "LinkedIn", 
      val: "Injamamul Hoq Tamim", 
      link: "https://www.linkedin.com/in/injamamul-hoq-tamim/", 
      bg: "from-[rgba(10,102,194,0.15)] to-[rgba(10,102,194,0.02)]" 
    }
  ];

  return (
    <section id="contact" className="py-24 px-[5%] bg-dark2">
      <Reveal direction="down">
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-1">
          Connected <span className="text-cyan">With </span> Me 
        </h2>
      </Reveal>
      
      <Reveal direction="down">
        <p className="text-center text-muted font-medium tracking-[2px] text-[0.95rem] uppercase mt-1 mb-14">
          Get In <span className="text-cyan2">Touch</span>
        </p>
      </Reveal>

      <Reveal>
        <p className="text-muted text-[0.9rem] leading-[1.7] max-w-[520px] mx-auto text-center mt-[-2rem] mb-10">
          Have a project in mind? Let&apos;s work together to bring your ideas to life.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 items-start max-w-6xl mx-auto">
        
        <div>
          <Reveal>
            <h3 className="font-syne text-[1.4rem] font-bold mb-3">Let&apos;s Connect</h3>
            <p className="text-muted text-[0.9rem] leading-[1.7] mb-6">
              I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {contactItems.map((ci, i) => (
              <Reveal key={i}>
                <a 
                  href={ci.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-card border border-border rounded-[14px] p-4 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:bg-gradient-to-r hover:from-card hover:to-border/20 hover:translate-x-2 block group"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${ci.bg} group-hover:scale-105 transition-transform duration-300`}>
                    {ci.icon}
                  </div>
                  
                  <div className="overflow-hidden w-full">
                    <div className="text-[0.72rem] text-muted mb-0.5 font-medium group-hover:text-cyan transition-colors">{ci.label}</div>
                    <div className="text-[0.88rem] font-medium text-text truncate">{ci.val}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="bg-card border border-border rounded-[20px] p-8">
            <h3 className="font-syne text-[1.3rem] font-bold mb-6">Send Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Your Name *</label>
                  <input required type="text" placeholder="Insert Your Name" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
                <div className="mb-4">
                  <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Email Address *</label>
                  <input required type="email" placeholder="Insert Your Email" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Subject *</label>
                <input required type="text" placeholder="Project Discussion" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
              </div>
              <div className="mb-4">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Message *</label>
                <textarea required placeholder="Tell me about your project..." className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none resize-y min-h-[110px] focus:border-[rgba(0,212,255,0.4)]"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-br from-cyan to-cyan2 text-black border-none p-3 rounded-xl font-bold text-[0.95rem] transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)]">
                <Send size={16} strokeWidth={2.5} />
                Send Message
              </button>
              {formSuccess && (
                <div className="bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.25)] text-[#00ff88] px-4 py-3 rounded-[10px] text-[0.85rem] mt-3 text-center">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}