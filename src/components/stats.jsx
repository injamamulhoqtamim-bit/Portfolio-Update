"use client";
import { useEffect, useState, useRef } from "react";

// 📊 আপডেট করা স্ট্যাটস ডাটা
const defaultStats = [
  {
    label: "Technologies",
    value: 0,
    suffix: "+",
    targetId: "technologies",
  },
  {
    label: "Projects Built",
    value: 0,
    suffix: "+",
    targetId: "projects",
  },
  {
    label: "Internship",
    value: 0,
    suffix: "+",
  },
  {
    label: "Publication",
    value: 0,
    suffix: "+",
  },
  {
    label: "Certifications",
    value: 0,
    suffix: "+",
    targetId: "certificates",
  },
  {
    label: "Dedication",
    value: 100,
    suffix: "%",
  },
];

const StatCard = ({ label, value, suffix, targetId, onTriggerScroll }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return; 

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div 
      ref={countRef} 
      onClick={() => targetId && onTriggerScroll(targetId)} // প্যারেন্ট ফাংশন কল করা হচ্ছে
      className={`flex flex-col items-center justify-center p-5 md:p-6 bg-[rgba(13,31,53,0.3)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-2xl hover:border-[#00d4ff]/50 transition-all duration-300 group ${
        targetId ? "cursor-pointer active:scale-95" : ""
      }`}
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#00d4ff] transition-colors">
        {count}{suffix}
      </h3>
      <p className="text-[#94a3b8] text-[0.75rem] sm:text-xs md:text-sm font-medium mt-2 uppercase tracking-wider text-center">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(defaultStats);
  const [statsLoading, setStatsLoading] = useState(true);

  // =========================================================
  // GET ARRAY FROM API RESPONSE
  // =========================================================

  const getArrayFromResponse = (data, possibleKeys = []) => {
    // Direct array response
    if (Array.isArray(data)) {
      return data;
    }

    // Common API response formats
    for (const key of possibleKeys) {
      if (Array.isArray(data?.[key])) {
        return data[key];
      }

      if (Array.isArray(data?.data?.[key])) {
        return data.data[key];
      }
    }

    // Some APIs may return:
    // { success: true, data: [...] }
    if (Array.isArray(data?.data)) {
      return data.data;
    }

    return [];
  };

  // =========================================================
  // FETCH LIVE STATS
  // =========================================================

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const [projectsResponse, certificatesResponse, skillsResponse] =
        await Promise.all([
          fetch("/api/projects", {
            method: "GET",
            cache: "no-store",
          }),

          fetch("/api/certificates", {
            method: "GET",
            cache: "no-store",
          }),

          fetch("/api/skills", {
            method: "GET",
            cache: "no-store",
          }),
        ]);

      // =====================================================
      // READ API DATA
      // =====================================================

      const projectsData = await projectsResponse.json();
      const certificatesData =
        await certificatesResponse.json();
      const skillsData = await skillsResponse.json();

      // =====================================================
      // GET ARRAYS
      // =====================================================

      const projects = getArrayFromResponse(projectsData, [
        "projects",
        "project",
        "items",
      ]);

      const certificates = getArrayFromResponse(
        certificatesData,
        [
          "certificates",
          "certificate",
          "items",
        ]
      );

      const skills = getArrayFromResponse(skillsData, [
        "skills",
        "technologies",
        "technology",
        "items",
      ]);

      // =====================================================
      // UPDATE STATS
      // =====================================================

      setStats([
        {
          label: "Technologies",
          value: skills.length,
          suffix: "+",
          targetId: "technologies",
        },

        {
          label: "Projects Built",
          value: projects.length,
          suffix: "+",
          targetId: "projects",
        },

        {
          label: "Internship",
          value: 0,
          suffix: "+",
        },

        {
          label: "Publication",
          value: 0,
          suffix: "+",
        },

        {
          label: "Certifications",
          value: certificates.length,
          suffix: "+",
          targetId: "certificates",
        },

        {
          label: "Dedication",
          value: 100,
          suffix: "%",
        },
      ]);
    } catch (error) {
      console.error("Stats API Error:", error);

      // Keep default values if API fails
      setStats(defaultStats);
    } finally {
      setStatsLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchStats();
  }, []);

  // =========================================================
  // AUTO REFRESH EVERY 30 SECONDS
  // =========================================================

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // =========================================================
  // REFRESH WHEN USER RETURNS TO TAB
  // =========================================================

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats();
      }
    };

    const handleFocus = () => {
      fetchStats();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // =========================================================
  // SCROLL WITH CANDLE ANIMATION
  // =========================================================

  const handleScrollWithAnimation = (targetId) => {
    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      const targetSection =
        document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsLoading(false);
    }, 3000);
  };

  return (
    <section className="py-16 px-4 md:px-[5%] max-w-7xl mx-auto w-full relative">

      {/* =====================================================
          STATS GRID
      ====================================================== */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">

        {stats.map((stat, index) => (
          <StatCard
            key={stat.label || index}
            {...stat}
            onTriggerScroll={
              handleScrollWithAnimation
            }
          />
        ))}

      </div>

      {/* =====================================================
          CANDLE LOADER
      ====================================================== */}

      {isLoading && (
        <div className="fixed inset-0 bg-[#111] z-[9999] flex items-center justify-center pointer-events-auto backdrop-blur-sm overflow-hidden">
          <div className="wrapper">
            <div className="candles">

              <div className="light__wave"></div>

              <div className="candle1">
                <div className="candle1__body">

                  <div className="candle1__eyes">
                    <span className="candle1__eyes-one"></span>
                    <span className="candle1__eyes-two"></span>
                  </div>

                  <div className="candle1__mouth"></div>

                </div>

                <div className="candle1__stick"></div>
              </div>

              <div className="candle2">

                <div className="candle2__body">

                  <div className="candle2__eyes">
                    <div className="candle2__eyes-one"></div>
                    <div className="candle2__eyes-two"></div>
                  </div>

                </div>

                <div className="candle2__stick"></div>

              </div>

              <div className="candle2__fire"></div>

              <div className="sparkles-one"></div>
              <div className="sparkles-two"></div>

              <div className="candle__smoke-one"></div>
              <div className="candle__smoke-two"></div>

            </div>

            <div className="floor"></div>

          </div>
        </div>
      )}

      {/* তোমার existing candle CSS এখানে একদম আগের মতোই থাকবে */}

    </section>
  );
}