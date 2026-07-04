"use client";
import { useState, useRef } from "react";
import Reveal from "./Reveal";
import { Mail, MessageCircle, Send, Loader2, Phone, Copy, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ show: false, success: false, message: "" });
  const [copiedText, setCopiedText] = useState(false);

  // 📋 কপি করার ফাংশন
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000); // ২ সেকেন্ড পর আবার নরমাল হয়ে যাবে
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus({ show: false, success: false, message: "" });

    const SERVICE_ID = "service_7vnmc1p"; 
    const MAIN_TEMPLATE_ID = "template_6ovj5dg"; 
    const PUBLIC_KEY = "imrQPuI2hAA9fAdXy";

    emailjs.sendForm(SERVICE_ID, MAIN_TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        setFormStatus({
          show: true,
          success: true,
          message: "✓ Message sent successfully! An auto-reply has been sent to your email."
        });
        e.target.reset(); 
      })
      .catch((error) => {
        setFormStatus({
          show: true,
          success: false,
          message: "❌ Something went wrong. Please try again or contact directly via social links."
        });
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setFormStatus({ show: false, success: false, message: "" }), 5000);
      });
  };

  // 🌐 কন্টাক্ট ডাটা লিস্ট (ফোন নাম্বারসহ)
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
      link: "https://wa.me/8801511994008", 
      val: "+880 1511994008", 
      bg: "from-[rgba(37,211,102,0.15)] to-[rgba(37,211,102,0.02)]" 
    },
    { 
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
    },
    { 
      icon: <Phone size={20} className="text-[#FFB800]" />, 
      label: "Phone", 
      val: "+880 1627178870", 
      isCopyable: true, // কপি ফিচারের জন্য ফ্ল্যাগ
      bg: "from-[rgba(255,184,0,0.15)] to-[rgba(255,184,0,0.02)]" 
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 px-[5%] bg-dark2 overflow-hidden">
      <Reveal direction="down">
        <h2 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-center mb-1">
          Connected <span className="text-cyan">With </span> Me 
        </h2>
      </Reveal>
      
      <Reveal direction="down">
        <p className="text-center text-muted font-medium tracking-[2px] text-[0.85rem] md:text-[0.95rem] uppercase mt-1 mb-8 md:mb-14">
          Get In <span className="text-cyan2">Touch</span>
        </p>
      </Reveal>

      <Reveal>
        <p className="text-muted text-[0.88rem] md:text-[0.9rem] leading-[1.7] max-w-[520px] mx-auto text-center mt-0 md:mt-[-2rem] mb-10 px-2">
          Have a project in mind? Let&apos;s work together to bring your ideas to life.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-start max-w-6xl mx-auto">
        {/* Left Side: Contact Info */}
        <div className="w-full">
          <Reveal>
            <h3 className="font-syne text-[1.25rem] md:text-[1.4rem] font-bold mb-3 text-center lg:text-left">Let&apos;s Connect</h3>
            <p className="text-muted text-[0.88rem] md:text-[0.9rem] leading-[1.7] mb-6 text-center lg:text-left">
              I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </Reveal>

          <div className="flex flex-col gap-3 w-full">
            {contactItems.map((ci, i) => {
              const cardContent = (
                <>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${ci.bg} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                    {ci.icon}
                  </div>
                  <div className="overflow-hidden min-w-0 flex-1">
                    <div className="text-[0.72rem] text-muted mb-0.5 font-medium group-hover:text-cyan transition-colors">{ci.label}</div>
                    <div className="text-[0.82rem] md:text-[0.88rem] font-medium text-text truncate">{ci.val}</div>
                  </div>
                  {ci.isCopyable && (
                    <div className="shrink-0 text-muted group-hover:text-cyan p-1 transition-colors">
                      {copiedText ? <Check size={16} className="text-[#00ff88]" /> : <Copy size={16} />}
                    </div>
                  )}
                </>
              );

              return (
                <Reveal key={i}>
                  {ci.isCopyable ? (
                    <button
                      type="button"
                      onClick={() => handleCopy(ci.val)}
                      className="w-full flex items-center text-left gap-4 bg-card border border-border rounded-[14px] p-3 md:p-4 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:bg-gradient-to-r hover:from-card hover:to-border/20 sm:hover:translate-x-2 block group relative cursor-pointer"
                    >
                      {cardContent}
                      {copiedText && (
                        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-[0.7rem] bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 px-2 py-0.5 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  ) : (
                    <a 
                      href={ci.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-card border border-border rounded-[14px] p-3 md:p-4 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:bg-gradient-to-r hover:from-card hover:to-border/20 sm:hover:translate-x-2 block group"
                    >
                      {cardContent}
                    </a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right Side: Form */}
        <Reveal>
          <div className="bg-card border border-border rounded-[20px] p-5 md:p-8 w-full">
            <h3 className="font-syne text-[1.2rem] md:text-[1.3rem] font-bold mb-6 text-center lg:text-left">Send Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Your Name *</label>
                  <input required name="name" type="text" placeholder="Insert Your Name" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
                <div>
                  <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Email Address *</label>
                  <input required name="email" type="email" placeholder="Insert Your Email" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Subject *</label>
                <input required name="subject" type="text" placeholder="Project Discussion" className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none focus:border-[rgba(0,212,255,0.4)]" />
              </div>
              <div className="mb-5">
                <label className="block text-[0.78rem] text-muted mb-1.5 font-medium">Message *</label>
                <textarea required name="message" placeholder="Tell me about your project..." className="w-full bg-dark3 border border-border rounded-[10px] px-4 py-3 text-text font-space text-[0.88rem] transition-colors duration-300 outline-none resize-y min-h-[110px] focus:border-[rgba(0,212,255,0.4)]"></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSending}
                className="w-full bg-gradient-to-br from-cyan to-cyan2 text-black border-none p-3 rounded-xl font-bold text-[0.95rem] transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 sm:hover:-translate-y-0.5 sm:hover:shadow-[0_8px_25px_rgba(0,212,255,0.3)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={2.5} />
                    Send Message
                  </>
                )}
              </button>

              {formStatus.show && (
                <div className={`px-4 py-3 rounded-[10px] text-[0.85rem] mt-4 text-center border ${
                  formStatus.success 
                    ? "bg-[rgba(0,255,136,0.1)] border-[rgba(0,255,136,0.25)] text-[#00ff88]" 
                    : "bg-[rgba(255,75,75,0.1)] border-[rgba(255,75,75,0.25)] text-[#ff4b4b]"
                }`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}