"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  // ==========================================
  // PROJECT DATA
  // ==========================================
  const [projects, setProjects] = useState([]);

  // ==========================================
  // UI STATES
  // ==========================================
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ==========================================
  // FETCH PROJECTS FROM MONGODB
  // ==========================================
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const result = await res.json();

      console.log("Projects API Result:", result);

      if (result.success) {
        setProjects(result.data || []);

        // Current index যেন data change হলে invalid না হয়
        setCurrentIndex((prev) => {
          if (!result.data || result.data.length === 0) {
            return 0;
          }

          return Math.min(prev, result.data.length - 1);
        });
      } else {
        console.error(result.message || "Failed to load projects");
        setProjects([]);
      }
    } catch (error) {
      console.error("❌ Fetch Projects Error:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PROJECTS
  // ==========================================
  useEffect(() => {
    fetchProjects();
  }, []);

  // ==========================================
  // RESPONSIVE CHECK
  // ==========================================
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ==========================================
  // BODY SCROLL LOCK WHEN MODAL OPEN
  // ==========================================
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // ==========================================
  // PREVIOUS PROJECT
  // ==========================================
  const handlePrev = () => {
    if (projects.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  // ==========================================
  // NEXT PROJECT
  // ==========================================
  const handleNext = () => {
    if (projects.length === 0) return;

    setCurrentIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  // ==========================================
  // DOT CLICK
  // ==========================================
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // ==========================================
  // OPEN MODAL
  // ==========================================
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================
  const closeModal = () => {
    setModalOpen(false);

    setTimeout(() => {
      setSelectedProject(null);
    }, 400);
  };

  // ==========================================
  // GET CARD STYLES
  // ==========================================
  const getCardStyles = (index) => {
    const total = projects.length;

    if (total === 0) {
      return {};
    }

    let diff = index - currentIndex;

    if (diff < -total / 2) {
      diff += total;
    }

    if (diff > total / 2) {
      diff -= total;
    }

    const isActive = diff === 0;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        opacity: 0,
        display: "none",
      };
    }

    const stepX = isMobile ? 45 : 110;

    const translateX = diff * stepX;

    const scale = isActive
      ? 1
      : (isMobile ? 0.75 : 0.85) - absDiff * 0.05;

    const zIndex = 50 - absDiff;

    const rotateY = diff * (isMobile ? -8 : -12);

    const filter = isActive
      ? "none"
      : `grayscale(50%) blur(${absDiff * 0.5}px)`;

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity: isActive
        ? 1
        : (isMobile ? 0.4 : 0.6) / absDiff,
      filter,
      transition:
        "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  // ==========================================
  // DRAG
  // ==========================================
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <section
        id="projects"
        className="py-24 px-[5%] bg-dark"
      >
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-center text-white">
            My <span className="text-cyan">Projects</span>
          </h2>
        </Reveal>

        <p className="text-center text-muted mt-4">
          Loading projects...
        </p>
      </section>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================
  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-24 px-[5%] bg-dark"
      >
        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-center text-white">
            My <span className="text-cyan">Projects</span>
          </h2>
        </Reveal>

        <Reveal direction="down">
          <p className="text-center text-muted font-medium tracking-[1px] text-[0.85rem] md:text-[0.95rem] uppercase mt-1 mb-10">
            My <span className="text-cyan2">Favourite Work</span>
          </p>
        </Reveal>

        <div className="max-w-[600px] mx-auto text-center py-16">
          <p className="text-muted">
            No projects available at the moment.
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================
  return (
    <>
      <section
        id="projects"
        className="py-12 md:py-24 px-4 sm:px-[5%] bg-dark select-none overflow-hidden"
      >
        {/* ==========================================
            TITLE
        ========================================== */}

        <Reveal direction="down">
          <h2 className="font-syne text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-center mb-2 text-white">
            My <span className="text-cyan">Projects</span>
          </h2>
        </Reveal>

        <Reveal direction="down">
          <p className="text-center text-muted font-medium tracking-[1px] text-[0.85rem] md:text-[0.95rem] uppercase mt-1 mb-10 md:mb-14">
            My <span className="text-cyan2">Favourite Work</span>
          </p>
        </Reveal>

        {/* ==========================================
            3D CAROUSEL
        ========================================== */}

        <div className="relative max-w-[1200px] mx-auto min-h-[480px] md:min-h-[580px] flex items-center justify-center [perspective:1200px]">

          {/* ==========================================
              PREVIOUS BUTTON
          ========================================== */}

          {projects.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 md:left-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5b00ff] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(91,0,255,0.4)] hover:shadow-[0_4px_25px_rgba(91,0,255,0.7)] hover:bg-[#4b00d1] active:scale-90 transition-all duration-300 group"
              aria-label="Previous Project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.75-7.75"
                />
              </svg>
            </button>
          )}

          {/* ==========================================
              CARDS
          ========================================== */}

          <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[450px] md:h-[520px] flex items-center justify-center">

            {projects.map((p, index) => {
              const imageSrc = p.image || "/placeholder-project.jpg";

              return (
                <motion.div
                  key={p._id || p.id || index}
                  style={getCardStyles(index)}
                  className="absolute w-full h-full pointer-events-auto"
                  drag={isMobile ? "x" : false}
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                >
                  {/* ==========================================
                      PROJECT CARD
                  ========================================== */}

                  <div className="bg-card border border-border rounded-[20px] overflow-hidden relative group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col h-full bg-[#0b1329]">

                    {/* ==========================================
                        IMAGE
                    ========================================== */}

                    <div className="h-[160px] sm:h-[200px] md:h-[220px] relative overflow-hidden bg-white w-full">

                      <Image
                        className="transition-transform duration-400 group-hover:scale-105 p-2"
                        src={imageSrc}
                        alt={p.title || "Project"}
                        fill
                        sizes="(max-width: 768px) 280px, 380px"
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                        priority={index === 0}
                      />

                      {/* PROJECT NUMBER */}

                      <div className="absolute top-3 left-3 bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.25)] text-cyan w-8 h-8 rounded-lg flex items-center justify-center text-[0.75rem] font-bold backdrop-blur-sm z-10">
                        {index + 1 < 10
                          ? `0${index + 1}`
                          : index + 1}
                      </div>
                    </div>

                    {/* ==========================================
                        CONTENT
                    ========================================== */}

                    <div className="p-4 md:p-[1.4rem] flex flex-col flex-grow">

                      {/* TITLE */}

                      <h3 className="font-syne text-[1rem] md:text-[1.15rem] font-bold mb-1 md:mb-2 text-white text-center line-clamp-1">
                        {p.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="text-[0.75rem] md:text-[0.83rem] text-muted leading-[1.5] md:leading-[1.65] mb-3 md:mb-4 line-clamp-3 text-center">
                        {p.desc}
                      </p>

                      {/* ==========================================
                          TECHNOLOGIES
                      ========================================== */}

                      <div className="flex flex-wrap justify-center gap-1 mb-4 mt-auto">

                        {(Array.isArray(p.tech)
                          ? p.tech
                          : typeof p.tech === "string"
                          ? p.tech
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean)
                          : []
                        )
                          .slice(
                            0,
                            isMobile ? 3 : 4
                          )
                          .map((technology, techIndex) => (
                            <span
                              key={`${technology}-${techIndex}`}
                              className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-2 py-0.5 rounded-full text-[0.62rem] md:text-[0.68rem] font-medium"
                            >
                              {technology}
                            </span>
                          ))}
                      </div>

                      {/* ==========================================
                          BUTTONS
                      ========================================== */}

                      <div className="flex gap-1.5 md:gap-2">

                        {/* LIVE */}

                        <a
                          href={p.live || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:opacity-85 transition-all flex items-center justify-center gap-0.5 sm:gap-1"
                        >
                          Live
                        </a>

                        {/* DETAILS */}

                        <button
                          onClick={() => openModal(p)}
                          className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-cyan hover:border-[rgba(0,212,255,0.3)] transition-all"
                        >
                          👁 Details
                        </button>

                        {/* CODE */}

                        <a
                          href={p.code || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-1 py-2 rounded-lg text-center text-[0.68rem] md:text-[0.78rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:text-pink hover:border-[rgba(255,45,120,0.3)] transition-all"
                        >
                          &lt;/&gt; Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ==========================================
              NEXT BUTTON
          ========================================== */}

          {projects.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5b00ff] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(91,0,255,0.4)] hover:shadow-[0_4px_25px_rgba(91,0,255,0.7)] hover:bg-[#4b00d1] active:scale-90 transition-all duration-300 group"
              aria-label="Next Project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>

        {/* ==========================================
            DOT PAGINATION
        ========================================== */}

        {projects.length > 1 && (
          <div className="flex items-center gap-1.5 md:gap-2 justify-center mt-6 md:mt-10">

            {projects.map((project, index) => (
              <button
                key={`dot-${project._id || index}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-400 ${
                  index === currentIndex
                    ? "w-5 md:w-7 bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                    : "w-2 bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ==========================================
          PROJECT DETAILS MODAL
      ========================================== */}

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[rgba(3,11,24,0.85)] z-[9990] flex items-center justify-center p-3 sm:p-4 md:p-8 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >

            <motion.div
              initial={{
                scale: 0.9,
                y: 20,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                y: 20,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="bg-card border border-border rounded-[20px] md:rounded-[24px] w-full max-w-[720px] max-h-[92vh] overflow-y-auto relative bg-[#0b1329] shadow-2xl"
            >

              {/* CLOSE */}

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 md:top-4 md:right-4 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-border text-text w-8 h-8 md:w-9 md:h-9 rounded-full text-[0.9rem] md:text-[1.2rem] flex items-center justify-center transition-all z-[10] hover:border-pink hover:text-pink"
              >
                ✕
              </button>

              {/* ==========================================
                  MODAL IMAGE
              ========================================== */}

              <div className="w-full h-[180px] sm:h-[260px] md:h-[360px] relative bg-white">

                <Image
                  className="rounded-t-[20px] md:rounded-t-[24px] p-4"
                  src={
                    selectedProject.image ||
                    "/placeholder-project.jpg"
                  }
                  alt={
                    selectedProject.title ||
                    "Project"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>

              {/* ==========================================
                  MODAL CONTENT
              ========================================== */}

              <div className="p-5 md:p-8">

                {/* TITLE */}

                <h2 className="font-syne text-[1.2rem] md:text-[1.6rem] font-extrabold mb-2 text-white">
                  {selectedProject.title}
                </h2>

                {/* ==========================================
                    TECHNOLOGIES
                ========================================== */}

                <div className="flex flex-wrap gap-1 md:gap-1.5 mb-4">

                  {(Array.isArray(selectedProject.tech)
                    ? selectedProject.tech
                    : typeof selectedProject.tech === "string"
                    ? selectedProject.tech
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : []
                  ).map(
                    (technology, index) => (
                      <span
                        key={`${technology}-${index}`}
                        className="bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] text-cyan px-2 py-0.5 rounded-full text-[0.65rem] md:text-[0.68rem] font-medium"
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>

                {/* ==========================================
                    LONG DESCRIPTION
                ========================================== */}

                <p className="text-muted leading-[1.6] md:leading-[1.7] mb-6 text-[0.8rem] md:text-[0.9rem]">
                  {selectedProject.longDesc ||
                    selectedProject.desc}
                </p>

                {/* ==========================================
                    CHALLENGES
                ========================================== */}

                {selectedProject.challenges && (
                  <div className="mb-4 md:mb-5">

                    <h4 className="text-[0.75rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-1.5">
                      ⚡ Challenges Faced
                    </h4>

                    <p className="text-muted text-[0.8rem] md:text-[0.85rem] leading-[1.5] md:leading-[1.6]">
                      {selectedProject.challenges}
                    </p>
                  </div>
                )}

                {/* ==========================================
                    FUTURE IMPROVEMENTS
                ========================================== */}

                {selectedProject.improvements && (
                  <div className="mb-6">

                    <h4 className="text-[0.75rem] md:text-[0.82rem] font-semibold text-cyan uppercase tracking-[0.8px] mb-1.5">
                      🚀 Future Improvements
                    </h4>

                    <p className="text-muted text-[0.8rem] md:text-[0.85rem] leading-[1.5] md:leading-[1.6]">
                      {selectedProject.improvements}
                    </p>
                  </div>
                )}

                {/* ==========================================
                    MODAL BUTTONS
                ========================================== */}

                <div className="flex gap-2 sm:gap-3 flex-wrap mt-6">

                  {/* LIVE PROJECT */}

                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-[10px] text-[0.75rem] md:text-[0.82rem] font-semibold bg-gradient-to-br from-cyan to-cyan2 text-black hover:scale-[1.02] active:scale-95 transition-all text-center flex-1 sm:flex-none flex items-center justify-center gap-1.5"
                    >
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                      </svg>

                      Live Project
                    </a>
                  )}

                  {/* GITHUB */}

                  {selectedProject.code && (
                    <a
                      href={selectedProject.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-[10px] text-[0.75rem] md:text-[0.82rem] font-semibold bg-[rgba(255,255,255,0.05)] text-text border border-border hover:border-cyan hover:text-cyan hover:scale-[1.02] active:scale-95 transition-all text-center flex-1 sm:flex-none"
                    >
                      &lt;/&gt; GitHub Repository
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}