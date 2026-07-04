"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 👈 সোশ্যাল মেনু ওপেন/ক্লোজ স্টেট

  // 📜 ইউজার অন্তত ৩০০ পিক্সেল স্ক্রল করলে বামদিকের "Scroll to Top" বাটনটি দেখাবে
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 🔵 ডান দিকে থাকা সোশ্যাল বাটন কন্টেইনার (Right Side) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
        
        {/* 📱 সোশ্যাল বাটনগুলোর কন্টেইনার (অ্যানিমেশনসহ) */}
        <div 
          className={`flex flex-col gap-3 items-center transition-all duration-500 origin-bottom ${
            isOpen 
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 scale-75 translate-y-10 pointer-events-none"
          }`}
        >
          {/* ✈️ Telegram Button */}
          {/* t.me/username ফরম্যাটটি সরাসরি চ্যাট ওপেন করার জন্য সবচেয়ে বেস্ট */}
          <a
            href="https://t.me/+8801627178870" // 👈 এখানে আপনার সঠিক টেলিগ্রাম ইউজারনেম (যেমন: Injamam_Tamim) বসিয়ে দিন
            target="_blank"
            rel="noopener noreferrer"
            title="Message on Telegram"
            className="w-12 h-12 rounded-full bg-[#26A5E4] cursor-pointer flex items-center justify-center text-white shadow-[0_4px_20px_rgba(38,165,228,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(38,165,228,0.6)] active:scale-90 group"
          >
            <svg className="w-full h-full p-2.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.503-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.063-.173-.041-.248-.024-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.12.098.154.232.166.331.01.074.015.22.004.306z" />
            </svg>
          </a>

          {/* 📧 Gmail Button */}
          {/* mailto: ব্যবহারের ফলে মোবাইল ও ডেস্কটপ উভয় ডিভাইসের ডিফল্ট ইমেইল অ্যাপে ডিরেক্ট কম্পোজ স্ক্রিন চলে আসবে */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=injamamulhoqtamim@gmail.com&su=Hello&body=Hi Tamim," 
            target="_blank"
            rel="noopener noreferrer"
            title="Send an Email"
            className="w-12 h-12 rounded-full bg-[#EA4335] cursor-pointer flex items-center justify-center text-white shadow-[0_4px_20px_rgba(234,67,53,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(234,67,53,0.6)] active:scale-90 group"
          >
            <svg className="w-full h-full p-3 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>

          {/* 🟢 WhatsApp Button */}
          {/* wa.me লিঙ্কে text প্যারামিটার যুক্ত করায় চ্যাট স্ক্রিন ওপেন হয়ে মেসেজও রেডি থাকবে */}
          <a
            href="https://wa.me/8801511994008?text=Hello!%20I%20want%20to%20contact%20you." 
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="w-12 h-12 rounded-full bg-[#25D366] cursor-pointer flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(37,211,102,0.6)] active:scale-90 group"
          >
            <svg className="w-full h-full p-2.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>

        {/* 💬 "Contact Me" অটো অ্যানিমেটেড টেক্সট বাবল */}
        <div className="relative flex items-center justify-center">
          <span 
            className={`absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all duration-300 origin-right ${
              isOpen 
                ? "opacity-0 scale-75 translate-x-4" 
                : "opacity-100 scale-100 translate-x-0 animate-bounce [animation-direction:alternate] [animation-duration:1s]"
            }`}
          >
            Contact Me
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
          </span>

          {/* 🛠️ Main Toggle/Cross Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? "Minimize Menu" : "Contact Me"}
            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-90 ${
              isOpen 
                ? "bg-gray-800 rotate-180 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" 
                : "bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 animate-pulse"
            }`}
          >
            {isOpen ? (
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 📜 বাম দিকে থাকা স্ক্রল-টু-টপ বাটন */}
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={scrollToTop}
            title="Back to top"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-cyan2 border border-white/10 cursor-pointer flex items-center justify-center text-black text-[1.3rem] font-bold shadow-[0_4px_20px_rgba(0,212,255,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,212,255,0.45)] active:scale-90 animate-fade-in"
          >
            ↑
          </button>
        </div>
      )}
    </>
  );
}