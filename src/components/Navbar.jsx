"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    closeMenu();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] px-[5%] py-[1.2rem] flex items-center justify-between backdrop-blur-xl border-b border-[rgba(0,212,255,0.08)] transition-all duration-300 ${
          scrolled ? "bg-[rgba(3,11,24,0.95)]" : "bg-[rgba(3,11,24,0.85)]"
        }`}
      >
        <Link href="#home" onClick={(e) => scrollToSection(e, "#home")} className="font-syne font-extrabold text-[1.5rem] text-cyan tracking-[-1px] no-underline">
          &lt;<span className="text-white">F</span>arabi /&gt;
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {["home", "about", "skills", "education", "projects", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={(e) => scrollToSection(e, `#${item}`)}
                className="text-muted no-underline text-[0.9rem] font-medium tracking-[0.5px] transition-colors duration-300 relative capitalize hover:text-cyan group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-cyan transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={(e) => scrollToSection(e, "#contact")}
          className="hidden md:block bg-gradient-to-br from-cyan to-cyan2 text-black border-none px-[1.4rem] py-[0.55rem] rounded-full font-bold text-[0.85rem] cursor-none transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] tracking-[0.5px]"
        >
          Hire Me
        </button>
        <div className="flex md:hidden flex-col gap-[5px] cursor-none p-1" onClick={toggleMenu}>
          <span className="block w-6 h-[2px] bg-cyan rounded-[2px] transition-all duration-300"></span>
          <span className="block w-6 h-[2px] bg-cyan rounded-[2px] transition-all duration-300"></span>
          <span className="block w-6 h-[2px] bg-cyan rounded-[2px] transition-all duration-300"></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[70px] left-0 right-0 bg-[rgba(7,16,32,0.98)] backdrop-blur-xl border-b border-border px-[5%] py-6 flex-col gap-5 z-[998] transition-all duration-300 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {["home", "about", "skills", "education", "projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={(e) => scrollToSection(e, `#${item}`)}
            className="text-muted no-underline text-base font-medium py-2 border-b border-border capitalize"
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
