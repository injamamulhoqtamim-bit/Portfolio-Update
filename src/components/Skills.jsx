"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  ShieldCheck,
  Braces,
  Terminal,
  Globe,
  Cpu,
  Cloud,
  Wrench,
  CircleHelp,
  RefreshCw,
} from "lucide-react";

import Reveal from "./Reveal";

// ============================================================
// ICON MAP
// ============================================================

const iconMap = {
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
  ShieldCheck,
  Braces,
  Terminal,
  Globe,
  Cpu,
  Cloud,
  Wrench,
};

// ============================================================
// FALLBACK ICON
// ============================================================

const getSkillIcon = (iconName) => {
  if (!iconName) {
    return CodeXml;
  }

  return iconMap[iconName] || CodeXml;
};

// ============================================================
// CATEGORY CONFIG
// ============================================================

const categoryConfig = {
  Frontend: {
    title: "Frontend",
    titleColor: "text-cyan",
    barGradient: "from-cyan to-cyan2",
  },

  Backend: {
    title: "Backend",
    titleColor: "text-pink",
    barGradient: "from-pink to-[#ff6b9d]",
  },

  Tools: {
    title: "Tools",
    titleColor: "text-[#a78bfa]",
    barGradient: "from-[#a78bfa] to-[#c084fc]",
  },
};

// ============================================================
// SAFE NUMBER
// ============================================================

const safeLevel = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, number));
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Skills() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  // ==========================================================
  // REFS
  // ==========================================================

  const barsRef = useRef(null);
  const orbitNodesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // ==========================================================
  // FETCH SKILLS
  // ==========================================================

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/skills", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const result = await res.json();

      console.log("Skills API Result:", result);

      if (!result.success) {
        throw new Error(
          result.message || "Failed to fetch skills"
        );
      }

      setSkills(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("❌ Skills Fetch Error:", error);

      setSkills([]);

      setError(
        error.message ||
          "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    fetchSkills();
  }, []);

  // ==========================================================
  // RESPONSIVE BREAKPOINT
  // ==========================================================

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // ==========================================================
  // GROUP SKILLS
  // ==========================================================

  const groupedSkills = useMemo(() => {
    return {
      Frontend: skills.filter(
        (skill) =>
          skill.category === "Frontend"
      ),

      Backend: skills.filter(
        (skill) =>
          skill.category === "Backend"
      ),

      Tools: skills.filter(
        (skill) =>
          skill.category === "Tools"
      ),
    };
  }, [skills]);

  // ==========================================================
  // ORBIT SKILLS
  // ==========================================================

  const orbitSkills = useMemo(() => {
    return skills
      .filter(
        (skill) =>
          skill.showInOrbit !== false
      )
      .sort(
        (a, b) =>
          Number(a.order || 0) -
          Number(b.order || 0)
      );
  }, [skills]);

  // ==========================================================
  // GENERATE ORBIT POSITIONS
  // ==========================================================

  const orbitPositions = useMemo(() => {
    const total = orbitSkills.length;

    if (!total) {
      return [];
    }

    const positions = [];

    // ========================================================
    // 1-2 SKILLS
    // ========================================================

    if (total <= 2) {
      orbitSkills.forEach((skill, index) => {
        positions.push({
          skill,
          ring: 1,
          angle:
            total === 1
              ? 0
              : index * Math.PI,
        });
      });

      return positions;
    }

    // ========================================================
    // 3-6 SKILLS
    // ========================================================

    if (total <= 6) {
      orbitSkills.forEach(
        (skill, index) => {
          positions.push({
            skill,
            ring: 2,
            angle:
              (index / total) *
              Math.PI *
              2,
          });
        }
      );

      return positions;
    }

    // ========================================================
    // 7-12 SKILLS
    // ========================================================

    const ring1Count = Math.min(
      2,
      total
    );

    const remaining =
      total - ring1Count;

    const ring2Count = Math.min(
      4,
      remaining
    );

    const ring3Count =
      total -
      ring1Count -
      ring2Count;

    // Ring 1
    for (
      let i = 0;
      i < ring1Count;
      i++
    ) {
      positions.push({
        skill: orbitSkills[i],
        ring: 1,
        angle:
          ring1Count === 1
            ? 0
            : i * Math.PI,
      });
    }

    // Ring 2
    for (
      let i = 0;
      i < ring2Count;
      i++
    ) {
      positions.push({
        skill:
          orbitSkills[
            ring1Count + i
          ],
        ring: 2,
        angle:
          (i / ring2Count) *
          Math.PI *
          2,
      });
    }

    // Ring 3
    for (
      let i = 0;
      i < ring3Count;
      i++
    ) {
      positions.push({
        skill:
          orbitSkills[
            ring1Count +
              ring2Count +
              i
          ],
        ring: 3,
        angle:
          (i / ring3Count) *
          Math.PI *
          2 +
          Math.PI / 6,
      });
    }

    return positions;
  }, [orbitSkills]);

  // ==========================================================
  // ORBIT RADII
  // ==========================================================

  const getRadii = () => {
    if (isSmallMobile) {
      return {
        1: 52,
        2: 82,
        3: 112,
      };
    }

    if (isMobile) {
      return {
        1: 65,
        2: 105,
        3: 145,
      };
    }

    return {
      1: 100,
      2: 165,
      3: 230,
    };
  };

  // ==========================================================
  // ORBIT ANIMATION
  // ==========================================================

  useEffect(() => {
    if (
      loading ||
      orbitPositions.length === 0
    ) {
      return;
    }

    const radii = getRadii();

    const animateOrbit = () => {
      const time =
        Date.now() / 1000;

      orbitPositions.forEach(
        (position, index) => {
          const element =
            orbitNodesRef.current[
              index
            ];

          if (!element) {
            return;
          }

          const speedMap = {
            1: 0.5,
            2: 0.35,
            3: 0.22,
          };

          const baseSpeed =
            speedMap[
              position.ring
            ] || 0.25;

          const direction =
            position.ring % 2 === 0
              ? -1
              : 1;

          const angle =
            position.angle +
            time *
              baseSpeed *
              direction;

          const radius =
            radii[position.ring];

          const nodeSize =
            isSmallMobile
              ? 23
              : 26;

          const x =
            radius *
              Math.cos(angle) -
            nodeSize;

          const y =
            radius *
              Math.sin(angle) -
            nodeSize;

          element.style.transform = `
            translate(${x}px, ${y}px)
          `;
        }
      );

      animationFrameRef.current =
        requestAnimationFrame(
          animateOrbit
        );
    };

    animateOrbit();

    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [
    orbitPositions,
    isMobile,
    isSmallMobile,
    loading,
  ]);

  // ==========================================================
  // SKILL BAR ANIMATION
  // ==========================================================

  useEffect(() => {
    if (loading) {
      return;
    }

    const element =
      barsRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                const bars =
                  entry.target.querySelectorAll(
                    ".skill-bar-fill"
                  );

                bars.forEach((bar) => {
                  bar.style.width =
                    `${bar.dataset.w}%`;
                });

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.25,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loading, skills]);

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <section
        id="skills"
        className="py-24 px-[5%] bg-dark overflow-x-hidden"
      >
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">
            My{" "}
            <span className="text-cyan">
              Skills
            </span>
          </h2>
        </Reveal>

        <p className="text-center text-muted uppercase tracking-[1px] text-sm mt-1 mb-14">
          Loading my technical skills...
        </p>

        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-cyan/20 border-t-cyan animate-spin" />

            <p className="text-sm text-muted">
              Loading Skills...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR STATE
  // ==========================================================

  if (error) {
    return (
      <section
        id="skills"
        className="py-24 px-[5%] bg-dark overflow-x-hidden"
      >
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">
            My{" "}
            <span className="text-cyan">
              Skills
            </span>
          </h2>
        </Reveal>

        <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl bg-card2 border border-red-500/20 text-center">
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchSkills}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan text-black font-semibold hover:opacity-90 transition"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ==========================================================
  // MAIN RENDER
  // ==========================================================

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 px-4 sm:px-[5%] bg-dark overflow-x-hidden"
    >
      {/* ======================================================
          TITLE
      ======================================================= */}

      <Reveal direction="down">
        <h2 className="font-syne text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-2">
          My{" "}
          <span className="text-cyan">
            Skills
          </span>
        </h2>
      </Reveal>

      <Reveal direction="down">
        <p className="text-center text-muted font-medium tracking-[1px] text-xs sm:text-[0.95rem] uppercase mt-1 mb-12 sm:mb-14">
          My{" "}
          <span className="text-cyan2">
            Technical Levels
          </span>
        </p>
      </Reveal>

      {/* ======================================================
          ORBIT
      ======================================================= */}

      {orbitSkills.length > 0 && (
        <Reveal direction="right">
          <div className="relative w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[340px] sm:h-[340px] md:w-[520px] md:h-[520px] mx-auto mb-16 sm:mb-20">
            {/* =================================================
                RING 1
            ================================================== */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] sm:w-[140px] sm:h-[140px] md:w-[200px] md:h-[200px]">
              <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring1 skills-ring-glow" />
            </div>

            {/* =================================================
                RING 2
            ================================================== */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[165px] h-[165px] sm:w-[220px] sm:h-[220px] md:w-[330px] md:h-[330px]">
              <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring2 skills-ring-glow" />
            </div>

            {/* =================================================
                RING 3
            ================================================== */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[225px] h-[225px] sm:w-[310px] sm:h-[310px] md:w-[460px] md:h-[460px]">
              <div className="w-full h-full rounded-full border border-[rgba(0,212,255,0.1)] animate-spin-ring3 skills-ring-glow" />
            </div>

            {/* =================================================
                CENTER
            ================================================== */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75px] h-[75px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] rounded-full bg-gradient-to-br from-cyan to-cyan2 flex items-center justify-center font-syne font-extrabold text-[0.7rem] sm:text-[0.8rem] text-black text-center z-[5] shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              Skills
            </div>

            {/* =================================================
                DYNAMIC ORBIT NODES
            ================================================== */}

            {orbitPositions.map(
              (position, index) => {
                const skill =
                  position.skill;

                const Icon =
                  getSkillIcon(
                    skill.icon
                  );

                const skillColor =
                  skill.color ||
                  "#00d4ff";

                return (
                  <div
                    key={
                      skill._id ||
                      `${skill.name}-${index}`
                    }
                    ref={(element) => {
                      orbitNodesRef.current[
                        index
                      ] = element;
                    }}
                    className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1 cursor-default group will-change-transform"
                  >
                    {/* =================================================
                        ICON BOX
                    ================================================== */}

                    <div
                      className="
                        w-[46px] h-[46px]
                        sm:w-[52px] sm:h-[52px]
                        rounded-[12px] sm:rounded-[14px]
                        bg-card2
                        border
                        border-border
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                        group-hover:scale-110
                      "
                      style={{
                        color: skillColor,
                        "--hover-color": `${skillColor}66`,
                      }}
                    >
                      <Icon
                        size={
                          isSmallMobile
                            ? 20
                            : 24
                        }
                      />
                    </div>

                    {/* =================================================
                        NAME
                    ================================================== */}

                    <span
                      className="text-[0.55rem] sm:text-[0.6rem] text-muted whitespace-nowrap font-medium transition-colors duration-300 group-hover:text-white"
                      style={{
                        "--hover-color":
                          skillColor,
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </Reveal>
      )}

      {/* ======================================================
          EMPTY ORBIT
      ======================================================= */}

      {orbitSkills.length === 0 &&
        skills.length > 0 && (
          <div className="max-w-md mx-auto text-center mb-14">
            <div className="w-20 h-20 mx-auto rounded-full bg-card2 border border-border flex items-center justify-center">
              <CircleHelp
                size={32}
                className="text-muted"
              />
            </div>

            <p className="text-muted text-sm mt-4">
              No skills are currently
              enabled for the orbit.
            </p>
          </div>
        )}

      {/* ======================================================
          SKILL BARS
      ======================================================= */}

      <div
        ref={barsRef}
        className="
          max-w-[1100px]
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
          md:gap-10
        "
      >
        {/* ====================================================
            FRONTEND
        ===================================================== */}

        <Reveal direction="left">
          <div className="h-full">
            <h4 className="text-[0.82rem] text-cyan uppercase tracking-[1px] mb-5 font-semibold text-center md:text-left">
              Frontend
            </h4>

            {groupedSkills
              .Frontend
              .length === 0 ? (
              <div className="p-5 rounded-xl bg-card2 border border-border text-center">
                <p className="text-xs text-muted">
                  No frontend skills added.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {groupedSkills.Frontend.map(
                  (skill) => {
                    const level =
                      safeLevel(
                        skill.level
                      );

                    return (
                      <div
                        key={skill._id}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="text-[0.78rem] text-text font-medium truncate">
                            {skill.name}
                          </span>

                          <span className="text-[0.68rem] text-muted shrink-0">
                            {level}%
                          </span>
                        </div>

                        <div className="w-full h-[5px] bg-border rounded-[3px] overflow-hidden">
                          <div
                            className="skill-bar-fill h-full bg-gradient-to-r from-cyan to-cyan2 rounded-[3px] w-0 transition-all duration-[1.2s] ease-out"
                            data-w={level}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </Reveal>

        {/* ====================================================
            BACKEND
        ===================================================== */}

        <Reveal direction="up">
          <div className="h-full">
            <h4 className="text-[0.82rem] text-pink uppercase tracking-[1px] mb-5 font-semibold text-center md:text-left">
              Backend
            </h4>

            {groupedSkills
              .Backend
              .length === 0 ? (
              <div className="p-5 rounded-xl bg-card2 border border-border text-center">
                <p className="text-xs text-muted">
                  No backend skills added.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {groupedSkills.Backend.map(
                  (skill) => {
                    const level =
                      safeLevel(
                        skill.level
                      );

                    return (
                      <div
                        key={skill._id}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="text-[0.78rem] text-text font-medium truncate">
                            {skill.name}
                          </span>

                          <span className="text-[0.68rem] text-muted shrink-0">
                            {level}%
                          </span>
                        </div>

                        <div className="w-full h-[5px] bg-border rounded-[3px] overflow-hidden">
                          <div
                            className="skill-bar-fill h-full bg-gradient-to-r from-pink to-[#ff6b9d] rounded-[3px] w-0 transition-all duration-[1.2s] ease-out"
                            data-w={level}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </Reveal>

        {/* ====================================================
            TOOLS
        ===================================================== */}

        <Reveal direction="right">
          <div className="h-full">
            <h4 className="text-[0.82rem] text-[#a78bfa] uppercase tracking-[1px] mb-5 font-semibold text-center md:text-left">
              Tools
            </h4>

            {groupedSkills
              .Tools
              .length === 0 ? (
              <div className="p-5 rounded-xl bg-card2 border border-border text-center">
                <p className="text-xs text-muted">
                  No tools added.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {groupedSkills.Tools.map(
                  (skill) => {
                    const level =
                      safeLevel(
                        skill.level
                      );

                    return (
                      <div
                        key={skill._id}
                        className="w-full"
                      >
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="text-[0.78rem] text-text font-medium truncate">
                            {skill.name}
                          </span>

                          <span className="text-[0.68rem] text-muted shrink-0">
                            {level}%
                          </span>
                        </div>

                        <div className="w-full h-[5px] bg-border rounded-[3px] overflow-hidden">
                          <div
                            className="skill-bar-fill h-full bg-gradient-to-r from-[#a78bfa] to-[#c084fc] rounded-[3px] w-0 transition-all duration-[1.2s] ease-out"
                            data-w={level}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* ======================================================
          NO SKILLS
      ======================================================= */}

      {skills.length === 0 && (
        <div className="max-w-lg mx-auto mt-8 text-center">
          <div className="p-8 rounded-2xl bg-card2 border border-border">
            <CodeXml
              size={40}
              className="mx-auto text-muted"
            />

            <h3 className="text-lg font-semibold text-white mt-4">
              No Skills Added Yet
            </h3>

            <p className="text-sm text-muted mt-2">
              Add your skills from the
              Admin Dashboard.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}