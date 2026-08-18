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

// Helper: Icon Selector (Case-insensitive)
const getIcon = (type) => {
  const formattedType = type ? String(type).toLowerCase().trim() : "";
  switch (formattedType) {
    case "course":
      return <Code size={20} />;
    case "research":
      return <ShieldAlert size={20} />;
    case "experience":
      return <Briefcase size={20} />;
    default:
      return <GraduationCap size={20} />;
  }
};

// Reusable Timeline Card Component (Extracted outside to avoid re-renders)
const TimelineCard = ({ item }) => {
  const displayTitle = item.title || item.degree || "Untitled";

  return (
    <div className="relative pl-8 pb-10 group last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-[7px] top-3 h-full w-[2px] bg-border group-last:hidden" />

      {/* Timeline Dot */}
      <div className="absolute left-0 top-[6px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-cyan bg-dark2 transition-all duration-300 group-hover:bg-cyan group-hover:shadow-[0_0_10px_#00d4ff]" />

      {/* Card Body */}
      <div className="group relative overflow-hidden rounded-[16px] border border-border bg-card p-6 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)]">
        {/* Top Gradient */}
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan via-cyan2 to-pink" />

        {/* Year Badge & Icon */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[0.85rem] font-semibold text-cyan">
            {item.passingYear}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-cyan2 text-white shadow-[0_0_10px_rgba(0,212,255,0.2)]">
            {getIcon(item.type)}
          </div>
        </div>

        {/* Title */}
        <h4 className="font-syne mb-1 text-[1.2rem] font-bold text-white transition-colors group-hover:text-cyan">
          {displayTitle}
        </h4>

        {/* Institution with Optional Link */}
        <div className="mb-3 flex items-center gap-1.5 text-[0.9rem] font-bold text-cyan2">
          <span>{item.institution}</span>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-normal text-muted hover:text-cyan transition-colors ml-1"
              title="Visit link"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-[0.88rem] leading-relaxed text-muted">
            {item.description}
          </p>
        )}

        {/* Bullet Points */}
        {Array.isArray(item.points) && item.points.length > 0 && (
          <ul className="mt-3 flex list-none flex-col gap-2 pl-1 text-[0.85rem] text-muted">
            {item.points.map((point, pointIndex) => (
              <li key={pointIndex} className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

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

  // Filter education items (education, course, or default blank)
  const educationItems = education.filter((item) => {
    const type = item?.type ? String(item.type).toLowerCase().trim() : "";
    return type === "education" || type === "course" || type === "";
  });

  // Filter experience items (experience, research, or job)
  const experienceItems = education.filter((item) => {
    const type = item?.type ? String(item.type).toLowerCase().trim() : "";
    return type === "experience" || type === "research" || type === "job";
  });

  return (
    <section
      id="education"
      className="overflow-x-hidden bg-dark2 px-[5%] py-24"
    >
      {/* ================= TITLE ================= */}
      <Reveal direction="down">
        <h2 className="font-syne mb-1 text-center text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">
          Education <span className="text-cyan">&</span> Experience
        </h2>
      </Reveal>

      <Reveal direction="down">
        <p className="text-muted mb-16 mt-1 text-center text-[0.95rem] font-medium uppercase tracking-[2px]">
          My <span className="text-cyan2">Journey</span>
        </p>
      </Reveal>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <div className="py-10 text-center text-muted">
          Loading timeline...
        </div>
      ) : education.length === 0 ? (
        <div className="py-10 text-center text-muted">
          No information available.
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT COLUMN: EDUCATION */}
          <Reveal direction="left">
            <div>
              <h3 className="font-syne mb-8 text-xl font-bold uppercase tracking-wider text-cyan">
                Education
              </h3>
              <div className="flex flex-col">
                {educationItems.length > 0 ? (
                  educationItems.map((item, index) => (
                    <TimelineCard
                      key={item._id || item.id || index}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted">
                    No education records found.
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          {/* RIGHT COLUMN: EXPERIENCE */}
          <Reveal direction="right">
            <div>
              <h3 className="font-syne mb-8 text-xl font-bold uppercase tracking-wider text-cyan">
                Experience
              </h3>
              <div className="flex flex-col">
                {experienceItems.length > 0 ? (
                  experienceItems.map((item, index) => (
                    <TimelineCard
                      key={item._id || item.id || index}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted">
                    No experience records found.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}