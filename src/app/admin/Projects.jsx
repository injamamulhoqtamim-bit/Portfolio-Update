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

  // Total projects count
  const totalProjects = Array.isArray(items) ? items.length : 0;

  // Get last upload/updated date
  const getLastUpdatedDate = () => {
    if (!Array.isArray(items) || items.length === 0) return "N/A";
    
    // items এর প্রথম অথবা শেষ এলিমেন্ট থেকে সাম্প্রতিক তারিখ নেওয়ার নিয়ম
    const dates = items
      .map((item) => new Date(item.createdAt || item.updatedAt || item.date))
      .filter((d) => !isNaN(d));

    if (dates.length === 0) return "N/A";

    const latestDate = new Date(Math.max(...dates));
    return latestDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* =====================================================
          PROJECTS
      ====================================================== */}

      {activeTab === "projects" && (
        <section>
          {/* =================================================
              HEADER & ANALYTICS CARDS
          ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">Manage Projects</h2>
          </div>

          {/* STATS CARDS */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* TOTAL PROJECTS */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm font-medium text-gray-400">Total Projects</p>
              <p className="mt-2 text-3xl font-bold text-white">{totalProjects}</p>
            </div>

            {/* LAST UPLOAD DATE */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm font-medium text-gray-400">Last Uploaded</p>
              <p className="mt-2 text-3xl font-bold text-teal-400">
                {getLastUpdatedDate()}
              </p>
            </div>
          </div>

          {/* =================================================
              PROJECT FORM
          ================================================== */}

          <form
            onSubmit={handleProjectSubmit}
            className="mb-6 space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:mb-8 sm:p-6"
          >
            <h3 className="text-2xl font-semibold text-teal-300">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
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
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Project Image
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                onChange={handleImageChange}
                className="block min-w-0 w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-600 file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG, WEBP অথবা GIF. Maximum 5MB.
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
                      className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>

                  {imageFile && (
                    <p className="mt-2 text-xs text-gray-400">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* SHORT DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Short Description
              </label>

              <textarea
                placeholder="A short description of the project..."
                value={projectForm.shortDescription || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    shortDescription: e.target.value,
                  })
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            {/* LONG DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Long Description
              </label>

              <textarea
                placeholder="Write the complete project description..."
                value={projectForm.longDescription || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    longDescription: e.target.value,
                  })
                }
                rows={6}
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* TECH STACK */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Technologies
              </label>

              <input
                type="text"
                placeholder="React, Next.js, Tailwind CSS, MongoDB"
                value={projectForm.techStack || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    techStack: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* URL GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* LIVE URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Live Website URL
                </label>

                <input
                  type="url"
                  placeholder="https://example.com"
                  value={projectForm.liveLink || ""}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      liveLink: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* GITHUB URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  GitHub URL
                </label>

                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={projectForm.githubLink || ""}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      githubLink: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* CHALLENGES */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Challenges
              </label>

              <textarea
                placeholder={`Responsive design\nAuthentication system\nDatabase integration`}
                value={projectForm.challenges || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    challenges: e.target.value,
                  })
                }
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* FUTURE IMPROVEMENTS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Future Improvements
              </label>

              <textarea
                placeholder={`Add payment system\nImprove performance\nAdd mobile application`}
                value={projectForm.futureImprovements || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    futureImprovements: e.target.value,
                  })
                }
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 focus:border-teal-500 focus:outline-none"
              />
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
                  ? "Update Project"
                  : "Save Project"}
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

          {/* =================================================
              PROJECT LIST
          ================================================== */}

          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
            {/* LIST HEADER */}

            <div className="flex flex-col gap-3 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <h3 className="text-xl font-semibold text-teal-300">
                Projects List
              </h3>

              <button
                type="button"
                onClick={() => fetchData("projects")}
                disabled={loading}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {/* LOADING / EMPTY / LIST */}

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading Projects...
              </div>
            ) : !Array.isArray(items) || items.length === 0 ? (
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
                    <div className="flex flex-col gap-6 lg:flex-row">
                      {/* PROJECT IMAGE */}

                      {(item.image || item.imageUrl) && (
                        <img
                          src={item.image || item.imageUrl}
                          alt={item.title || "Project"}
                          className="h-40 w-full rounded-xl border border-gray-700 bg-white p-2 object-contain sm:h-44 lg:h-36 lg:w-56"
                        />
                      )}

                      {/* PROJECT CONTENT */}

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xl font-bold text-white">
                          {item.title}
                        </h4>

                        {/* DESCRIPTION */}

                        <p className="mt-2 text-sm text-gray-400">
                          {item.shortDescription ||
                            item.description ||
                            item.desc ||
                            "No description"}
                        </p>

                        {/* TECH STACK */}

                        {item.techStack || item.tech ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {(
                              Array.isArray(item.techStack || item.tech)
                                ? item.techStack || item.tech
                                : String(
                                    item.techStack || item.tech
                                  ).split(",")
                            ).map((tech, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400"
                              >
                                {String(tech).trim()}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {/* PROJECT LINKS */}

                        <div className="mt-4 flex flex-wrap gap-4">
                          {(item.liveLink || item.live) && (
                            <a
                              href={item.liveLink || item.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-cyan-400 hover:text-cyan-300"
                            >
                              Live Website ↗
                            </a>
                          )}

                          {(item.githubLink || item.code) && (
                            <a
                              href={item.githubLink || item.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-purple-400 hover:text-purple-300"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>

                        {/* ACTIONS */}

                        <div className="mt-5 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handleEditProject(item)}
                            disabled={loading}
                            className="rounded-lg px-4 py-2 font-medium text-cyan-400 transition hover:bg-cyan-400/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProject(item._id)}
                            disabled={loading}
                            className="rounded-lg px-4 py-2 font-medium text-red-400 transition hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
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