"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { motion } from "framer-motion";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     FETCH GALLERY
     ========================================================= */

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/gallery", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(
            result.message || "Failed to load gallery."
          );
        }

        const data = Array.isArray(result.data)
          ? result.data
          : [];

        setGallery(data);
      } catch (error) {
        console.error("❌ Gallery Fetch Error:", error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* =========================================================
     NEXT
     ========================================================= */

  const nextSlide = () => {
    if (!gallery.length) return;

    setActiveIndex((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  };

  /* =========================================================
     PREVIOUS
     ========================================================= */

  const previousSlide = () => {
    if (!gallery.length) return;

    setActiveIndex((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    );
  };

  /* =========================================================
     AUTO PLAY
     ========================================================= */

  useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [gallery.length]);

  /* =========================================================
     LOADING
     ========================================================= */

  if (loading) {
    return (
      <section
        id="gallery"
        className="relative overflow-hidden py-20 sm:py-28 bg-[#050816] border-t border-white/5"
      >
        <div className="max-w-[1500px] mx-auto px-5">
          <div className="text-center mb-14">
            <div className="mx-auto w-32 h-5 rounded-full bg-white/5 animate-pulse" />

            <div className="mx-auto mt-5 w-72 h-10 rounded-lg bg-white/5 animate-pulse" />
          </div>

          <div className="relative h-[440px] sm:h-[540px] rounded-3xl bg-white/[0.02] animate-pulse" />
        </div>
      </section>
    );
  }

  /* =========================================================
     DON'T SHOW EMPTY GALLERY
     ========================================================= */

  if (!gallery.length) {
    return null;
  }

  /* =========================================================
     CALCULATE SLIDE POSITION
     ========================================================= */

  const getOffset = (index) => {
    let offset = index - activeIndex;

    const total = gallery.length;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#050816] border-t border-white/[0.04] py-20 sm:py-28"
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(130,80,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(130,80,255,0.035) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* =====================================================
          PURPLE GLOW
      ===================================================== */}

      <div className="absolute top-[18%] left-[50%] -translate-x-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[450px] bg-purple-700/10 blur-[120px] rounded-full pointer-events-none" />

      {/* =====================================================
          DECORATIVE DOTS
      ===================================================== */}

      <div className="absolute top-12 left-[9%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.9)]" />

      <div className="absolute top-10 left-[12%] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-purple-500/70" />

      <div className="absolute bottom-10 right-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-purple-500/30" />

      {/* =====================================================
          LARGE BACKGROUND TEXT
      ===================================================== */}

      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none">
        <span className="font-syne text-[70px] sm:text-[140px] lg:text-[190px] font-black tracking-[-8px] text-white/[0.035]">
          MEMORIES
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.06] text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-[2px]">
            <Images size={15} />
            Memories
          </span>

          <h2 className="font-syne mt-4 text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white">
            My{" "}
            <span className="text-purple-400">
              Gallery
            </span>
          </h2>

          <p className="max-w-[650px] mx-auto mt-3 text-sm sm:text-base text-white/40">
            A collection of moments, experiences and
            memories from my journey.
          </p>
        </motion.div>

        {/* ===================================================
            CAROUSEL
        =================================================== */}

        <div className="relative h-[430px] sm:h-[510px] lg:h-[570px] flex items-center justify-center perspective-[1400px]">
          {gallery.map((item, index) => {
            const offset = getOffset(index);

            const isCenter = offset === 0;

            /*
              Only render visible nearby slides.
              This prevents unnecessary DOM rendering
              for large galleries.
            */

            if (Math.abs(offset) > 4) {
              return null;
            }

            const absoluteOffset = Math.abs(offset);

            let translateX = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 50;
            let blur = 0;

            if (offset === 0) {
              translateX = 0;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 50;
              blur = 0;
            } else if (offset === 1) {
              translateX = 320;
              rotateY = -10;
              scale = 0.86;
              opacity = 0.58;
              zIndex = 40;
              blur = 0.3;
            } else if (offset === -1) {
              translateX = -320;
              rotateY = 10;
              scale = 0.86;
              opacity = 0.58;
              zIndex = 40;
              blur = 0.3;
            } else if (offset === 2) {
              translateX = 550;
              rotateY = -18;
              scale = 0.72;
              opacity = 0.28;
              zIndex = 30;
              blur = 1;
            } else if (offset === -2) {
              translateX = -550;
              rotateY = 18;
              scale = 0.72;
              opacity = 0.28;
              zIndex = 30;
              blur = 1;
            } else if (offset > 2) {
              translateX = 720;
              rotateY = -22;
              scale = 0.62;
              opacity = 0.12;
              zIndex = 20;
              blur = 2;
            } else {
              translateX = -720;
              rotateY = 22;
              scale = 0.62;
              opacity = 0.12;
              zIndex = 20;
              blur = 2;
            }

            return (
              <motion.button
                key={item._id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                }}
                animate={{
                  x: translateX,
                  rotateY,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
                className="absolute top-1/2 -translate-y-1/2 w-[230px] h-[330px] sm:w-[285px] sm:h-[420px] lg:w-[330px] lg:h-[465px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/10 bg-[#0b1020] shadow-[0_30px_80px_rgba(0,0,0,0.65)] cursor-pointer focus:outline-none"
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                aria-label={`View ${item.title}`}
              >
                {/* IMAGE */}

                <div className="absolute inset-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery image"}
                    fill
                    unoptimized
                    sizes="330px"
                    className="object-cover"
                  />
                </div>

                {/* DARK OVERLAY */}

                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isCenter
                      ? "bg-gradient-to-t from-black/70 via-transparent to-black/5"
                      : "bg-black/55"
                  }`}
                />

                {/* CENTER GLOW */}

                {isCenter && (
                  <div className="absolute inset-0 ring-1 ring-inset ring-purple-400/40 rounded-[24px] sm:rounded-[28px] shadow-[inset_0_0_45px_rgba(168,85,247,0.12)]" />
                )}

                {/* TITLE */}

                {isCenter && item.title && (
                  <div className="absolute left-4 right-4 bottom-4 sm:left-5 sm:right-5 sm:bottom-5 text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/70 mb-2">
                      Memory
                    </div>

                    <h3 className="font-syne text-base sm:text-lg lg:text-xl font-bold text-white line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                )}

                {/* NUMBER */}

                {isCenter && (
                  <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4">
                    <div className="min-w-[36px] h-[36px] sm:min-w-[40px] sm:h-[40px] px-2 rounded-full bg-black/65 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}

          {/* =================================================
              LEFT ARROW
          ================================================= */}

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous gallery image"
                className="absolute left-1 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:bg-purple-500 hover:border-purple-400 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                <ChevronLeft size={24} />
              </button>

              {/* =================================================
                  RIGHT ARROW
              ================================================= */}

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next gallery image"
                className="absolute right-1 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:bg-purple-500 hover:border-purple-400 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* ===================================================
            DOTS
        =================================================== */}

        {gallery.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-3 sm:mt-5">
            {gallery.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to gallery image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* ===================================================
            COUNTER
        =================================================== */}

        <div className="flex justify-center mt-5">
          <span className="text-white/25 text-xs font-mono tracking-[2px]">
            {String(activeIndex + 1).padStart(2, "0")}
            {" / "}
            {String(gallery.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}