"use client";

import React from "react";
import * as Icons from "lucide-react";

export default function Skills({ admin }) {
  const {
    activeTab,
    editingId,
    fetchData,
    handleDeleteSkill,
    handleEditSkill,
    handleSkillSubmit,
    items = [], // Default array handling
    loading,
    resetForm,
    setSkillForm,
    skillForm = {},
  } = admin;

  // 🔹 Dynamic Icon Renderer Component
  const RenderIcon = ({ name, color }) => {
    if (!name) return <span className="text-lg font-bold">{skillForm.name?.charAt(0)?.toUpperCase() || "S"}</span>;
    const IconComponent = Icons[name];
    return IconComponent ? <IconComponent size={24} style={{ color }} /> : <Icons.CodeXml size={24} style={{ color }} />;
  };

  // 🔹 Filter Items safely to guarantee array rendering
  const skillList = Array.isArray(items) ? items : [];

  if (activeTab !== "skills") return null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold sm:text-3xl text-white">Manage Skills</h2>

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
            placeholder="e.g. React.js"
            value={skillForm.name || ""}
            onChange={(e) =>
              setSkillForm({ ...skillForm, name: e.target.value })
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
              setSkillForm({ ...skillForm, category: e.target.value })
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
              setSkillForm({ ...skillForm, level: Number(e.target.value) })
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
                  setSkillForm({ ...skillForm, color: e.target.value })
                }
                className="h-11 w-14 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-1"
              />
              <input
                type="text"
                value={skillForm.color || ""}
                onChange={(e) =>
                  setSkillForm({ ...skillForm, color: e.target.value })
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
                setSkillForm({ ...skillForm, order: Number(e.target.value) })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ICON */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Icon Name (Lucide React)
          </label>
          <input
            type="text"
            placeholder="e.g. Atom, Server, Database, CodeXml"
            value={skillForm.icon || ""}
            onChange={(e) =>
              setSkillForm({ ...skillForm, icon: e.target.value })
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* PREVIEW */}
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
              <RenderIcon name={skillForm.icon} color={skillForm.color || "#00d4ff"} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-white">{skillForm.name || "Skill Name"}</span>
                <span className="font-bold" style={{ color: skillForm.color || "#00d4ff" }}>
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
            {loading ? "Saving..." : editingId ? "Update Skill" : "Save Skill"}
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

      {/* SKILLS LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-800 p-4 sm:p-6">
          <h3 className="text-xl font-semibold text-teal-300">Skills List</h3>
          <button
            type="button"
            onClick={() => fetchData("skills")}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading Skills...</div>
        ) : skillList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No skills found.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {skillList.map((item) => {
              const color = item.color || "#00d4ff";
              return (
                <div key={item._id || item.id} className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-800/40">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${color}55`,
                        backgroundColor: `${color}10`,
                      }}
                    >
                      <RenderIcon name={item.icon} color={color} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-teal-400 border border-gray-700">
                          {item.category}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 max-w-xs">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full"
                            style={{ width: `${item.level}%`, backgroundColor: color }}
                          />
                        </div>
                        <span className="text-xs font-bold" style={{ color }}>
                          {item.level}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSkill(item)}
                      disabled={loading}
                      className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(item._id || item.id)}
                      disabled={loading}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/20"
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