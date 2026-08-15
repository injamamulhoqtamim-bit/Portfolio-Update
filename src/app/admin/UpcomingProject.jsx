"use client";

export default function UpcomingProject({ admin }) {
  const {
    activeTab,
    addUpcomingFeature,
    addUpcomingTech,
    editingId,
    featureInput,
    fetchData,
    handleDeleteUpcomingProject,
    handleEditUpcomingProject,
    handleUpcomingProjectSubmit,
    items,
    loading,
    removeUpcomingFeature,
    removeUpcomingTech,
    resetForm,
    setFeatureInput,
    setTechInput,
    setUpcomingProjectForm,
    techInput,
    upcomingProjectForm,
  } = admin;

  return (
    <>
      {/* =====================================================
          UPCOMING PROJECT
      ====================================================== */}

      {activeTab === "upcomingProject" && (
        <section>
          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-teal-400 text-xs uppercase tracking-[2px] font-semibold">
                Portfolio Management
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Upcoming Project
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Add, edit and manage your upcoming project.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchData("upcomingProject")}
              disabled={loading}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm transition disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleUpcomingProjectSubmit}
            className="space-y-6"
          >
            {/* BASIC INFORMATION */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-7">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingId
                  ? "Edit Upcoming Project"
                  : "Add Upcoming Project"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* TITLE */}

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Project Title *
                  </label>

                  <input
                    type="text"
                    value={upcomingProjectForm.title}
                    onChange={(e) =>
                      setUpcomingProjectForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Ghure Dekho"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                    required
                  />
                </div>

                {/* TAGLINE */}

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Tagline
                  </label>

                  <input
                    type="text"
                    value={upcomingProjectForm.tagline}
                    onChange={(e) =>
                      setUpcomingProjectForm((prev) => ({
                        ...prev,
                        tagline: e.target.value,
                      }))
                    }
                    placeholder="Explore the Beauty of Bangladesh"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-5">
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={upcomingProjectForm.desc}
                  onChange={(e) =>
                    setUpcomingProjectForm((prev) => ({
                      ...prev,
                      desc: e.target.value,
                    }))
                  }
                  placeholder="Write project description..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500 resize-none"
                />
              </div>

              {/* IMAGE */}

              <div className="mt-5">
                <label className="block text-sm text-gray-300 mb-2">
                  Project Image
                </label>

                <input
                  type="text"
                  value={upcomingProjectForm.image}
                  onChange={(e) =>
                    setUpcomingProjectForm((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="/ghurobangla.png"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Example: /ghurobangla.png
                </p>

                {upcomingProjectForm.image && (
                  <div className="mt-4 max-w-md">
                    <img
                      src={upcomingProjectForm.image}
                      alt={
                        upcomingProjectForm.title ||
                        "Upcoming Project"
                      }
                      className="h-48 w-full rounded-xl border border-gray-700 bg-white p-2 object-contain sm:h-56"
                    />
                  </div>
                )}
              </div>

              {/* ORDER + ACTIVE */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={upcomingProjectForm.order}
                    onChange={(e) =>
                      setUpcomingProjectForm((prev) => ({
                        ...prev,
                        order:
                          Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={upcomingProjectForm.isActive}
                      onChange={(e) =>
                        setUpcomingProjectForm((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 accent-teal-500"
                    />

                    <span>Show this project</span>
                  </label>
                </div>
              </div>
            </div>

            {/* KEY HIGHLIGHTS */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-7">
              <h3 className="text-lg font-bold text-white mb-5">
                Key Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={featureInput.name}
                  onChange={(e) =>
                    setFeatureInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Tour Packages"
                  className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                />

                <input
                  type="text"
                  value={featureInput.icon}
                  onChange={(e) =>
                    setFeatureInput((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }))
                  }
                  placeholder="Route"
                  className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="button"
                onClick={addUpcomingFeature}
                className="mt-4 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
              >
                + Add Highlight
              </button>

              <div className="mt-5 space-y-3">
                {upcomingProjectForm.features.map(
                  (feature, index) => (
                    <div
                      key={`${feature.name}-${index}`}
                      className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {feature.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Icon: {feature.icon}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeUpcomingFeature(index)
                        }
                        className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}

                {upcomingProjectForm.features.length ===
                  0 && (
                  <p className="text-sm text-gray-500">
                    No highlights added yet.
                  </p>
                )}
              </div>
            </div>

            {/* TECH STACK */}

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-7">
              <h3 className="text-lg font-bold text-white mb-5">
                Planned Tech Stack
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={techInput.name}
                  onChange={(e) =>
                    setTechInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="React.js"
                  className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                />

                <input
                  type="text"
                  value={techInput.icon}
                  onChange={(e) =>
                    setTechInput((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }))
                  }
                  placeholder="FileCode2"
                  className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="button"
                onClick={addUpcomingTech}
                className="mt-4 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
              >
                + Add Tech
              </button>

              <div className="mt-5 space-y-3">
                {upcomingProjectForm.tech.map(
                  (item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Icon: {item.icon}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeUpcomingTech(index)
                        }
                        className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}

                {upcomingProjectForm.tech.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No technologies added yet.
                  </p>
                )}
              </div>
            </div>

            {/* SUBMIT */}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Upcoming Project"
                  : "Add Upcoming Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:bg-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* UPCOMING PROJECT LIST */}

          <div className="mt-8 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="text-xl font-semibold text-teal-300">
                  Upcoming Projects List
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage saved upcoming projects.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  fetchData("upcomingProject")
                }
                disabled={loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading Upcoming Projects...
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No upcoming projects found.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {items.map((project) => (
                  <div
                    key={project._id}
                    className="p-4 transition hover:bg-gray-800/40 sm:p-6"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* IMAGE */}

                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-40 w-full rounded-xl border border-gray-700 bg-white p-2 object-contain sm:h-44 lg:h-36 lg:w-56"
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        {/* TITLE + STATUS */}

                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h4 className="text-xl font-bold text-white">
                              {project.title}
                            </h4>

                            {project.tagline && (
                              <p className="text-teal-400 text-sm mt-1">
                                {project.tagline}
                              </p>
                            )}
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.isActive !== false
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {project.isActive !== false
                              ? "Active"
                              : "Hidden"}
                          </span>
                        </div>

                        {/* DESCRIPTION */}

                        <p className="text-gray-400 text-sm mt-3">
                          {project.desc || "No description"}
                        </p>

                        {/* FEATURES */}

                        {(project.features || []).length >
                          0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.features.map(
                              (feature, index) => (
                                <span
                                  key={`${feature.name}-${index}`}
                                  className="px-2.5 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-xs"
                                >
                                  {feature.name}
                                </span>
                              )
                            )}
                          </div>
                        )}

                        {/* TECH */}

                        {(project.tech || []).length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.tech.map(
                              (tech, index) => (
                                <span
                                  key={`${tech.name}-${index}`}
                                  className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs"
                                >
                                  {tech.name}
                                </span>
                              )
                            )}
                          </div>
                        )}

                        {/* ORDER */}

                        <p className="text-xs text-gray-500 mt-4">
                          Order: {project.order ?? 0}
                        </p>

                        {/* ACTIONS */}

                        <div className="mt-5 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleEditUpcomingProject(
                                project
                              )
                            }
                            disabled={loading}
                            className="px-4 py-2 text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 rounded-lg transition font-medium disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteUpcomingProject(
                                project._id
                              )
                            }
                            disabled={loading}
                            className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition font-medium disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}