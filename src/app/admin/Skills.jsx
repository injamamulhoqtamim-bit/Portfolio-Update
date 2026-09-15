"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import * as SimpleIcons from "react-icons/si";
import * as VscIcons from "react-icons/vsc";

export default function Skills({ admin }) {
  const {
    activeTab,
    editingId,
    fetchData,
    handleDeleteSkill,
    handleEditSkill,
    handleSkillSubmit,
    items = [],
    loading,
    resetForm,
    setSkillForm,
    skillForm = {},
  } = admin;

  // ============================================================
  // CATEGORY FILTER STATE
  // ============================================================
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ============================================================
  // ICON ALIASES (MongoDB, VS Code, REST API 등 보완)
  // ============================================================
  const ICON_ALIASES = {
    react: "SiReact",
    firebase: "SiFirebase",

    "node.js": "SiNodedotjs",
    nodejs: "SiNodedotjs",
    node: "SiNodedotjs",

    javascript: "SiJavascript",
    js: "SiJavascript",

    typescript: "SiTypescript",
    ts: "SiTypescript",

    html: "SiHtml5",
    html5: "SiHtml5",

    css: "SiCss3",
    css3: "SiCss3",

    tailwind: "SiTailwindcss",
    "tailwind css": "SiTailwindcss",
    tailwindcss: "SiTailwindcss",

    nextjs: "SiNextdotjs",
    "next.js": "SiNextdotjs",
    next: "SiNextdotjs",

    mongodb: "SiMongodb",
    mongo: "SiMongodb",
    "mongo db": "SiMongodb",

    express: "SiExpress",
    "express.js": "SiExpress",

    github: "SiGithub",
    git: "SiGit",
    gitlab: "SiGitlab",
    docker: "SiDocker",
    vercel: "SiVercel",
    netlify: "SiNetlify",
    npm: "SiNpm",
    yarn: "SiYarn",

    // VS Code 매핑 수정 (VscIcons의 VscCode 사용)
    vscode: "VscCode",
    "vs code": "VscCode",
    "visual studio code": "VscCode",
    visualstudiocode: "VscCode",
    vsccode: "VscCode",

    // REST API 매핑
    "rest api": "SiPostman",
    restapi: "SiPostman",
    api: "SiPostman",
    swagger: "SiSwagger",

    figma: "SiFigma",
    redux: "SiRedux",

    "react router": "SiReactrouter",
    reactrouter: "SiReactrouter",

    postman: "SiPostman",
    bootstrap: "SiBootstrap",
    sass: "SiSass",
    jquery: "SiJquery",
    python: "SiPython",
    java: "SiJava",
    php: "SiPhp",
    mysql: "SiMysql",

    postgres: "SiPostgresql",
    postgresql: "SiPostgresql",

    prisma: "SiPrisma",
    graphql: "SiGraphql",
    wordpress: "SiWordpress",
    linux: "SiLinux",
    windows: "SiWindows",
    android: "SiAndroid",
    canva: "SiCanva",
    notion: "SiNotion",
  };

  // ============================================================
  // NORMALIZE ICON NAME
  // ============================================================
  const normalizeIconName = (value) => {
    const trimmed = value?.trim();

    if (!trimmed) {
      return "";
    }

    // VscIcons에 존재하는 경우 (예: VscCode)
    if (VscIcons[trimmed]) {
      return trimmed;
    }

    // Simple Icons에 존재하는 경우
    if (SimpleIcons[trimmed]) {
      return trimmed;
    }

    // Lucide 아이콘에 존재하는 경우
    if (Icons[trimmed]) {
      return trimmed;
    }

    // 별칭(Alias) 확인 (소문자 변환 후 매칭)
    const alias = ICON_ALIASES[trimmed.toLowerCase()];

    if (alias) {
      return alias;
    }

    return trimmed;
  };

  // ============================================================
  // DYNAMIC ICON RENDERER COMPONENT FOR ADMIN
  // ============================================================
  const RenderIcon = ({ name, color }) => {
    if (!name) {
      return (
        <span
          className="text-lg font-bold"
          style={{ color: color || "#00d4ff" }}
        >
          {skillForm.name?.charAt(0)?.toUpperCase() || "S"}
        </span>
      );
    }

    const normalizedName = normalizeIconName(name);

    // VscIcons 우선 검색 -> SimpleIcons 검색 -> Lucide 검색 -> 기본 CodeXml 폴백
    const IconComponent =
      VscIcons[normalizedName] ||
      SimpleIcons[normalizedName] ||
      Icons[normalizedName] ||
      Icons.CodeXml;

    return (
      <IconComponent
        size={24}
        style={{
          color: color || "#00d4ff",
        }}
      />
    );
  };

  // ============================================================
  // SAFE ARRAY HANDLING
  // ============================================================
  const skillList = Array.isArray(items) ? items : [];

  // ============================================================
  // CATEGORY COUNTS
  // ============================================================
  const counts = {
    All: skillList.length,
    Frontend: skillList.filter((s) => s.category === "Frontend").length,
    Backend: skillList.filter((s) => s.category === "Backend").length,
    Tools: skillList.filter((s) => s.category === "Tools").length,
  };

  // ============================================================
  // FILTER SKILLS
  // ============================================================
  const filteredSkills =
    selectedCategory === "All"
      ? skillList
      : skillList.filter((item) => item.category === selectedCategory);

  if (activeTab !== "skills") {
    return null;
  }

  // ============================================================
  // MAIN UI
  // ============================================================
  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl text-white">
          Manage Skills
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Total uploaded skills summary across categories.
        </p>
      </div>

      {/* TOP SUMMARY COUNTER CARDS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div
          onClick={() => setSelectedCategory("All")}
          className={`cursor-pointer rounded-xl border p-4 shadow-lg transition-all ${
            selectedCategory === "All"
              ? "border-teal-500 bg-teal-950/30"
              : "border-gray-800 bg-gray-900 hover:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Skills
            </span>
            <Icons.Layers className="h-5 w-5 text-teal-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {counts.All}
          </p>
        </div>

        <div
          onClick={() => setSelectedCategory("Frontend")}
          className={`cursor-pointer rounded-xl border p-4 shadow-lg transition-all ${
            selectedCategory === "Frontend"
              ? "border-cyan-500 bg-cyan-950/30"
              : "border-gray-800 bg-gray-900 hover:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Frontend
            </span>
            <Icons.Layout className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {counts.Frontend}
          </p>
        </div>

        <div
          onClick={() => setSelectedCategory("Backend")}
          className={`cursor-pointer rounded-xl border p-4 shadow-lg transition-all ${
            selectedCategory === "Backend"
              ? "border-emerald-500 bg-emerald-950/30"
              : "border-gray-800 bg-gray-900 hover:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Backend
            </span>
            <Icons.Server className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {counts.Backend}
          </p>
        </div>

        <div
          onClick={() => setSelectedCategory("Tools")}
          className={`cursor-pointer rounded-xl border p-4 shadow-lg transition-all ${
            selectedCategory === "Tools"
              ? "border-purple-500 bg-purple-950/30"
              : "border-gray-800 bg-gray-900 hover:border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Tools
            </span>
            <Icons.Wrench className="h-5 w-5 text-purple-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">
            {counts.Tools}
          </p>
        </div>
      </div>

      {/* SKILL FORM */}
      <form
        onSubmit={handleSkillSubmit}
        className="space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-6 shadow-xl"
      >
        <h3 className="text-xl font-semibold text-teal-300">
          {editingId ? "Edit Skill" : "Add New Skill"}
        </h3>

        {/* NAME */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Skill Name
          </label>
          <input
            type="text"
            placeholder="e.g. React.js, MongoDB, VS Code, REST API"
            value={skillForm.name || ""}
            onChange={(e) =>
              setSkillForm({
                ...skillForm,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            value={skillForm.category || "Frontend"}
            onChange={(e) =>
              setSkillForm({
                ...skillForm,
                category: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Tools">Tools</option>
          </select>
        </div>

        {/* LEVEL */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-300">
              Skill Level
            </label>
            <span className="font-bold text-teal-400">
              {skillForm.level || 0}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skillForm.level || 0}
            onChange={(e) =>
              setSkillForm({
                ...skillForm,
                level: Number(e.target.value),
              })
            }
            className="w-full accent-teal-500 cursor-pointer"
          />
        </div>

        {/* COLOR & ORDER */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Skill Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={skillForm.color || "#00d4ff"}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    color: e.target.value,
                  })
                }
                className="h-11 w-14 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-1"
              />
              <input
                type="text"
                value={skillForm.color || ""}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    color: e.target.value,
                  })
                }
                placeholder="#00d4ff"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              value={skillForm.order ?? 0}
              onChange={(e) =>
                setSkillForm({
                  ...skillForm,
                  order: Number(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ICON */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Icon Name
          </label>
          <input
            type="text"
            placeholder="e.g. SiMongodb, VscCode, SiPostman"
            value={skillForm.icon || ""}
            onChange={(e) =>
              setSkillForm({
                ...skillForm,
                icon: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
          />

          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">
              Recommended Icon names:
            </p>
            <p className="text-xs text-teal-400">MongoDB → SiMongodb</p>
            <p className="text-xs text-teal-400">VS Code → VscCode (or vscode)</p>
            <p className="text-xs text-teal-400">REST API → SiPostman</p>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <p className="mb-3 text-xs uppercase tracking-wider text-gray-500 font-bold">
            Live Preview
          </p>
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${skillForm.color || "#00d4ff"}55`,
                backgroundColor: `${skillForm.color || "#00d4ff"}10`,
              }}
            >
              <RenderIcon
                name={skillForm.icon}
                color={skillForm.color || "#00d4ff"}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-white">
                  {skillForm.name || "Skill Name"}
                </span>
                <span
                  className="font-bold"
                  style={{
                    color: skillForm.color || "#00d4ff",
                  }}
                >
                  {skillForm.level || 0}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${skillForm.level || 0}%`,
                    backgroundColor: skillForm.color || "#00d4ff",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-500 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Skill"
              : "Save Skill"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* UPLOADED SKILLS LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
        <div className="flex flex-col gap-4 border-b border-gray-800 p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-teal-300">
            Uploaded Skills List ({filteredSkills.length})
          </h3>
          <button
            type="button"
            onClick={() => fetchData("skills")}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
          >
            Refresh
          </button>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 border-b border-gray-800 bg-gray-950/50 p-3 px-4 sm:px-6">
          {["All", "Frontend", "Backend", "Tools"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-gray-800/60 text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {cat} ({counts[cat] || 0})
            </button>
          ))}
        </div>

        {/* CONTENT LIST */}
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            Loading Skills...
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No skills found under{" "}
            <span className="text-teal-400">{selectedCategory}</span>.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredSkills.map((item) => {
              const color = item.color || "#00d4ff";
              const iconName = normalizeIconName(item.icon);

              return (
                <div
                  key={item._id || item.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 hover:bg-gray-800/40 transition"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${color}55`,
                        backgroundColor: `${color}10`,
                      }}
                    >
                      <RenderIcon name={iconName} color={color} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-teal-400 border border-gray-700">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-4 max-w-xs">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${item.level}%`,
                              backgroundColor: color,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-bold"
                          style={{ color }}
                        >
                          {item.level}%
                        </span>
                      </div>

                      <p className="mt-1 text-[11px] text-gray-500">
                        Icon:{" "}
                        <span className="text-gray-400">
                          {iconName || "Default"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-gray-800/60 pt-3 sm:border-0 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleEditSkill(item)}
                      disabled={loading}
                      className="rounded-lg bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20 transition"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteSkill(item._id || item.id)
                      }
                      disabled={loading}
                      className="rounded-lg bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}