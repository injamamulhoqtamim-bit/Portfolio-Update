"use client";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark3 border-t border-border pt-12 pb-8 px-[5%]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-8 mb-10">
        <div>
          <a href="#home" className="font-syne font-extrabold text-[1.5rem] text-cyan tracking-[-1px] no-underline block mb-3">
            &lt;<span className="text-white">F</span>arabi /&gt;
          </a>
          <p className="text-[0.82rem] text-muted leading-[1.65] max-w-[240px]">
            MERN Stack Developer passionate about creating amazing digital experiences.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>, url: "https://github.com/" },
              { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, url: "https://linkedin.com/" },
              { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>, url: "https://facebook.com/" },
              { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, url: "https://twitter.com/" }
            ].map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan transition-colors duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[0.85rem] font-semibold text-white uppercase tracking-[0.8px] mb-4">Quick Links</h4>
          <ul className="list-none p-0 m-0">
            {["home", "about", "skills", "projects", "contact"].map(link => (
              <li key={link} className="mb-2">
                <a href={`#${link}`} className="text-muted text-[0.82rem] no-underline transition-colors duration-300 capitalize hover:text-cyan">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-[0.85rem] font-semibold text-white uppercase tracking-[0.8px] mb-4">Get In Touch</h4>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="mailto:farabiahmed2005@gmail.com" className="text-muted text-[0.82rem] no-underline transition-colors hover:text-cyan">farabiahmed2005@gmail.com</a></li>
            <li className="mb-2"><a href="tel:8801570203520" className="text-muted text-[0.82rem] no-underline transition-colors hover:text-cyan">+880 1570203520</a></li>
            <li className="mb-2"><span className="text-muted text-[0.82rem]">Dhaka, Bangladesh</span></li>
            <li className="mb-2 mt-2">
              <a href="#contact" className="text-cyan text-[0.82rem] no-underline flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full inline-block animate-blink"></span>
                Available for work
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-border pt-6 flex justify-between items-center flex-wrap gap-3">
        <p className="text-[0.78rem] text-muted">
          © 2026 Farabi Ahmed. All rights reserved.
        </p>
        <button onClick={scrollToTop} title="Back to top" className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-cyan2 border-none cursor-none flex items-center justify-center text-black text-[1.1rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,212,255,0.35)]">
          ↑
        </button>
      </div>
    </footer>
  );
}
