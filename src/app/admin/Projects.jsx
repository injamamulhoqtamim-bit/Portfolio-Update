"use client";

export default function Projects({ admin }) {
  const {
    activeTab,
    editingId,
    fetchData,
    handleDeleteProject,
    handleEditProject,
    handleImageChange,
    handleProjectSubmit,
    handleRemoveImage,
    imageFile,
    imagePreview,
    items,
    loading,
    projectForm,
    resetForm,
    setProjectForm,
  } = admin;

  return (
    <>
      {/* =====================================================
          PROJECTS
      ====================================================== */}

      {activeTab === "projects" && (
        <section>
          {/* =================================================
              HEADER
          ================================================== */}

          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
            Manage Projects
          </h2>

          {/* =================================================
              PROJECT FORM
          ================================================== */}

          <form
            onSubmit={handleProjectSubmit}
            className="mb-6 space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:mb-8 sm:p-6"
          >
            <h3 className="text-2xl font-semibold text-teal-300">
              {editingId
                ? "Edit Project"
                : "Add New Project"}
            </h3>

            {/* =================================================
                TITLE
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title
              </label>

              <input
                type="text"
                placeholder="Portfolio Website"
                value={projectForm.title || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    title: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* =================================================
                IMAGE
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Image
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                onChange={handleImageChange}
                className="block min-w-0 w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer bg-gray-800 border border-gray-700 rounded-lg p-2"
              />

              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG, WEBP অথবা GIF.
                Maximum 5MB.
              </p>

              {imagePreview && (
                <div className="mt-4">
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Project Preview"
                      className="h-48 w-full rounded-xl border border-gray-700 bg-white p-2 object-contain sm:h-56"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg"
                    >
                      ✕
                    </button>
                  </div>

                  {imageFile && (
                    <p className="text-xs text-gray-400 mt-2">
                      Selected:{" "}
                      {imageFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                SHORT DESCRIPTION
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Description
              </label>

              <textarea
                placeholder="A short description of the project..."
                value={
                  projectForm.shortDescription || ""
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    shortDescription:
                      e.target.value,
                  })
                }
                rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                required
              />
            </div>

            {/* =================================================
                LONG DESCRIPTION
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Long Description
              </label>

              <textarea
                placeholder="Write the complete project description..."
                value={
                  projectForm.longDescription || ""
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    longDescription:
                      e.target.value,
                  })
                }
                rows={6}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            {/* =================================================
                TECH STACK
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies
              </label>

              <input
                type="text"
                placeholder="React, Next.js, Tailwind CSS, MongoDB"
                value={projectForm.techStack || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    techStack:
                      e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* =================================================
                URL GRID
            ================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* LIVE URL */}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Live Website URL
                </label>

                <input
                  type="url"
                  placeholder="https://example.com"
                  value={projectForm.liveLink || ""}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      liveLink:
                        e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* GITHUB URL */}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL
                </label>

                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={
                    projectForm.githubLink || ""
                  }
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      githubLink:
                        e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* =================================================
                CHALLENGES
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Challenges
              </label>

              <textarea
                placeholder={`Responsive design
Authentication system
Database integration`}
                value={projectForm.challenges || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    challenges:
                      e.target.value,
                  })
                }
                rows={5}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            {/* =================================================
                FUTURE IMPROVEMENTS
            ================================================== */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Future Improvements
              </label>

              <textarea
                placeholder={`Add payment system
Improve performance
Add mobile application`}
                value={
                  projectForm.futureImprovements ||
                  ""
                }
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    futureImprovements:
                      e.target.value,
                  })
                }
                rows={5}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-5 py-3 font-semibold transition sm:w-auto ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Save Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* =================================================
              PROJECT LIST
          ================================================== */}

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            {/* LIST HEADER */}

            <div className="flex flex-col gap-3 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <h3 className="text-xl font-semibold text-teal-300">
                Projects List
              </h3>

              <button
                type="button"
                onClick={() =>
                  fetchData("projects")
                }
                disabled={loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            </div>

            {/* =================================================
                LOADING / EMPTY / LIST
            ================================================== */}

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading Projects...
              </div>
            ) : !Array.isArray(items) ||
              items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No projects found.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 transition hover:bg-gray-800/40 sm:p-6"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* PROJECT IMAGE */}

                      {(item.image ||
                        item.imageUrl) && (
                        <img
                          src={
                            item.image ||
                            item.imageUrl
                          }
                          alt={
                            item.title ||
                            "Project"
                          }
                          className="h-40 w-full rounded-xl border border-gray-700 bg-white p-2 object-contain sm:h-44 lg:h-36 lg:w-56"
                        />
                      )}

                      {/* PROJECT CONTENT */}

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xl font-bold text-white">
                          {item.title}
                        </h4>

                        {/* DESCRIPTION */}

                        <p className="text-gray-400 text-sm mt-2">
                          {item.shortDescription ||
                            item.description ||
                            item.desc ||
                            "No description"}
                        </p>

                        {/* =================================================
                            TECH STACK
                        ================================================== */}

                        {item.techStack ||
                        item.tech ? (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {(
                              Array.isArray(
                                item.techStack ||
                                  item.tech
                              )
                                ? item.techStack ||
                                  item.tech
                                : String(
                                    item.techStack ||
                                      item.tech
                                  ).split(",")
                            ).map(
                              (
                                tech,
                                index
                              ) => (
                                <span
                                  key={
                                    index
                                  }
                                  className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs"
                                >
                                  {String(
                                    tech
                                  ).trim()}
                                </span>
                              )
                            )}
                          </div>
                        ) : null}

                        {/* =================================================
                            PROJECT LINKS
                        ================================================== */}

                        <div className="flex flex-wrap gap-4 mt-4">
                          {/* LIVE */}

                          {(item.liveLink ||
                            item.live) && (
                            <a
                              href={
                                item.liveLink ||
                                item.live
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                              Live Website ↗
                            </a>
                          )}

                          {/* GITHUB */}

                          {(item.githubLink ||
                            item.code) && (
                            <a
                              href={
                                item.githubLink ||
                                item.code
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 text-sm"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>

                        {/* =================================================
                            ACTIONS
                        ================================================== */}

                        <div className="mt-5 flex flex-wrap gap-3">
                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEditProject(
                                item
                              )
                            }
                            disabled={loading}
                            className="px-4 py-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProject(
                                item._id
                              )
                            }
                            disabled={loading}
                            className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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