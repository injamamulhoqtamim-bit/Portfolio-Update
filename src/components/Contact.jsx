"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-[5%] bg-dark2">
      <Reveal>
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">Get In <span className="text-cyan">Touch</span></h2>
      </Reveal>
      <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>

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
            {[
              { icon: "📧", label: "Email", val: "farabiahmed2005@gmail.com", bg: "from-[rgba(0,212,255,0.2)] to-[rgba(0,212,255,0.05)]" },
              { icon: "📞", label: "Phone", val: "+880 1570203520", bg: "from-[rgba(0,255,136,0.2)] to-[rgba(0,255,136,0.05)]" },
              { icon: "💬", label: "WhatsApp", val: "+880 1570203520", bg: "from-[rgba(37,211,102,0.2)] to-[rgba(37,211,102,0.05)]" },
              { icon: "📍", label: "Location", val: "Dhaka, Bangladesh", bg: "from-[rgba(255,45,120,0.2)] to-[rgba(255,45,120,0.05)]" }
            ].map((ci, i) => (
              <Reveal key={i}>
                <div className="flex items-center gap-4 bg-card border border-border rounded-[14px] p-4 transition-all duration-300 hover:border-[rgba(0,212,255,0.25)] hover:translate-x-1.5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[1rem] bg-gradient-to-br ${ci.bg}`}>
                    {ci.icon}
                  </div>
                  <div>
                    <div className="text-[0.72rem] text-muted mb-0.5">{ci.label}</div>
                    <div className="text-[0.88rem] font-medium text-text">{ci.val}</div>
                  </div>
                </div>
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
                  <input required type="text" placeholder="Farabi Ahmed" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none cursor-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
                <div className="mb-4">
                  <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Email Address *</label>
                  <input required type="email" placeholder="farabi@example.com" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none cursor-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Subject *</label>
                <input required type="text" placeholder="Project Discussion" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none cursor-none focus:border-[rgba(0,212,255,0.4)]" />
              </div>
              <div className="mb-4">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Message *</label>
                <textarea required placeholder="Tell me about your project..." className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none cursor-none resize-y min-h-[110px] focus:border-[rgba(0,212,255,0.4)]"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-br from-cyan to-cyan2 text-black border-none p-3 rounded-xl font-bold text-[0.95rem] cursor-none transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)]">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                </svg>
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
