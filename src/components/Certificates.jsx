"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Award,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";

export default function Certificates() {
  // =========================================================
  // DATA
  // =========================================================

  const [certificates, setCertificates] =
    useState([]);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] =
    useState(true);

  // =========================================================
  // ERROR
  // =========================================================

  const [error, setError] =
    useState("");

  // =========================================================
  // MOBILE SLIDER
  // =========================================================

  const [currentIndex, setCurrentIndex] =
    useState(0);

  // =========================================================
  // SELECTED CERTIFICATE
  // =========================================================

  const [
    selectedCertificate,
    setSelectedCertificate,
  ] = useState(null);

  // =========================================================
  // FETCH CERTIFICATES
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/certificates",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `HTTP Error: ${response.status}`
          );
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
              "Failed to fetch certificates."
          );
        }

        const certificateData =
          Array.isArray(data?.data)
            ? data.data
            : Array.isArray(
                data?.certificates
              )
            ? data.certificates
            : [];

        const sortedCertificates =
          [...certificateData].sort(
            (a, b) => {
              const orderA =
                Number(
                  a?.displayOrder ??
                    a?.order ??
                    0
                ) || 0;

              const orderB =
                Number(
                  b?.displayOrder ??
                    b?.order ??
                    0
                ) || 0;

              return orderA - orderB;
            }
          );

        if (mounted) {
          setCertificates(
            sortedCertificates
          );
        }
      } catch (err) {
        console.error(
          "Fetch Certificates Error:",
          err
        );

        if (mounted) {
          setCertificates([]);

          setError(
            err?.message ||
              "Unable to load certificates."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCertificates();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================================================
  // KEEP SLIDE VALID
  // =========================================================

  useEffect(() => {
    if (certificates.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if (
      currentIndex >=
      certificates.length
    ) {
      setCurrentIndex(0);
    }
  }, [
    certificates.length,
    currentIndex,
  ]);

  // =========================================================
  // BODY SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [selectedCertificate]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedCertificate]);

  // =========================================================
  // OPEN CERTIFICATE
  // =========================================================

  const openCertificate = (
    certificate
  ) => {
    if (!certificate) {
      return;
    }

    const documentUrl =
      certificate?.documentUrl ||
      certificate?.credentialLink ||
      "";

    if (!documentUrl) {
      return;
    }

    setSelectedCertificate({
      ...certificate,
      documentUrl,
    });
  };

  // =========================================================
  // CLOSE
  // =========================================================

  const closeCertificate = () => {
    setSelectedCertificate(null);
  };

  // =========================================================
  // DOCUMENT VIEWER URL
  // =========================================================

  const getDocumentViewerUrl = (
    url
  ) => {
    if (!url) {
      return "";
    }

    try {
      return decodeURIComponent(url);
    } catch {
      return url;
    }
  };

  // =========================================================
  // NEXT
  // =========================================================

  const nextSlide = () => {
    if (certificates.length <= 1) {
      return;
    }

    setCurrentIndex(
      (previous) =>
        previous ===
        certificates.length - 1
          ? 0
          : previous + 1
    );
  };

  // =========================================================
  // PREVIOUS
  // =========================================================

  const prevSlide = () => {
    if (certificates.length <= 1) {
      return;
    }

    setCurrentIndex(
      (previous) =>
        previous === 0
          ? certificates.length - 1
          : previous - 1
    );
  };

  // =========================================================
  // CARD ANIMATION
  // =========================================================

  const cardSpring = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 30,
    },

    visible: (index) => ({
      scale: 1,
      opacity: 1,
      y: 0,

      transition: {
        type: "spring",
        stiffness: 180,
        damping: 15,
        delay: index * 0.08,
      },
    }),
  };

  // =========================================================
  // MOBILE ANIMATION
  // =========================================================

  const slideVariants = {
    enter: {
      x: 50,
      opacity: 0,
      scale: 0.95,
    },

    center: {
      x: 0,
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.3,
      },
    },

    exit: {
      x: -50,
      opacity: 0,
      scale: 0.95,

      transition: {
        duration: 0.2,
      },
    },
  };

  // =========================================================
  // CARD CONTENT
  // =========================================================

  const renderCardContent = (
    certificate
  ) => {
    if (!certificate) {
      return null;
    }

    const imageUrl =
      certificate?.imageUrl ||
      certificate?.image ||
      "";

    const documentUrl =
      certificate?.documentUrl ||
      certificate?.credentialLink ||
      "";

    return (
      <>
        {/* =================================================
            IMAGE
        ================================================== */}

        <div className="w-full h-[170px] sm:h-[210px] md:h-[220px] relative bg-neutral-900 overflow-hidden border-b border-border/40 flex items-center justify-center group/img">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={
                  certificate.title ||
                  "Certificate"
                }
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
              />

              {documentUrl && (
                <button
                  type="button"
                  onClick={() =>
                    openCertificate(
                      certificate
                    )
                  }
                  aria-label={`View ${
                    certificate.title ||
                    "certificate"
                  }`}
                  className="absolute inset-0 bg-black/65 backdrop-blur-[3px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-cyan font-bold text-sm z-20 cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-cyan/10 border border-cyan/30 shadow-[0_0_15px_rgba(0,212,255,0.25)] transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                    <Eye size={22} />
                  </div>

                  <span>
                    View Certificate
                  </span>
                </button>
              )}
            </>
          ) : documentUrl ? (
            <button
              type="button"
              onClick={() =>
                openCertificate(
                  certificate
                )
              }
              className="w-full h-full bg-gradient-to-br from-cyan/10 via-transparent to-[#5b00ff]/10 flex flex-col items-center justify-center gap-3 text-cyan/60 hover:text-cyan transition-colors duration-500 cursor-pointer"
            >
              <div className="p-3.5 rounded-full bg-card border border-border/60 shadow-inner">
                <FileText
                  size={30}
                  strokeWidth={1.5}
                />
              </div>

              <span className="text-[0.7rem] font-medium tracking-[1px] uppercase">
                View Certificate
              </span>
            </button>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-cyan/40">
              <FileText size={30} />

              <span className="text-[0.7rem] uppercase">
                Document Unavailable
              </span>
            </div>
          )}

          {/* VERIFIED */}

          <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-border/60 text-[0.65rem] text-cyan font-semibold px-2 py-1 rounded-md flex items-center gap-1 z-30 pointer-events-none">
            <ShieldCheck
              size={12}
              strokeWidth={2.5}
            />

            Verified
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-card to-card/70">
          <div>
            <div className="flex items-center justify-between gap-2 text-muted text-[0.7rem] sm:text-[0.75rem] font-medium mb-2">
              <span className="text-cyan/90 font-semibold uppercase tracking-[0.5px] truncate max-w-[65%]">
                {certificate.organization ||
                  "Certificate"}
              </span>

              {certificate.date && (
                <span className="flex items-center gap-1 text-muted/70 flex-shrink-0">
                  <Calendar size={11} />

                  {certificate.date}
                </span>
              )}
            </div>

            <h3 className="text-[0.98rem] sm:text-[1.15rem] font-bold text-white leading-snug group-hover:text-cyan transition-colors mb-4 line-clamp-2 min-h-[2.6rem] sm:min-h-[3.2rem]">
              {certificate.title ||
                "Certificate"}
            </h3>
          </div>

          {/* DOCUMENT BUTTON */}

          <div className="border-t border-border/30 pt-3.5 mt-2">
            {documentUrl ? (
              <button
                type="button"
                onClick={() =>
                  openCertificate(
                    certificate
                  )
                }
                className="inline-flex items-center gap-1.5 text-[0.78rem] sm:text-[0.82rem] font-bold text-muted transition-all duration-300 hover:text-cyan cursor-pointer"
              >
                View Certificate

                <ArrowUpRight
                  size={13}
                  className="text-cyan"
                />
              </button>
            ) : (
              <span className="text-[0.78rem] font-bold text-muted/50">
                Document unavailable
              </span>
            )}
          </div>
        </div>
      </>
    );
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <>
      <section
        id="certificates"
        className="py-16 sm:py-24 px-4 sm:px-[5%] bg-dark border-t border-border select-none relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* =================================================
              HEADER
          ================================================== */}

          <Reveal direction="down">
            <div className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 text-[#5b00ff] font-bold text-[0.7rem] sm:text-[0.85rem] uppercase tracking-[2px] sm:tracking-[3px] bg-[rgba(91,0,255,0.08)] px-3 sm:px-4 py-1.5 rounded-full border border-[rgba(91,0,255,0.2)]">
                <Award
                  size={13}
                  className="animate-pulse"
                />

                My Achievements
              </span>

              <h2 className="font-syne text-[1.6rem] sm:text-[clamp(2rem,5vw,3rem)] font-extrabold mt-3 text-white leading-tight">
                Certificates{" "}
                <span className="text-cyan">
                  & Achievements
                </span>
              </h2>
            </div>
          </Reveal>

          {/* =================================================
              LOADING
          ================================================== */}

          {loading ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />

              <p className="text-muted text-xs mt-4 tracking-[1px] uppercase">
                Loading Certificates...
              </p>
            </div>
          ) : error ? (
            /* =================================================
               ERROR
            ================================================== */

            <div className="min-h-[300px] flex flex-col items-center justify-center bg-card/50 border border-red-500/20 rounded-[20px] px-6 text-center">
              <Award
                size={32}
                className="text-red-400 mb-4"
              />

              <h3 className="text-white text-lg font-bold">
                Unable to Load Certificates
              </h3>

              <p className="text-muted text-sm mt-2 max-w-md">
                {error}
              </p>
            </div>
          ) : certificates.length ===
            0 ? (
            /* =================================================
               EMPTY
            ================================================== */

            <div className="min-h-[300px] flex flex-col items-center justify-center bg-card/50 border border-border rounded-[20px] px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-5">
                <Award
                  size={28}
                  className="text-cyan"
                />
              </div>

              <h3 className="text-white text-lg sm:text-xl font-bold">
                No Certificates Found
              </h3>

              <p className="text-muted text-sm mt-2 max-w-md">
                Certificates will appear here
                once they are added from the
                admin panel.
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  MOBILE
              ================================================== */}

              <div className="block sm:hidden relative w-full max-w-[360px] mx-auto">
                <div className="overflow-hidden min-h-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      variants={
                        slideVariants
                      }
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="bg-card border border-border rounded-[20px] overflow-hidden flex flex-col h-full w-full group shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                    >
                      {renderCardContent(
                        certificates[
                          currentIndex
                        ]
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* NAV */}

                <div className="flex items-center justify-between mt-6 px-2">
                  <div className="flex gap-1.5 max-w-[170px] overflow-hidden">
                    {certificates.map(
                      (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setCurrentIndex(
                              index
                            )
                          }
                          aria-label={`Go to certificate ${
                            index + 1
                          }`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index ===
                            currentIndex
                              ? "w-5 bg-cyan"
                              : "w-1.5 bg-border"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevSlide}
                      disabled={
                        certificates.length <=
                        1
                      }
                      className="p-2.5 rounded-full bg-card border border-border text-white hover:text-cyan hover:border-cyan/50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Previous Certificate"
                    >
                      <ChevronLeft
                        size={18}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      disabled={
                        certificates.length <=
                        1
                      }
                      className="p-2.5 rounded-full bg-card border border-border text-white hover:text-cyan hover:border-cyan/50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Next Certificate"
                    >
                      <ChevronRight
                        size={18}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  DESKTOP
              ================================================== */}

              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {certificates.map(
                  (
                    certificate,
                    index
                  ) => (
                    <motion.div
                      key={
                        certificate._id ||
                        `${certificate.title}-${index}`
                      }
                      custom={index}
                      variants={
                        cardSpring
                      }
                      initial="hidden"
                      whileInView="visible"
                      viewport={{
                        once: false,
                        amount: 0.15,
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 group hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col h-full"
                    >
                      {renderCardContent(
                        certificate
                      )}
                    </motion.div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* =========================================================
          PDF MODAL
      ========================================================= */}

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeCertificate();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="relative w-full max-w-6xl h-[94vh] bg-gray-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* =================================================
                  HEADER
              ================================================== */}

              <div className="h-14 sm:h-16 flex-shrink-0 px-3 sm:px-5 flex items-center justify-between gap-3 border-b border-white/10 bg-gray-900">
                <div className="min-w-0">
                  <h3 className="text-white text-sm sm:text-base font-bold truncate">
                    {selectedCertificate.title ||
                      "Certificate"}
                  </h3>

                  <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 truncate">
                    {selectedCertificate.organization ||
                      "Certificate"}

                    {selectedCertificate.date
                      ? ` • ${selectedCertificate.date}`
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* OPEN ORIGINAL */}

                  {selectedCertificate.documentUrl && (
                    <a
                      href={
                        selectedCertificate.documentUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open original document"
                      className="hidden sm:flex w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan/10 hover:border-cyan/30 text-gray-300 hover:text-cyan items-center justify-center transition"
                    >
                      <ExternalLink
                        size={16}
                      />
                    </a>
                  )}

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={
                      closeCertificate
                    }
                    aria-label="Close certificate viewer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 flex items-center justify-center transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  VIEWER
              ================================================== */}

              <div className="flex-1 min-h-0 bg-gray-800">
                {selectedCertificate.documentUrl ? (
                  <iframe
                    src={getDocumentViewerUrl(
                      selectedCertificate.documentUrl
                    )}
                    title={
                      selectedCertificate.title ||
                      "Certificate Document"
                    }
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="fullscreen"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <FileText
                      size={48}
                      className="text-gray-500 mb-4"
                    />

                    <h3 className="text-white font-bold text-lg">
                      Document Unavailable
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                      This certificate does not
                      have a document.
                    </p>
                  </div>
                )}
              </div>

              {/* =================================================
                  MOBILE FOOTER
              ================================================== */}

              {selectedCertificate.documentUrl && (
                <div className="sm:hidden flex-shrink-0 p-2 bg-gray-900 border-t border-white/10">
                  <a
                    href={
                      selectedCertificate.documentUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold hover:text-cyan hover:border-cyan/30 transition"
                  >
                    <ExternalLink
                      size={14}
                    />

                    Open Original Document
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}