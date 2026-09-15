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

const StatCard = ({ label, value, suffix, targetId, onTriggerScroll, hasStarted }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasStarted) return; 

    let start = 0;
    const duration = 800; // ৮০০ মিলিসেকেন্ডে অ্যানিমেশন শেষ হবে
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
      onClick={() => targetId && onTriggerScroll(targetId)}
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
  
  // একসঙ্গে অ্যানিমেশন শুরু করার জন্য সেকশনের স্টেট
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  // =========================================================
  // SECTION IN-VIEW OBSERVER (সবগুলো একসঙ্গে ট্রিগার করার জন্য)
  // =========================================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // =========================================================
  // GET ARRAY FROM API RESPONSE
  // =========================================================
  const getArrayFromResponse = (data, possibleKeys = []) => {
    if (Array.isArray(data)) {
      return data;
    }

    for (const key of possibleKeys) {
      if (Array.isArray(data?.[key])) {
        return data[key];
      }

      if (Array.isArray(data?.data?.[key])) {
        return data.data[key];
      }
    }

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

      const projectsData = await projectsResponse.json();
      const certificatesData = await certificatesResponse.json();
      const skillsData = await skillsResponse.json();

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
      setStats(defaultStats);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats();
      }
    };

    const handleFocus = () => {
      fetchStats();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleScrollWithAnimation = (targetId) => {
    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      const targetSection = document.getElementById(targetId);

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
    <section ref={sectionRef} className="py-16 px-4 md:px-[5%] max-w-7xl mx-auto w-full relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label || index}
            {...stat}
            onTriggerScroll={handleScrollWithAnimation}
            hasStarted={hasStarted}
          />
        ))}
      </div>

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
    </section>
  );
}