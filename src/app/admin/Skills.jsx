"use client";

export default function Skills({ admin }) {
  const {
    activeTab,
    editingId,
    fetchData,
    handleDeleteSkill,
    handleEditSkill,
    handleSkillSubmit,
    items,
    loading,
    resetForm,
    setSkillForm,
    skillForm,
  } = admin;

  return (
    <>
      {/* =====================================================
          SKILLS
      ====================================================== */}

      {activeTab === "skills" && (
        <>
          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
            Manage Skills
          </h2>

          {/* SKILL FORM */}

          <form
            onSubmit={handleSkillSubmit}
            className="mb-6 space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:mb-8 sm:p-6"
          >
            <h3 className="text-2xl font-semibold text-teal-300">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h3>

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Skill Name
              </label>

              <input
                type="text"
                placeholder="React.js"
                value={skillForm.name}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Category
              </label>

              <select
                value={skillForm.category}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
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
                  {skillForm.level}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={skillForm.level}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    level: Number(e.target.value),
                  })
                }
                className="w-full accent-teal-500"
              />

              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* COLOR + ORDER */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Skill Color
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <input
                    type="color"
                    value={skillForm.color || "#00d4ff"}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        color: e.target.value,
                      })
                    }
                    className="h-12 w-14 cursor-pointer rounded-lg border border-gray-700 bg-gray-800"
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
                    className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
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
                  placeholder="0"
                  value={skillForm.order}
                  onChange={(e) =>
                    setSkillForm({
                      ...skillForm,
                      order: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                />

                <p className="mt-1 text-xs text-gray-500">
                  ছোট number আগে দেখাবে।
                </p>
              </div>
            </div>

            {/* ICON */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Icon Name
              </label>

              <input
                type="text"
                placeholder="Atom"
                value={skillForm.icon}
                onChange={(e) =>
                  setSkillForm({
                    ...skillForm,
                    icon: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
              />

              <p className="mt-2 text-xs text-gray-500">
                Example: Atom, Server, Database, Flame, Palette, Box, Zap,
                GitBranch, CodeXml, Layers, Layout, ShieldCheck
              </p>
            </div>

            {/* PREVIEW */}

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
              <p className="mb-4 text-xs uppercase tracking-wider text-gray-500">
                Skill Preview
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl border"
                  style={{
                    color: skillForm.color || "#00d4ff",
                    borderColor: `${skillForm.color || "#00d4ff"}55`,
                    backgroundColor: `${skillForm.color || "#00d4ff"}10`,
                  }}
                >
                  <span className="text-lg font-bold">
                    {skillForm.name
                      ? skillForm.name.charAt(0).toUpperCase()
                      : "S"}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex justify-between">
                    <span className="font-semibold">
                      {skillForm.name || "Skill Name"}
                    </span>

                    <span
                      style={{
                        color: skillForm.color || "#00d4ff",
                      }}
                      className="font-bold"
                    >
                      {skillForm.level}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${skillForm.level}%`,
                        background: `linear-gradient(90deg, ${
                          skillForm.color || "#00d4ff"
                        }, ${skillForm.color || "#00d4ff"}aa)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-5 py-3 font-semibold transition sm:w-auto ${
                  loading
                    ? "cursor-not-allowed bg-gray-600"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
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
                  className="rounded-lg bg-gray-700 px-6 py-3 font-semibold transition hover:bg-gray-600"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* SKILLS LIST */}

          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
            <div className="flex flex-col gap-3 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-300">
                  Skills List
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your Frontend, Backend and Tools skills.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fetchData("skills")}
                disabled={loading}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading Skills...
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No skills found.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {items.map((item) => {
                  const color = item.color || "#00d4ff";

                  const level = Math.min(
                    Math.max(Number(item.level) || 0, 0),
                    100
                  );

                  return (
                    <div
                      key={item._id}
                      className="p-4 transition hover:bg-gray-800/40 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
                        {/* ICON */}

                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                          style={{
                            color,
                            borderColor: `${color}55`,
                            backgroundColor: `${color}10`,
                          }}
                        >
                          <span className="text-lg font-bold">
                            {item.name?.charAt(0)?.toUpperCase() || "S"}
                          </span>
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <h4 className="text-lg font-bold text-white">
                              {item.name}
                            </h4>

                            <span
                              className="rounded-full border px-2.5 py-1 text-xs"
                              style={{
                                color,
                                borderColor: `${color}44`,
                                backgroundColor: `${color}10`,
                              }}
                            >
                              {item.category}
                            </span>

                            {item.icon && (
                              <span className="text-xs text-gray-500">
                                Icon: {item.icon}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${level}%`,
                                    background: `linear-gradient(90deg, ${color}, ${color}99)`,
                                  }}
                                />
                              </div>
                            </div>

                            <span
                              className="w-12 text-right text-sm font-bold"
                              style={{
                                color,
                              }}
                            >
                              {level}%
                            </span>
                          </div>
                        </div>

                        {/* ORDER */}

                        <div className="min-w-[70px] text-center">
                          <span className="block text-xs text-gray-500">
                            Order
                          </span>

                          <span className="font-semibold text-white">
                            {item.order ?? 0}
                          </span>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleEditSkill(item)}
                            disabled={loading}
                            className="rounded-lg px-4 py-2 font-medium text-cyan-400 transition hover:bg-cyan-400/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(item._id)}
                            disabled={loading}
                            className="rounded-lg px-4 py-2 font-medium text-red-400 transition hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}