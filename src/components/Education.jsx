"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Code,
  ShieldAlert,
  Briefcase,
  ExternalLink,
} from "lucide-react";

import Reveal from "./Reveal";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/education", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        if (result.success) {
          setEducation(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // ============================
  // Icon
  // ============================

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <Code size={26} />;

      case "research":
        return <ShieldAlert size={26} />;

      case "experience":
        return <Briefcase size={26} />;

      default:
        return <GraduationCap size={26} />;
    }
  };

  // ============================
  // Card Style
  // ============================

  const getTypeStyle = (type) => {
    switch (type) {
      case "course":
        return {
          badge:
            "bg-[rgba(255,107,157,0.12)] border border-[rgba(255,107,157,0.2)] text-purple-500",
          institution: "text-purple-500",
        };

      case "research":
        return {
          badge:
            "bg-[rgba(255,107,157,0.12)] border border-[rgba(255,107,157,0.2)] text-pink",
          institution: "text-[#ef4444]",
        };

      case "experience":
        return {
          badge:
            "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)] text-cyan",
          institution: "text-cyan",
        };

      default:
        return {
          badge:
            "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.2)] text-cyan",
          institution: "text-cyan",
        };
    }
  };

  return (
    <section
      id="education"
      className="overflow-x-hidden bg-dark2 px-[5%] py-24"
    >

      {/* ================= TITLE ================= */}

      <Reveal direction="down">
        <h2 className="font-syne mb-1 text-center text-[clamp(2rem,4vw,3rem)] font-extrabold">
          Education <span className="text-cyan">&</span> Experience
        </h2>
      </Reveal>

      <Reveal direction="down">
        <p className="text-muted mb-14 mt-1 text-center text-[0.95rem] font-medium uppercase tracking-[2px]">
          My <span className="text-cyan2">Journey</span>
        </p>
      </Reveal>

      {/* ================= CONTENT ================= */}

      <div className="mx-auto flex max-w-[760px] flex-col gap-8">

        {loading ? (
          <div className="py-10 text-center text-muted">
            Loading education...
          </div>
        ) : education.length === 0 ? (
          <div className="py-10 text-center text-muted">
            No education information available.
          </div>
        ) : (
          education.map((item, index) => {
            const style = getTypeStyle(item.type);

            const CardContent = (
              <>
                {/* Top gradient */}

                <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink" />

                {/* Icon + Year */}

                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">

                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan to-cyan2 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                    {getIcon(item.type)}
                  </div>

                  <span
                    className={`${style.badge} self-start rounded-full px-[0.9rem] py-[0.3rem] text-[0.75rem] font-semibold md:self-auto`}
                  >
                    {item.passingYear}
                  </span>

                </div>

                {/* Title */}

                <h3 className="font-syne mb-1 text-[1.4rem] font-bold text-white transition-colors group-hover:text-cyan">
                  {item.title}
                </h3>

                {/* Institution */}

                <p
                  className={`${style.institution} mb-3 flex items-center gap-1.5 text-[0.95rem] font-bold`}
                >
                  {item.institution}

                  {item.link && (
                    <span className="text-xs font-normal text-muted">
                      <ExternalLink size={13} />
                    </span>
                  )}
                </p>

                {/* Description */}

                {item.description && (
                  <p className="text-[0.88rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}

                {/* Bullet Points */}

                {item.points?.length > 0 && (
                  <ul className="mt-4 flex list-none flex-col gap-2.5 pl-1 text-[0.85rem] text-muted">

                    {item.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-0.5 text-cyan">
                          ▹
                        </span>

                        <span>{point}</span>
                      </li>
                    ))}

                  </ul>
                )}

              </>
            );

            return (
              <Reveal
                key={item._id}
                direction={
                  index % 3 === 0
                    ? "left"
                    : index % 3 === 1
                    ? "right"
                    : "up"
                }
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block cursor-pointer overflow-hidden rounded-[20px] border border-border bg-card p-8 no-underline transition-all duration-300 hover:border-[rgba(0,212,255,0.3)]"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div className="group relative overflow-hidden rounded-[20px] border border-border bg-card p-8 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)]">
                    {CardContent}
                  </div>
                )}
              </Reveal>
            );
          })
        )}

      </div>
    </section>
  );
}