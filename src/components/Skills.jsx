"use client";
import { useEffect, useRef } from "react";
import { 
  Atom, 
  Server, 
  Database, 
  Flame, 
  Palette, 
  Box, 
  Zap, 
  GitBranch, 
  CodeXml, 
  Layers, 
  Layout, 
  Send 
} from "lucide-react";
import Reveal from "./Reveal";

export default function Skills() {
  const barsRef = useRef(null);
  const orbitNodesRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
            b.style.width = b.dataset.w + '%';
          });
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (barsRef.current) {
      observer.observe(barsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const skillData = [
      { ring: 1, angle: 0 },
      { ring: 1, angle: Math.PI },
      { ring: 2, angle: Math.PI / 3 },
      { ring: 2, angle: Math.PI + Math.PI / 3 },
      { ring: 2, angle: 2 * Math.PI / 3 },
      { ring: 2, angle: Math.PI + 2 * Math.PI / 3 },
      { ring: 3, angle: Math.PI / 6 },
      { ring: 3, angle: Math.PI / 6 + Math.PI },
      { ring: 3, angle: Math.PI / 2 },
      { ring: 3, angle: 3 * Math.PI / 2 },
      { ring: 3, angle: 5 * Math.PI / 6 },
      { ring: 3, angle: 5 * Math.PI / 6 + Math.PI },
    ];
    
    // Original JS Radii logic (based on rings)
    // .skills-ring-1 width:200 => radius ~100
    // .skills-ring-2 width:330 => radius ~165
    // .skills-ring-3 width:460 => radius ~230
    // We adjust for mobile size using window width if needed, but since it's responsive CSS,
    // we should use percentages or fixed values that match CSS. In original JS it used fixed radii: { 1: 90, 2: 145, 3: 200 }
    
    const isMobile = window.innerWidth < 700;
    const radii = isMobile ? { 1: 70, 2: 110, 3: 155 } : { 1: 100, 2: 165, 3: 230 };
    
    let animationFrameId;

    const animSkills = () => {
      const t = Date.now() / 1000;
      skillData.forEach((s, i) => {
        const el = orbitNodesRef.current[i];
        if (!el) return;
        const spd = { 1: 0.5, 2: 0.35, 3: 0.22 }[s.ring];
        const speed = spd * (s.ring % 2 === 0 ? -1 : 1);
        const a = s.angle + t * speed;
        el.style.transform = `translate(${radii[s.ring] * Math.cos(a) - 26}px,${radii[s.ring] * Math.sin(a) - 32}px)`;
      });
      animationFrameId = requestAnimationFrame(animSkills);
    };
    animSkills();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const frontendSkills = [
    { name: "React.js", level: 88 },
    { name: "JavaScript", level: 85 },
    { name: "Next.js", level: 75 },
    { name: "Tailwind", level: 90 },
    { name: "HTML/CSS", level: 92 },
  ];

  const backendSkills = [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 78 },
    { name: "MongoDB", level: 75 },
    { name: "Firebase", level: 72 },
    { name: "REST API", level: 82 },
  ];

  const toolsSkills = [
    { name: "Git/GitHub", level: 85 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 65 },
    { name: "Postman", level: 78 },
    { name: "Vercel", level: 80 },
  ];

  const nodes = [
    { icon: <Atom size={24} />, name: 'React', color: '#61DAFB' },
    { icon: <Server size={24} />, name: 'Node', color: '#339933' },
    { icon: <Database size={24} />, name: 'MongoDB', color: '#47A248' },
    { icon: <Flame size={24} />, name: 'Firebase', color: '#FFCA28' },
    { icon: <Palette size={24} />, name: 'Tailwind', color: '#06B6D4' },
    { icon: <Box size={24} />, name: 'Express', color: '#828282' },
    { icon: <Zap size={24} />, name: 'Next.js', color: '#FFFFFF' },
    { icon: <GitBranch size={24} />, name: 'Git', color: '#F05032' },
    { icon: <CodeXml size={24} />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <Layers size={24} />, name: 'Redux', color: '#764ABC' },
    { icon: <Layout size={24} />, name: 'HTML/CSS', color: '#E34F26' },
    { icon: <Send size={24} />, name: 'Postman', color: '#FF6C37' },
  ];

  return (
    <section id="skills" className="py-24 px-[5%] bg-dark">
      <Reveal>
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">My <span className="text-cyan">Skills</span></h2>
      </Reveal>
      <div className="w-[60px] h-[3px] bg-gradient-to-r from-cyan to-cyan2 rounded-sm mx-auto mt-3 mb-14"></div>

      <Reveal>
        <div className="relative w-[340px] h-[340px] md:w-[520px] md:h-[520px] mx-auto mb-12">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[200px] md:h-[200px]">
            <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring1 skills-ring-glow"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[330px] md:h-[330px]">
            <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring2 skills-ring-glow"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] md:w-[460px] md:h-[460px]">
            <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring3 skills-ring-glow"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center font-syne font-extrabold text-[0.8rem] text-black text-center z-[5] shadow-[0_0_30px_rgba(0,212,255,0.4)]">MERN<br/>Stack</div>
          
          {nodes.map((node, i) => (
            <div key={i} ref={el => orbitNodesRef.current[i] = el} className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1 cursor-none group">
              <div 
                className="w-[52px] h-[52px] rounded-[14px] bg-card2 border border-border flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] group-hover:scale-115 group-hover:border-[var(--hover-color)] group-hover:shadow-[0_0_20px_var(--hover-color)]"
                style={{ 
                  color: node.color,
                  '--hover-color': `${node.color}66`, // Add transparency for the glow
                }}
              >
                {node.icon}
              </div>
              <span className="text-[0.6rem] text-muted whitespace-nowrap font-medium transition-colors duration-300 group-hover:text-white" style={{ '--hover-color': node.color }}>{node.name}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div ref={barsRef} className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Reveal>
          <h4 className="text-[0.82rem] text-cyan uppercase tracking-[1px] mb-4 font-semibold text-center md:text-left">Frontend</h4>
          <div className="flex flex-col gap-2">
            {frontendSkills.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[0.78rem] text-text w-[90px] text-right">{s.name}</span>
                <div className="flex-1 h-[5px] bg-border rounded-[3px] overflow-hidden min-w-[80px]">
                  <div className="skill-bar-fill h-full bg-gradient-to-r from-cyan to-cyan2 rounded-[3px] w-0 transition-all duration-[1.2s] ease-out" data-w={s.level}></div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h4 className="text-[0.82rem] text-pink uppercase tracking-[1px] mb-4 font-semibold text-center md:text-left">Backend</h4>
          <div className="flex flex-col gap-2">
            {backendSkills.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[0.78rem] text-text w-[90px] text-right">{s.name}</span>
                <div className="flex-1 h-[5px] bg-border rounded-[3px] overflow-hidden min-w-[80px]">
                  <div className="skill-bar-fill h-full bg-gradient-to-r from-pink to-[#ff6b9d] rounded-[3px] w-0 transition-all duration-[1.2s] ease-out" data-w={s.level}></div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h4 className="text-[0.82rem] text-[#a78bfa] uppercase tracking-[1px] mb-4 font-semibold text-center md:text-left">Tools</h4>
          <div className="flex flex-col gap-2">
            {toolsSkills.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[0.78rem] text-text w-[90px] text-right">{s.name}</span>
                <div className="flex-1 h-[5px] bg-border rounded-[3px] overflow-hidden min-w-[80px]">
                  <div className="skill-bar-fill h-full bg-gradient-to-r from-[#a78bfa] to-[#c084fc] rounded-[3px] w-0 transition-all duration-[1.2s] ease-out" data-w={s.level}></div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
