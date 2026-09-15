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
      
      {/* Custom CSS for Glowing Border Animation */}
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
      `}</style>

      {/* Background Ambient Glow Effects */}
      <div className="absolute -top-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Responsive Card */}
      <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-gray-800/80 bg-gray-900/70 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-in fade-in zoom-in-95 duration-700">
        
        {/* LEFT SIDE: Full Image & Background (Hidden on small mobile screens for clean layout) */}
        <div className="relative hidden lg:flex flex-col justify-end p-8 xl:p-10 overflow-hidden border-r border-gray-800/50 group">
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

          {/* Designed Badge/Text at the Bottom of Left Image */}
          <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase shadow-lg">
              WEB DEVELOPER & CYBER SECURITY ENTHUSIAST
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Professional Responsive Login Form */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 relative w-full">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Secure Access
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-teal-400 font-syne tracking-tight">
              Injamamul Hoq
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Enter your credentials to access your admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-xs sm:text-sm text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-red-400">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* Gmail Input */}
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Gmail
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin Gmail"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full rounded-xl sm:rounded-2xl border border-gray-700/80 bg-gray-800/40 px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl sm:rounded-2xl border border-gray-700/80 bg-gray-800/40 px-4 py-3 sm:py-3.5 pr-12 text-sm sm:text-base text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-900/90 border border-teal-500/40 py-3.5 sm:py-4 font-semibold text-white shadow-xl shadow-teal-500/10 transition-all duration-500 hover:border-teal-300 hover:shadow-teal-400/30 hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 group mt-2"
            >
              {/* Moving Neon Light Beam Across Border */}
              <span className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-border-beam" />
              <span className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm" />
              
              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base text-teal-300 group-hover:text-white transition-colors duration-300 font-medium tracking-wide">
                {loading && (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? "Verifying..." : "Login to Dashboard"}
              </span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}