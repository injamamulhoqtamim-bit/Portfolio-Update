"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your Gmail.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(
          result.message || "Invalid Gmail or password."
        );
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);
      setError(
        "Unable to login. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#05070b] p-3 sm:p-6 lg:p-8 text-white overflow-hidden">
      
      {/* Custom CSS for Glowing Border, Button Light Rotation & Floating Icons Animation */}
      <style jsx>{`
        @keyframes borderBeam {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-border-beam {
          animation: borderBeam 2.5s linear infinite;
        }

        @keyframes btnLightRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .btn-glow-border {
          background: linear-gradient(60deg, #14b8a6, #06b6d4, #3b82f6, #14b8a6);
          background-size: 300% 300%;
          animation: btnLightRotate 4s ease infinite;
        }

        @keyframes floatUpCard {
          0% {
            transform: translateY(100%) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-120%) scale(1.2);
            opacity: 0;
          }
        }

        .floating-icon {
          position: absolute;
          bottom: 0;
          animation: floatUpCard linear infinite;
        }
      `}</style>

      {/* Background Ambient Glow Effects */}
      <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Responsive Card */}
      <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-gray-800/80 bg-gray-900/75 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-in fade-in zoom-in-95 duration-700 relative z-10">
        
        {/* LEFT / TOP SIDE: Full Image & Background */}
        <div className="relative flex flex-col justify-end h-56 sm:h-64 lg:h-auto p-6 sm:p-8 xl:p-10 overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-800/50 group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/log.jpg" 
              alt="Admin Profile"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Rich Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/90 via-[#05070b]/30 to-transparent" />
          </div>

          {/* Designed Badge/Text at the Bottom of Image */}
          <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[9px] sm:text-[10px] xl:text-[11px] font-bold tracking-widest uppercase shadow-lg">
              WEB DEVELOPER & CYBER SECURITY ENTHUSIAST
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Professional Responsive Login Form with Floating Tech/Cyber Icons Background */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 relative w-full overflow-hidden">
          
          {/* Cyber Security & Web Development Floating Background Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Terminal / Code Icon */}
            <div className="floating-icon text-teal-400/30 left-[12%]" style={{ animationDuration: '6s', animationDelay: '0s' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
            </div>
            {/* Shield / Cyber Security Icon */}
            <div className="floating-icon text-cyan-400/30 left-[32%]" style={{ animationDuration: '8s', animationDelay: '2s' }}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            </div>
            {/* Lock / Security Icon */}
            <div className="floating-icon text-blue-400/30 left-[55%]" style={{ animationDuration: '7s', animationDelay: '1s' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            {/* Globe / Web Development Icon */}
            <div className="floating-icon text-teal-300/30 left-[75%]" style={{ animationDuration: '9s', animationDelay: '3s' }}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.25m-15.686 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.25m0 0A11.959 11.959 0 0112 10.5c2.998 0 5.74 1.1 7.843 2.918" /></svg>
            </div>
            {/* Cpu / Chip Icon */}
            <div className="floating-icon text-indigo-400/30 left-[88%]" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Authorized Personal Only
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-teal-400 font-syne tracking-tight">
              Injamamul Hoq
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              “Why are you here? This dashboard isn’t for you. Go eat some muri.” 😂
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-xs sm:text-sm text-red-400 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-red-400">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 relative z-10">
            {/* Gmail Input */}
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Gmail
              </label>
              <div className="relative group">
                {/* Premium Gmail/Mail Logo Icon */}
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-teal-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin Gmail"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full rounded-xl sm:rounded-2xl border border-gray-700/80 bg-gray-800/40 pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative group">
                {/* Premium Password/Key Logo Icon */}
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-teal-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl sm:rounded-2xl border border-gray-700/80 bg-gray-800/40 pl-11 pr-12 py-3 sm:py-3.5 text-sm sm:text-base text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />

                {/* Show / Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-teal-400 focus:outline-none disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58a2 2 0 102.83 2.83" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 4.24A9.77 9.77 0 0112 4c5.5 0 9.5 8 9.5 8a16.9 16.9 0 01-3.04 3.84" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.61 6.61C3.77 8.4 2.5 12 2.5 12a16.9 16.9 0 005.18 5.47A9.77 9.77 0 0012 20c1.13 0 2.21-.2 3.22-.57" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Updated Glowing & Bolder Login Button */}
            <div className="relative p-[2px] rounded-xl sm:rounded-2xl btn-glow-border shadow-lg shadow-teal-500/20 group mt-4">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden rounded-[10px] sm:rounded-[14px] bg-[#0b0f17] py-3.5 sm:py-4 font-bold text-white transition-all duration-300 hover:bg-transparent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-teal-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base text-teal-300 group-hover:text-white transition-colors duration-300 tracking-wider font-bold">
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {loading ? "Verifying..." : "LOGIN"}
                </span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}