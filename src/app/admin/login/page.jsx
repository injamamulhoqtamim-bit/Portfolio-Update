"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  /* =========================================================
     HANDLE GOOGLE LOGIN RESULT
  ========================================================= */

  useEffect(() => {
    const errorType = searchParams.get("error");

    if (!errorType) {
      return;
    }

    setPopupType(errorType);
    setShowPopup(true);
    setGoogleLoading(false);
  }, [searchParams]);

  /* =========================================================
     CLOSE POPUP
  ========================================================= */

  const closePopup = () => {
    setShowPopup(false);
    setPopupType("");

    router.replace("/admin/login");
  };

  /* =========================================================
     NORMAL LOGIN
  ========================================================= */

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
        setError(result.message || "Invalid Gmail or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (loginError) {
      console.error("ADMIN LOGIN ERROR:", loginError);

      setError(
        "Unable to login. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleLogin = () => {
    setError("");
    setGoogleLoading(true);

    window.location.href = "/api/auth/google";
  };

  /* =========================================================
     POPUP CONTENT
  ========================================================= */

  const getPopupContent = () => {
    if (popupType === "UnauthorizedGmail") {
      return {
        emoji: "😂",
        badge: "BRO, SERIOUSLY? 😂",
        title:
          "Who invited you? This is my admin panel, not a public park.",
        description:
          "This Gmail isn't on the VIP list. This is my admin panel, not a public Wi-Fi hotspot!",
        extra:
          "Only the owner's Gmail gets the admin pass. Go eat some muri and come back with the right one. 🍚🤣",
        button: "OK, I GET IT 😎",
      };
    }

    if (popupType === "GoogleAuthFailed") {
      return {
        emoji: "😵",
        badge: "GOOGLE SAID NO!",
        title: "Google Login Failed",
        description:
          "Something went wrong while talking to Google.",
        extra:
          "Even Google needs a little break sometimes. Take a breath and try again. 😂",
        button: "TRY AGAIN",
      };
    }

    if (popupType === "ServerError") {
      return {
        emoji: "💀",
        badge: "SERVER PANIC!",
        title: "Something Went Wrong",
        description:
          "The server had a tiny existential crisis while processing your login.",
        extra:
          "Don't worry, your Gmail hasn't been arrested. Try again in a moment. 😂",
        button: "OK, I'LL TRY AGAIN",
      };
    }

    return {
      emoji: "🚫",
      badge: "ACCESS DENIED",
      title: "You Shall Not Pass!",
      description:
        "This admin area is reserved for the authorized account.",
      extra:
        "You clicked Login… and accidentally activated my hacker mode.",
      button: "BACK TO LOGIN",
    };
  };

  const popup = getPopupContent();

  return (
    <>
      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#05070b] p-3 text-white sm:p-5 md:p-6 lg:p-8">

        {/* ===================================================
            PAGE ANIMATIONS
        =================================================== */}

        <style jsx>{`
          /* =================================================
             BORDER BEAM
          ================================================= */

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

          /* =================================================
             LOGIN BUTTON BORDER ANIMATION
          ================================================= */

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
            background: linear-gradient(
              60deg,
              #14b8a6,
              #06b6d4,
              #3b82f6,
              #14b8a6
            );

            background-size: 300% 300%;
            animation: btnLightRotate 4s ease infinite;
          }

          /* =================================================
             FLOATING BACKGROUND ICONS
          ================================================= */

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

          /* =================================================
             POPUP BACKDROP
          ================================================= */

          @keyframes popupBackdropIn {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }

          /* =================================================
             POPUP CARD
          ================================================= */

          @keyframes popupCardIn {
            0% {
              opacity: 0;
              transform: translateY(35px) scale(0.88) rotateX(8deg);
            }

            60% {
              transform: translateY(-5px) scale(1.02) rotateX(0deg);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1) rotateX(0deg);
            }
          }

          /* =========================================================
             ORIGINAL EMOJI STYLE ANIMATIONS
          ========================================================= */

          @keyframes emojiEnter {
            0% {
              transform: scale(0) rotate(-25deg);
              opacity: 0;
            }

            55% {
              transform: scale(1.25) rotate(10deg);
              opacity: 1;
            }

            75% {
              transform: scale(0.92) rotate(-5deg);
            }

            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes emojiLaugh {
            0%,
            100% {
              transform: rotate(0deg) scale(1);
            }

            10% {
              transform: rotate(-8deg) scale(1.05);
            }

            20% {
              transform: rotate(8deg) scale(1.08);
            }

            30% {
              transform: rotate(-7deg) scale(1.05);
            }

            40% {
              transform: rotate(7deg) scale(1.08);
            }

            50% {
              transform: rotate(-4deg) scale(1.03);
            }

            60% {
              transform: rotate(4deg) scale(1.02);
            }

            70% {
              transform: rotate(0deg) scale(1);
            }
          }

          @keyframes emojiDizzy {
            0%,
            100% {
              transform: rotate(0deg) scale(1);
            }

            20% {
              transform: rotate(-12deg) scale(1.08);
            }

            40% {
              transform: rotate(12deg) scale(1.08);
            }

            60% {
              transform: rotate(-8deg) scale(1.04);
            }

            80% {
              transform: rotate(8deg) scale(1.04);
            }
          }

          @keyframes emojiSkull {
            0%,
            100% {
              transform: scale(1) rotate(0deg);
            }

            25% {
              transform: scale(1.08) rotate(-5deg);
            }

            50% {
              transform: scale(1.14) rotate(5deg);
            }

            75% {
              transform: scale(1.08) rotate(-3deg);
            }
          }

          @keyframes emojiStop {
            0%,
            100% {
              transform: scale(1) rotate(0deg);
            }

            30% {
              transform: scale(1.12) rotate(-5deg);
            }

            60% {
              transform: scale(1.05) rotate(5deg);
            }
          }

          .popup-emoji {
            animation:
              emojiEnter
              0.7s
              cubic-bezier(0.16, 1, 0.3, 1)
              both;
          }

          .popup-emoji-face {
            display: inline-block;
            transform-origin: center;
            will-change: transform;
          }

          .popup-emoji-face.laugh {
            animation:
              emojiLaugh
              1.8s
              ease-in-out
              0.7s
              infinite;
          }

          .popup-emoji-face.dizzy {
            animation:
              emojiDizzy
              1.6s
              ease-in-out
              0.7s
              infinite;
          }

          .popup-emoji-face.skull {
            animation:
              emojiSkull
              2s
              ease-in-out
              0.7s
              infinite;
          }

          .popup-emoji-face.stop {
            animation:
              emojiStop
              1.7s
              ease-in-out
              0.7s
              infinite;
          }

          /* =================================================
             POPUP GLOW
          ================================================= */

          @keyframes popupGlow {
            0%,
            100% {
              opacity: 0.35;
              transform: scale(0.95);
            }

            50% {
              opacity: 0.7;
              transform: scale(1.08);
            }
          }

          /* =================================================
             POPUP SHIMMER
          ================================================= */

          @keyframes popupShimmer {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }

          .popup-backdrop {
            animation: popupBackdropIn 0.25s ease-out forwards;
          }

          .popup-card {
            animation:
              popupCardIn
              0.45s
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }

          .popup-glow {
            animation: popupGlow 2.2s ease-in-out infinite;
          }

          .popup-shimmer {
            animation: popupShimmer 2.5s linear infinite;
          }

          /* =================================================
             POPUP BUTTON SHAKE
          ================================================= */

          @keyframes shakeButton {
            0%,
            100% {
              transform: translateX(0);
            }

            20% {
              transform: translateX(-3px);
            }

            40% {
              transform: translateX(3px);
            }

            60% {
              transform: translateX(-2px);
            }

            80% {
              transform: translateX(2px);
            }
          }

          .popup-button:hover .popup-button-icon {
            animation: shakeButton 0.45s ease-in-out;
          }

          /* =================================================
             GOOGLE LOADING DOTS
          ================================================= */

          @keyframes dots {
            0%,
            20% {
              opacity: 0;
            }

            50% {
              opacity: 1;
            }

            100% {
              opacity: 0;
            }
          }

          .dot-1 {
            animation: dots 1.4s infinite;
          }

          .dot-2 {
            animation: dots 1.4s infinite 0.2s;
          }

          .dot-3 {
            animation: dots 1.4s infinite 0.4s;
          }

          /* =================================================
             SMALL SCREEN RESPONSIVE ADJUSTMENTS
          ================================================= */

          @media (max-width: 639px) {
            .popup-card {
              max-height: calc(100vh - 2rem);
              overflow-y: auto;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .floating-icon,
            .btn-glow-border,
            .popup-backdrop,
            .popup-card,
            .popup-glow,
            .popup-shimmer,
            .popup-emoji,
            .popup-emoji-face,
            .dot-1,
            .dot-2,
            .dot-3 {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}</style>

        {/* =====================================================
            BACKGROUND GLOW
        ===================================================== */}

        <div className="pointer-events-none absolute -left-40 -top-40 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96" />

        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/75 shadow-2xl backdrop-blur-2xl sm:rounded-3xl lg:grid-cols-2">

          {/* ===================================================
              LEFT IMAGE
          =================================================== */}

          <div className="group relative flex h-52 flex-col justify-end overflow-hidden border-b border-gray-800/50 p-5 sm:h-64 sm:p-8 lg:h-auto lg:min-h-[620px] lg:border-b-0 lg:border-r xl:p-10">

            <div className="absolute inset-0 z-0">
              <Image
                src="/log.jpg"
                alt="Admin Profile"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/90 via-[#05070b]/30 to-transparent" />
            </div>

            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">

              <div className="inline-flex max-w-full items-center rounded-full border border-teal-500/30 bg-black/40 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-teal-300 shadow-lg backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-[10px] sm:tracking-widest xl:text-[11px]">
                WEB DEVELOPER & CYBER SECURITY ENTHUSIAST
              </div>

            </div>
          </div>

          {/* ===================================================
              RIGHT LOGIN AREA
          =================================================== */}

          <div className="relative flex w-full min-w-0 flex-col justify-center overflow-hidden p-5 sm:p-8 md:p-10 lg:p-10 xl:p-12">

            {/* =================================================
                FLOATING ICONS
            ================================================= */}

            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

              <div
                className="floating-icon left-[12%] text-teal-400/30"
                style={{
                  animationDuration: "6s",
                  animationDelay: "0s",
                }}
              >

                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>

              </div>

              <div
                className="floating-icon left-[32%] text-cyan-400/30"
                style={{
                  animationDuration: "8s",
                  animationDelay: "2s",
                }}
              >

                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>

              </div>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="relative z-10 mb-6 text-center sm:mb-8 lg:text-left">

              <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-400 sm:px-3 sm:py-1 sm:text-xs sm:tracking-wider">

                <span className="h-2 w-2 shrink-0 animate-ping rounded-full bg-teal-400" />

                Authorized Personal Only

              </div>

              <h1 className="font-syne bg-gradient-to-r from-white via-gray-100 to-teal-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                Injamamul Hoq
              </h1>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6 lg:mx-0">
                Why are you here? This dashboard is not for you.
                Go eat some muri. 😂
              </p>

            </div>

            {/* =================================================
                NORMAL LOGIN ERROR
            ================================================= */}

            {error && (
              <div className="relative z-10 mb-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-xs leading-5 text-red-400 sm:mb-6 sm:text-sm">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mt-0.5 h-5 w-5 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{error}</span>

              </div>
            )}

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="relative z-10 space-y-4 sm:space-y-5"
            >

              {/* Gmail */}

              <div>

                <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                  Gmail
                </label>

                <div className="group relative">

                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-colors group-focus-within:text-teal-400">

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>

                  </span>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin Gmail"
                    autoComplete="username"
                    disabled={loading || googleLoading}
                    required
                    className="w-full rounded-xl border border-gray-700/80 bg-gray-800/40 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl sm:py-3.5 sm:text-base"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                  Password
                </label>

                <div className="group relative">

                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-colors group-focus-within:text-teal-400">

                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>

                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    disabled={loading || googleLoading}
                    required
                    className="w-full rounded-xl border border-gray-700/80 bg-gray-800/40 py-3 pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-teal-500 focus:bg-gray-800/80 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl sm:py-3.5 sm:text-base"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={loading || googleLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-teal-400 disabled:cursor-not-allowed"
                  >

                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.58 10.58a2 2 0 102.83 2.83"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.88 4.24A9.77 9.77 0 0112 4c5.5 0 9.5 8 9.5 8a16.9 16.9 0 01-3.04 3.84"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.61 6.61C3.77 8.4 2.5 12 2.5 12a16.9 16.9 0 005.18 5.47A9.77 9.77 0 0012 20c1.13 0 2.21-.2 3.22-.57"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                        />

                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}

                  </button>

                </div>

              </div>

              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}

              <div className="group relative mt-4 rounded-xl p-[2px] shadow-lg shadow-teal-500/20 sm:rounded-2xl btn-glow-border">

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="relative w-full overflow-hidden rounded-[10px] bg-[#0b0f17] py-3.5 font-bold text-white transition-all duration-300 hover:bg-transparent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-[14px] sm:py-4"
                >

                  <div className="absolute inset-0 bg-teal-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative flex items-center justify-center gap-2 text-sm font-bold tracking-wider text-teal-300 transition-colors duration-300 group-hover:text-white sm:text-base">

                    {loading && (
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}

                    {loading ? "Verifying..." : "লগইন কইরা ফালাও, কেউ দেখবো না!"}

                  </span>

                </button>

              </div>

            </form>

            {/* =================================================
                OR
            ================================================= */}

            <div className="relative z-10 my-5 flex items-center justify-center sm:my-6">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>

              <div className="relative bg-[#090d14] px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Or
              </div>

            </div>

            {/* =================================================
                PREMIUM GOOGLE LOGIN BUTTON
            ================================================= */}

            <div className="group relative z-10 mt-1">

              {/* Outer Glow */}

              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-teal-500/0 via-teal-400/50 to-cyan-400/0 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100" />

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[2px] hover:border-teal-400/30 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(20,184,166,0.14)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3.5"
              >

                {/* Moving Shine */}

                <span className="pointer-events-none absolute inset-y-0 -left-[120%] w-[70%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />

                {/* Top Light */}

                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                {/* Button Content */}

                <span className="relative flex min-w-0 items-center gap-3">

                  {googleLoading ? (
                    <>
                      {/* Loading Icon */}

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/5">

                        <svg
                          className="h-5 w-5 animate-spin text-teal-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-20"
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          />

                          <path
                            className="opacity-90"
                            fill="currentColor"
                            d="M21 12a9 9 0 01-9 9v-2.5a6.5 6.5 0 006.5-6.5H21z"
                          />
                        </svg>

                      </span>

                      {/* Loading Text */}

                      <span className="flex min-w-0 items-center text-sm text-gray-200 sm:text-[15px]">
                        Connecting
                        <span className="dot-1 ml-0.5">.</span>
                        <span className="dot-2">.</span>
                        <span className="dot-3">.</span>
                      </span>
                    </>
                  ) : (
                    <>
                      {/* =================================================
                          GOOGLE ICON — NO CARD
                      ================================================= */}

                      <svg
                        className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />

                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.17 21.36 7.23 24 12 24z"
                        />

                        <path
                          fill="#FBBC05"
                          d="M5.27 14.24c-.25-.72-.39-1.49-.39-2.24s.14-1.52.39-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"
                        />

                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                        />
                      </svg>

                      {/* =================================================
                          GOOGLE BUTTON TEXT
                      ================================================= */}

                      <span className="flex min-w-0 flex-col items-start leading-tight">

                        <span className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 group-hover:text-teal-400/70 sm:text-[10px] sm:tracking-[0.18em]">
                          Secure authentication
                        </span>

                        <span className="mt-0.5 truncate text-sm font-semibold text-gray-100 transition-colors duration-300 group-hover:text-white sm:text-[15px]">
                          Continue with Google
                        </span>

                      </span>

                      {/* =================================================
                          ARROW
                      ================================================= */}

                      <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-gray-500 transition-all duration-500 group-hover:translate-x-1 group-hover:border-teal-400/20 group-hover:bg-teal-400/5 group-hover:text-teal-300">

                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>

                      </span>

                    </>
                  )}

                </span>

              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =======================================================
          FUNNY GOOGLE ACCESS DENIED POPUP
      ======================================================= */}

      {showPopup && (
        <div
          className="popup-backdrop fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-popup-title"
        >

          {/* =================================================
              BACKGROUND GLOW
          ================================================= */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="popup-glow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl sm:h-96 sm:w-96" />

            <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-ping rounded-full bg-teal-400/70" />

            <div
              className="absolute right-[15%] top-[30%] h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400/70"
              style={{
                animationDelay: "0.5s",
              }}
            />

            <div
              className="absolute bottom-[20%] left-[20%] h-1.5 w-1.5 animate-ping rounded-full bg-teal-400/70"
              style={{
                animationDelay: "1s",
              }}
            />

          </div>

          {/* =================================================
              POPUP CARD
          ================================================= */}

          <div
            className="popup-card relative my-auto w-full max-w-md overflow-hidden rounded-[24px] border border-gray-700/80 bg-[#090d14]/95 shadow-[0_25px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                TOP ANIMATED LINE
            ================================================= */}

            <div className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden">

              <div className="popup-shimmer h-full w-1/2 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

            </div>

            {/* =================================================
                DECORATIVE GLOW
            ================================================= */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* =================================================
                POPUP CONTENT
            ================================================= */}

            <div className="relative px-5 py-7 text-center sm:px-9 sm:py-10">

              {/* =================================================
                  EMOJI
              ================================================= */}

              <div className="popup-emoji mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 shadow-[0_0_45px_rgba(20,184,166,0.15)] sm:h-24 sm:w-24">

                <span
                  className={`popup-emoji-face text-5xl leading-none sm:text-6xl ${
                    popupType === "UnauthorizedGmail"
                      ? "laugh"
                      : popupType === "GoogleAuthFailed"
                        ? "dizzy"
                        : popupType === "ServerError"
                          ? "skull"
                          : "stop"
                  }`}
                >
                  {popup.emoji}
                </span>

              </div>

              {/* =================================================
                  BADGE
              ================================================= */}

              <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.12em] text-teal-300 sm:px-3.5 sm:text-[10px] sm:tracking-[0.18em]">

                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-teal-400" />

                <span className="truncate">{popup.badge}</span>

              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h2
                id="admin-popup-title"
                className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl"
              >
                {popup.title}
              </h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="mt-4 text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7 md:text-base">
                {popup.description}
              </p>

              {/* =================================================
                  FUNNY EXTRA
              ================================================= */}

              <div className="mt-5 rounded-2xl border border-gray-800 bg-black/20 px-3.5 py-3.5 sm:px-4 sm:py-4">

                <p className="text-[11px] leading-5 text-gray-400 sm:text-xs sm:leading-6 md:text-sm">
                  {popup.extra}
                </p>

              </div>

              {/* =================================================
                  POPUP BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={closePopup}
                className="popup-button group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 p-[1.5px] shadow-lg shadow-teal-500/10 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] sm:mt-7"
              >

                <span className="relative flex items-center justify-center gap-2 rounded-[14px] bg-[#0b0f17] px-4 py-3.5 text-xs font-bold tracking-wide text-teal-300 transition-all duration-300 group-hover:bg-transparent group-hover:text-white sm:px-5 sm:py-3.5 sm:text-sm md:text-base">

                  <span className="popup-button-icon">
                    {popupType === "GoogleAuthFailed" ||
                    popupType === "ServerError"
                      ? "↻"
                      : "✓"}
                  </span>

                  {popup.button}

                </span>

              </button>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <p className="mt-4 text-[8px] uppercase tracking-[0.14em] text-gray-600 sm:mt-5 sm:text-[9px] sm:tracking-[0.2em] md:text-[10px]">
                Private Admin Area - No Guests Allowed 🔐
              </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   SUSPENSE WRAPPER
========================================================= */

export default function AdminLogin() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070b] px-4 text-teal-400">

          <div className="flex items-center gap-3 text-sm">

            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >

              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
              />

              <path
                className="opacity-90"
                fill="currentColor"
                d="M21 12a9 9 0 01-9 9v-2.5a6.5 6.5 0 006.5-6.5H21z"
              />

            </svg>

            Loading admin login...

          </div>

        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}