"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Trash2,
  Loader2,
  RefreshCw,
  User,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [replies, setReplies] = useState({});

  const [error, setError] = useState("");

  async function loadComments() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/comments", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Failed to load comments."
        );
        return;
      }

      const list = Array.isArray(data.data)
        ? data.data
        : [];

      setComments(list);

      const replyValues = {};

      list.forEach((item) => {
        replyValues[item._id] = item.reply || "";
      });

      setReplies(replyValues);
    } catch (error) {
      console.error(error);
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function saveReply(id) {
    const reply = replies[id]?.trim() || "";

    setSavingId(id);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          reply,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Failed to save reply."
        );
        return;
      }

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id
            ? data.data
            : comment
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to save reply.");
    } finally {
      setSavingId(null);
    }
  }

  async function deleteComment(id) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this comment?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(
        `/api/comments?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Failed to delete comment."
        );
        return;
      }

      setComments((prev) =>
        prev.filter(
          (comment) => comment._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete comment.");
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(date) {
    if (!date) return "";

    try {
      return new Date(date).toLocaleString(
        "en-US",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );
    } catch {
      return "";
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <MessageCircle size={21} />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black">
                  Comments Manager
                </h1>

                <p className="text-xs text-zinc-500">
                  Manage visitor comments and replies
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={loadComments}
                disabled={loading}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
              >
                <RefreshCw
                  size={16}
                  className={
                    loading ? "animate-spin" : ""
                  }
                />
                Refresh
              </button>

              <Link
                href="/admin"
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-7 sm:py-10">
        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-500 text-sm">
              Total Comments
            </p>

            <h2 className="text-3xl font-black mt-1">
              {comments.length}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-500 text-sm">
              Replied
            </p>

            <h2 className="text-3xl font-black mt-1 text-blue-400">
              {
                comments.filter(
                  (item) => item.reply
                ).length
              }
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 col-span-2 sm:col-span-1">
            <p className="text-zinc-500 text-sm">
              Waiting Reply
            </p>

            <h2 className="text-3xl font-black mt-1 text-yellow-400">
              {
                comments.filter(
                  (item) => !item.reply
                ).length
              }
            </h2>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="h-5 bg-zinc-800 rounded w-48 mb-4" />
                <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-6" />
                <div className="h-24 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <MessageCircle
              size={42}
              className="mx-auto text-zinc-700 mb-4"
            />

            <h2 className="text-xl font-bold">
              No Comments Yet
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
              Visitor comments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7"
              >
                {/* COMMENT HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <User size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        {comment.name}
                      </h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-zinc-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Mail size={12} />
                          {comment.email}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(
                            comment.createdAt
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`w-fit text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                      comment.reply
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}
                  >
                    {comment.reply
                      ? "Replied"
                      : "Waiting Reply"}
                  </span>
                </div>

                {/* COMMENT */}
                <div className="mt-5 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <p className="text-xs text-zinc-600 mb-2 font-semibold uppercase tracking-wide">
                    Visitor Comment
                  </p>

                  <p className="text-zinc-300 leading-7 whitespace-pre-wrap break-words">
                    {comment.message}
                  </p>
                </div>

                {/* REPLY */}
                <div className="mt-5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300 mb-2">
                    <ShieldCheck
                      size={17}
                      className="text-blue-400"
                    />
                    Your Reply
                  </label>

                  <textarea
                    value={replies[comment._id] || ""}
                    onChange={(e) =>
                      setReplies((prev) => ({
                        ...prev,
                        [comment._id]:
                          e.target.value,
                      }))
                    }
                    maxLength={1500}
                    rows={4}
                    placeholder="Write your reply..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 resize-y"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                    <span className="text-xs text-zinc-600">
                      {(replies[comment._id] || "")
                        .length}
                      /1500
                    </span>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() =>
                          deleteComment(
                            comment._id
                          )
                        }
                        disabled={
                          deletingId ===
                          comment._id
                        }
                        className="px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        {deletingId ===
                        comment._id ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}

                        Delete
                      </button>

                      <button
                        onClick={() =>
                          saveReply(comment._id)
                        }
                        disabled={
                          savingId ===
                          comment._id
                        }
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        {savingId ===
                        comment._id ? (
                          <>
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            {comment.reply
                              ? "Update Reply"
                              : "Reply"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}