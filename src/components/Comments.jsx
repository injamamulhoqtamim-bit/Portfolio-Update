"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  Loader2,
  User,
  Mail,
  Clock,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     LOAD COMMENTS
  ========================================================= */

  async function loadComments() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/comments", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setComments(
          Array.isArray(data.data) ? data.data : []
        );
      } else {
        setError(
          data.message || "Failed to load comments."
        );
      }
    } catch (error) {
      console.error("LOAD COMMENTS ERROR:", error);
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadComments();
  }, []);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  }

  /* =========================================================
     SUBMIT COMMENT
  ========================================================= */

  async function handleSubmit(e) {
    e.preventDefault();

    if (posting) return;

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    /* Validation */

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (message.length < 3) {
      setError("Comment must be at least 3 characters.");
      return;
    }

    setPosting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Failed to post comment."
        );
        return;
      }

      /* Add new comment immediately */

      if (data.data) {
        setComments((prev) => [
          data.data,
          ...prev,
        ]);
      }

      /* Reset form */

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setSuccess(
        "Your comment has been posted successfully!"
      );
    } catch (error) {
      console.error("POST COMMENT ERROR:", error);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setPosting(false);
    }
  }

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  function formatDate(date) {
    if (!date) return "";

    try {
      return new Date(date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    } catch {
      return "";
    }
  }

  /* =========================================================
     DUPLICATE COMMENTS FOR INFINITE MARQUEE
  ========================================================= */

  const marqueeComments = [
    ...comments,
    ...comments,
  ];

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <section
      id="comments"
      className="w-full py-20 sm:py-24 overflow-hidden"
    >
      <div className="w-full">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center max-w-2xl mx-auto mb-12 px-4 sm:px-6">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-5">
            <MessageCircle size={26} />
          </div>

          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
            Community
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
            Leave a Comment
          </h2>

          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Have something to say? Drop a comment below.
            I may personally reply to you.
          </p>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl"
          >

            {/* NAME + EMAIL */}

            <div className="grid sm:grid-cols-2 gap-4">

              {/* NAME */}

              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Your Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={60}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                    required
                  />

                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={120}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                    required
                  />

                </div>
              </div>

            </div>

            {/* COMMENT */}

            <div className="mt-4">

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-semibold text-zinc-300">
                  Comment
                </label>

                <span className="text-xs text-zinc-600">
                  {form.message.length}/1000
                </span>

              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                maxLength={1000}
                rows={6}
                placeholder="Write your comment..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition resize-y"
                required
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 px-4 py-3 text-sm">
                {success}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={posting}
              className="mt-5 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:cursor-not-allowed"
            >

              {posting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Posting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Post Comment
                </>
              )}

            </button>

          </form>
        </div>

        {/* =====================================================
            COMMENTS SECTION
        ===================================================== */}

        <div className="mt-14 w-full">

          {/* HEADER */}

          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h3 className="text-2xl font-bold text-white">
                  Community Comments
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  {comments.length}{" "}
                  {comments.length === 1
                    ? "comment"
                    : "comments"}
                </p>

              </div>

              {/* REFRESH */}

              <button
                type="button"
                onClick={loadComments}
                disabled={loading}
                className="w-fit inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 py-2.5 rounded-xl text-sm transition"
              >

                <RefreshCw
                  size={15}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>

            </div>

          </div>

          {/* ===================================================
              LOADING
          =================================================== */}

          {loading ? (

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

              <div className="space-y-4">

                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="animate-pulse bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                  >

                    <div className="h-5 bg-zinc-800 rounded w-40 mb-3" />

                    <div className="h-4 bg-zinc-800 rounded w-full mb-2" />

                    <div className="h-4 bg-zinc-800 rounded w-3/4" />

                  </div>

                ))}

              </div>

            </div>

          ) : comments.length === 0 ? (

            /* =================================================
               EMPTY
            ================================================= */

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

              <div className="text-center py-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl">

                <MessageCircle
                  size={32}
                  className="mx-auto text-zinc-600 mb-3"
                />

                <p className="text-zinc-400 font-medium">
                  No comments yet.
                </p>

                <p className="text-zinc-600 text-sm mt-1">
                  Be the first person to leave a comment.
                </p>

              </div>

            </div>

          ) : (

            /* =================================================
               INFINITE RIGHT → LEFT MARQUEE
            ================================================= */

            <div className="relative w-full overflow-hidden">

              {/* LEFT FADE */}

              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#020b18] to-transparent" />

              {/* RIGHT FADE */}

              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#020b18] to-transparent" />

              {/* MARQUEE */}

              <motion.div
                className="flex w-max gap-5 hover:[animation-play-state:paused]"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
                whileHover={{
                  transition: {
                    duration: 35,
                    ease: "linear",
                  },
                }}
              >

                {marqueeComments.map(
                  (comment, index) => (

                    <article
                      key={`${comment._id}-${index}`}
                      className="
                        shrink-0
                        w-[85vw]
                        sm:w-[480px]
                        lg:w-[520px]
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-2xl
                        p-5
                        sm:p-6
                        shadow-xl
                      "
                    >

                      {/* USER */}

                      <div className="flex items-start gap-3">

                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-blue-500/10
                            border
                            border-blue-500/20
                            text-blue-400
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >

                          <User size={20} />

                        </div>

                        <div className="min-w-0">

                          <h4 className="font-bold text-white break-words">
                            {comment.name}
                          </h4>

                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-500">

                            <span className="inline-flex items-center gap-1">

                              <Clock size={12} />

                              {formatDate(
                                comment.createdAt
                              )}

                            </span>

                          </div>

                        </div>

                      </div>

                      {/* MESSAGE */}

                      <p className="text-zinc-300 leading-7 mt-4 whitespace-pre-wrap break-words min-h-[56px]">
                        {comment.message}
                      </p>

                      {/* ADMIN REPLY */}

                      {comment.reply && (

                        <div
                          className="
                            mt-5
                            border-l-2
                            border-blue-500
                            bg-blue-500/5
                            rounded-r-xl
                            p-4
                            sm:p-5
                          "
                        >

                          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">

                            <ShieldCheck size={17} />

                            Admin Reply

                          </div>

                          <p className="text-zinc-300 leading-7 mt-2 whitespace-pre-wrap break-words">
                            {comment.reply}
                          </p>

                          {comment.repliedAt && (

                            <p className="text-xs text-zinc-600 mt-3">
                              Replied{" "}
                              {formatDate(
                                comment.repliedAt
                              )}
                            </p>

                          )}

                        </div>

                      )}

                    </article>

                  )
                )}

              </motion.div>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}