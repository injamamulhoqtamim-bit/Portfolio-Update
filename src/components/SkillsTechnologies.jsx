"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import * as SimpleIcons from "react-icons/si";
import Reveal from "./Reveal";

// ============================================================
// SAFE NUMBER
// ============================================================
const safeLevel = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  return Math.max(0, Math.min(100, number));
};

// ============================================================
// SMART SKILL ICON
// ============================================================
const getSkillIcon = (iconName) => {
  if (!iconName) return Icons.CodeXml;
  const originalName = String(iconName).trim();
  if (!originalName) return Icons.CodeXml;

  if (SimpleIcons[originalName]) return SimpleIcons[originalName];
  if (Icons[originalName]) return Icons[originalName];

  const formattedName = originalName.charAt(0).toUpperCase() + originalName.slice(1);
  const simpleIconWithPrefix = `Si${formattedName}`;
  if (SimpleIcons[simpleIconWithPrefix]) return SimpleIcons[simpleIconWithPrefix];

  const lowerName = originalName.toLowerCase().trim();
  const iconAliases = {
    react: "SiReact",
    "react.js": "SiReact",
    reactjs: "SiReact",
    firebase: "SiFirebase",
    node: "SiNodedotjs",
    "node.js": "SiNodedotjs",
    nodejs: "SiNodedotjs",
    javascript: "SiJavascript",
    js: "SiJavascript",
    typescript: "SiTypescript",
    ts: "SiTypescript",
    html: "SiHtml5",
    html5: "SiHtml5",
    css: "SiCss",
    css3: "SiCss",
    tailwind: "SiTailwindcss",
    "tailwind css": "SiTailwindcss",
    tailwindcss: "SiTailwindcss",
    mongodb: "SiMongodb",
    mongo: "SiMongodb",
    next: "SiNextdotjs",
    "next.js": "SiNextdotjs",
    nextjs: "SiNextdotjs",
    express: "SiExpress",
    "express.js": "SiExpress",
    expressjs: "SiExpress",
    git: "SiGit",
    github: "SiGithub",
    npm: "SiNpm",
    docker: "SiDocker",
    python: "SiPython",
    java: "SiJava",
    php: "SiPhp",
    mysql: "SiMysql",
    postgresql: "SiPostgresql",
    postgres: "SiPostgresql",
    stripe: "SiStripe",
    cloudinary: "SiCloudinary",
    jwt: "SiJsonwebtokens",
    bcrypt: "SiSecurityscorecard",
    wireshark: "SiWireshark",
    burpsuite: "SiBurpsuite",
    kalilinux: "SiKalilinux",
    // REST API 관련 별칭 추가 (Postman 또는 Swagger 아이콘 매핑)
    "rest api": "SiPostman",
    restapi: "SiPostman",
    api: "SiPostman",
    swagger: "SiSwagger",
    postman: "SiPostman",
  };

  const mappedIconName = iconAliases[lowerName];
  if (mappedIconName && SimpleIcons[mappedIconName]) return SimpleIcons[mappedIconName];

  if (lowerName.includes("react")) return SimpleIcons.SiReact || Icons.CodeXml;
  if (lowerName.includes("firebase")) return SimpleIcons.SiFirebase || Icons.CodeXml;
  if (lowerName.includes("node")) return SimpleIcons.SiNodedotjs || Icons.CodeXml;
  if (lowerName.includes("javascript") || lowerName === "js") return SimpleIcons.SiJavascript || Icons.CodeXml;
  if (lowerName.includes("typescript")) return SimpleIcons.SiTypescript || Icons.CodeXml;
  if (lowerName.includes("tailwind")) return SimpleIcons.SiTailwindcss || Icons.CodeXml;
  if (lowerName.includes("mongodb")) return SimpleIcons.SiMongodb || Icons.CodeXml;
  if (lowerName.includes("next")) return SimpleIcons.SiNextdotjs || Icons.CodeXml;
  if (lowerName.includes("express")) return SimpleIcons.SiExpress || Icons.CodeXml;
  if (lowerName.includes("stripe")) return SimpleIcons.SiStripe || Icons.CodeXml;
  if (lowerName.includes("cloudinary")) return SimpleIcons.SiCloudinary || Icons.CodeXml;
  if (lowerName.includes("jwt")) return SimpleIcons.SiJsonwebtokens || Icons.CodeXml;
  if (lowerName.includes("rest") || lowerName.includes("api")) return SimpleIcons.SiPostman || Icons.CodeXml;

  return Icons.CodeXml;
};

// ============================================================
// CUSTOM ICONS
// ============================================================
const DaisyUiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M12 0a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 9a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 0zm0 15a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 24a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 15zM4.5 7.5A4.5 4.5 0 0 0 0 12a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 9 12a4.5 4.5 0 0 0-4.5-4.5zm15 0A4.5 4.5 0 0 0 15 12a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 24 12a4.5 4.5 0 0 0-4.5-4.5zM12 2.5A9.5 9.5 0 1 1 2.5 12 9.5 9.5 0 0 1 12 2.5zm0 4A5.5 5.5 0 1 0 17.5 12 5.5 5.5 0 0 0 12 6.5z" />
  </svg>
);

const BetterAuthIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
  </svg>
);

const HeroUiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.1L12 20.1l-8-4V7.9l8-4 8 4v8.2zM12 6.5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
  </svg>
);

const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M23.15 2.587L18.21.421a1.05 1.05 0 0 0-1.12.214l-14.1 12.33-4.32-3.642a.75.75 0 0 0-.964 1.152l4.47 3.768-4.47 3.768a.75.75 0 0 0 .964 1.152l4.32-3.642 14.1 12.33a1.05 1.05 0 0 0 1.12.214l4.94-2.166a1.05 1.05 0 0 0 .625-.968V3.555a1.05 1.05 0 0 0-.625-.968zM18 19.33l-8.62-7.33L18 4.67v14.66z" />
  </svg>
);

const VercelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M12 1l12 21H0z" />
  </svg>
);

const NetlifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
    <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 3.2l7.5 4.3v8.6L12 20.8l-7.5-4.7V7.5L12 3.2z" />
  </svg>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SkillsTechnologies() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/skills", { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Failed to fetch skills");
      setSkills(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("❌ Skills Fetch Error:", error);
      setSkills([]);
      setError(error?.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    return {
      Frontend: skills.filter((skill) => skill.category === "Frontend"),
      Backend: skills.filter((skill) => skill.category === "Backend"),
      Tools: skills.filter((skill) => skill.category === "Tools"),
    };
  }, [skills]);

  const technologies = [
    { name: "HTML5", icon: <SimpleIcons.SiHtml5 className="text-[#E34F26]" />, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", icon: <SimpleIcons.SiCss className="text-[#1572B6]" />, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", icon: <SimpleIcons.SiJavascript className="text-[#F7DF1E]" />, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: <SimpleIcons.SiTypescript className="text-[#3178C6]" />, url: "https://www.typescriptlang.org" },
    { name: "React", icon: <SimpleIcons.SiReact className="text-[#61DAFB]" />, url: "https://react.dev" },
    { name: "Next.js", icon: <SimpleIcons.SiNextdotjs className="text-white" />, url: "https://nextjs.org" },
    { name: "Node.js", icon: <SimpleIcons.SiNodedotjs className="text-[#339933]" />, url: "https://nodejs.org" },
    { name: "Express.js", icon: <SimpleIcons.SiExpress className="text-white" />, url: "https://expressjs.com" },
    { name: "MongoDB", icon: <SimpleIcons.SiMongodb className="text-[#47A248]" />, url: "https://www.mongodb.com" },
    { name: "Tailwind CSS", icon: <SimpleIcons.SiTailwindcss className="text-[#06B6D4]" />, url: "https://tailwindcss.com" },
    { name: "DaisyUI", icon: <div className="w-9 h-9 text-[#FFB800]"><DaisyUiIcon /></div>, url: "https://daisyui.com" },
    { name: "HeroUI", icon: <div className="w-9 h-9 text-[#0072F5]"><HeroUiIcon /></div>, url: "https://heroui.com/" },
    { name: "React Hook Form", icon: <SimpleIcons.SiReacthookform className="text-[#EC5990]" />, url: "https://react-hook-form.com" },
    { name: "Better Auth", icon: <div className="w-9 h-9 text-[#FF5733]"><BetterAuthIcon /></div>, url: "https://better-auth.com" },
    { name: "JWT & Bcrypt", icon: <SimpleIcons.SiJsonwebtokens className="text-[#000000] bg-white rounded p-0.5" />, url: "https://jwt.io" },
    { name: "Cloudinary", icon: <SimpleIcons.SiCloudinary className="text-[#3448C5]" />, url: "https://cloudinary.com" },
    { name: "Stripe API", icon: <SimpleIcons.SiStripe className="text-[#635BFF]" />, url: "https://stripe.com" },
    { name: "VS Code", icon: <div className="w-9 h-9 text-[#007ACC]"><VSCodeIcon /></div>, url: "https://code.visualstudio.com" },
    { name: "Vercel", icon: <div className="w-9 h-9 text-white"><VercelIcon /></div>, url: "https://vercel.com" },
    { name: "Netlify", icon: <div className="w-9 h-9 text-[#00C7B7]"><NetlifyIcon /></div>, url: "https://www.netlify.com" },
    { name: "Wireshark", icon: <SimpleIcons.SiWireshark className="text-[#1679A7]" />, url: "https://www.wireshark.org" },
    { name: "Burp Suite", icon: <SimpleIcons.SiBurpsuite className="text-[#FF6633]" />, url: "https://portswigger.net/burp" },
    { name: "Kali Linux", icon: <SimpleIcons.SiKalilinux className="text-[#557C94]" />, url: "https://www.kali.org" },
    { name: "Git", icon: <SimpleIcons.SiGit className="text-[#F05032]" />, url: "https://git-scm.com" },
    { name: "GitHub", icon: <SimpleIcons.SiGithub className="text-white" />, url: "https://github.com" },
    { name: "npm", icon: <SimpleIcons.SiNpm className="text-[#CB3837]" />, url: "https://www.npmjs.com" },
  ];

  const thirdSize = Math.ceil(technologies.length / 3);
  const rowOneTechs = technologies.slice(0, thirdSize);
  const rowTwoTechs = technologies.slice(thirdSize, thirdSize * 2);
  const rowThreeTechs = technologies.slice(thirdSize * 2);

  if (loading) {
    return (
      <section id="skills-technologies" className="py-24 px-[5%] bg-dark text-center">
        <p className="text-muted">Loading Skills...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills-technologies" className="py-24 px-[5%] bg-dark text-center">
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section id="skills-technologies" className="py-20 md:py-28 px-4 sm:px-[5%] bg-dark overflow-hidden">
      {/* MAIN SECTION TITLE */}
      <Reveal>
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <h2 className="font-syne text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-white">
            Skills <span className="text-cyan">&amp;</span> Technologies
          </h2>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan/70 font-semibold mt-2 block">
            My Skills &amp; Tech Stack
          </span>
        </div>
      </Reveal>

      {/* TECHNOLOGIES SECTION WITH INFINITE SLIDER */}
      <div className="max-w-6xl mx-auto overflow-hidden">
        <Reveal>
          <div className="text-center mb-10">
            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white">
              Tech <span className="text-cyan">nologies</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-gray-500">
              My Tech Stack
            </p>
          </div>
        </Reveal>

        {/* MARQUEE CONTAINER (3 Rows) */}
        <div className="flex flex-col gap-6 w-full overflow-hidden relative py-4 mask-fade">
          
          {/* ROW 1: Right to Left Animation */}
          <div className="flex overflow-hidden w-full relative">
            <motion.div
              className="flex gap-8 shrink-0 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...rowOneTechs, ...rowOneTechs].map((tech, i) => (
                <a
                  key={`row1-${tech.name}-${i}`}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer no-underline w-24 sm:w-28 transition-all duration-300 hover:-translate-y-1.5 shrink-0"
                >
                  <div className="text-4xl sm:text-5xl flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_12px_rgba(0,212,255,0.25)]">
                    {tech.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide text-center group-hover:text-cyan transition-colors duration-300 select-none truncate w-full">
                    {tech.name}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ROW 2: Left to Right Animation */}
          <div className="flex overflow-hidden w-full relative">
            <motion.div
              className="flex gap-8 shrink-0 items-center"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...rowTwoTechs, ...rowTwoTechs].map((tech, i) => (
                <a
                  key={`row2-${tech.name}-${i}`}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer no-underline w-24 sm:w-28 transition-all duration-300 hover:-translate-y-1.5 shrink-0"
                >
                  <div className="text-4xl sm:text-5xl flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_12px_rgba(0,212,255,0.25)]">
                    {tech.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide text-center group-hover:text-cyan transition-colors duration-300 select-none truncate w-full">
                    {tech.name}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ROW 3: Right to Left Animation */}
          <div className="flex overflow-hidden w-full relative">
            <motion.div
              className="flex gap-8 shrink-0 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...rowThreeTechs, ...rowThreeTechs].map((tech, i) => (
                <a
                  key={`row3-${tech.name}-${i}`}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer no-underline w-24 sm:w-28 transition-all duration-300 hover:-translate-y-1.5 shrink-0"
                >
                  <div className="text-4xl sm:text-5xl flex items-center justify-center p-1 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_12px_rgba(0,212,255,0.25)]">
                    {tech.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium tracking-wide text-center group-hover:text-cyan transition-colors duration-300 select-none truncate w-full">
                    {tech.name}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto my-20 md:my-24">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>

      {/* SKILLS SECTION */}
      <div className="max-w-[1100px] mx-auto">
        <Reveal direction="down">
          <div className="text-center mb-12">
            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white">
              My <span className="text-cyan">Skills</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-cyan/70 font-semibold">
              Professional Skill Levels
            </p>
          </div>
        </Reveal>

        {/* SKILL BARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Frontend", "Backend", "Tools"].map((category) => (
            <div key={category} className="h-full bg-card/40 p-6 rounded-2xl border border-border">
              <h4 className="text-[0.9rem] text-cyan uppercase tracking-[1px] mb-6 font-semibold text-center md:text-left">
                {category}
              </h4>
              <div className="flex flex-col gap-5">
                {groupedSkills[category].length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-4">No skills added yet</p>
                ) : (
                  groupedSkills[category].map((skill) => {
                    const level = safeLevel(skill.level);
                    const skillColor = skill.color || "#00d4ff";
                    const IconComponent = getSkillIcon(skill.icon);

                    return (
                      <div key={skill._id || skill.id || `${skill.name}-${skill.category}`} className="w-full">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="shrink-0 flex items-center justify-center">
                              <IconComponent size={20} style={{ color: skillColor }} />
                            </div>
                            <span className="text-[0.85rem] text-white font-medium truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[0.75rem] text-gray-400 shrink-0 font-bold">
                            {level}%
                          </span>
                        </div>
                        {/* Scroll-triggered Animated Progress Bar */}
                        <div className="w-full h-[6px] bg-gray-800 rounded-[3px] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-[3px]"
                            style={{ backgroundColor: skillColor }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}