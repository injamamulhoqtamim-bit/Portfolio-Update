"use client";

export default function Education({ admin }) {
  const {
    activeTab,
    editingId,
    educationForm,
    fetchData,
    handleDeleteEducation,
    handleEditEducation,
    handleEducationSubmit,
    items,
    loading,
    resetForm,
    setEducationForm,
  } = admin;

  // Bullet point যুক্ত করার ফাংশন
  const handleAddPoint = () => {
    const currentPoints = educationForm.points || [];
    setEducationForm({
      ...educationForm,
      points: [...currentPoints, ""],
    });
  };

  // Bullet point চেঞ্জ করার ফাংশন
  const handlePointChange = (index, value) => {
    const updatedPoints = [...(educationForm.points || [])];
    updatedPoints[index] = value;
    setEducationForm({
      ...educationForm,
      points: updatedPoints,
    });
  };

  // Bullet point রিমুভ করার ফাংশন
  const handleRemovePoint = (index) => {
    const updatedPoints = (educationForm.points || []).filter(
      (_, i) => i !== index
    );
    setEducationForm({
      ...educationForm,
      points: updatedPoints,
    });
  };

  return (
    <>
      {/* =====================================================
          EDUCATION & EXPERIENCE DATA
      ====================================================== */}

      {activeTab === "education" && (
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* ================= HEADER ================= */}
          <h2 className="mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl">
            Manage Education & Experience
          </h2>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleEducationSubmit}
            className="mb-6 space-y-4 sm:space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-3.5 sm:p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-teal-300 sm:text-2xl">
              {editingId ? "Edit Item" : "Add New Item"}
            </h3>

            {/* TYPE (Education / Experience / Course / Research) */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Type
              </label>
              <select
                value={educationForm.type || "education"}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    type: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
              >
                <option value="education">Education (Academic)</option>
                <option value="course">Education (Course / Training)</option>
                <option value="experience">Experience (Job / Internship)</option>
                <option value="research">Experience (Research / Project)</option>
              </select>
            </div>

            {/* TITLE / DEGREE */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Title / Degree
              </label>
              <input
                type="text"
                placeholder="B.Sc. in CSE / Frontend Developer / Web Development Course"
                value={educationForm.title || educationForm.degree || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    title: e.target.value,
                    degree: e.target.value, // Backward compatibility
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
                required
              />
            </div>

            {/* INSTITUTION / COMPANY */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Institution / Company
              </label>
              <input
                type="text"
                placeholder="Southeast University / Zyntrix Lab / Programming Hero"
                value={educationForm.institution || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    institution: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
                required
              />
            </div>

            {/* PASSING YEAR / DURATION */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Year / Duration
              </label>
              <input
                type="text"
                placeholder="2022 - 2026 or 2025 - Present"
                value={educationForm.passingYear || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    passingYear: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
                required
              />
            </div>

            {/* EXTERNAL LINK (OPTIONAL) */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                External Link (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={educationForm.link || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    link: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                placeholder="Brief summary of your learning or responsibilities..."
                value={educationForm.description || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-2.5 sm:p-3 text-sm text-white focus:border-teal-500 focus:outline-none transition"
              />
            </div>

            {/* BULLET POINTS (KEY HIGHLIGHTS) */}
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-300">
                  Key Highlights / Bullet Points (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleAddPoint}
                  className="rounded bg-teal-600/20 px-2.5 py-1 text-xs font-semibold text-teal-300 transition hover:bg-teal-600/40 active:scale-95"
                >
                  + Add Point
                </button>
              </div>

              {(educationForm.points || []).map((point, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Highlight #${index + 1}`}
                    value={point}
                    onChange={(e) => handlePointChange(index, e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-xs sm:text-sm text-white focus:border-teal-500 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePoint(index)}
                    className="shrink-0 rounded bg-red-500/20 px-2.5 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/40 active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* FORM BUTTONS */}
            <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-5 py-2.5 text-sm sm:text-base font-semibold text-white transition active:scale-95 sm:w-auto ${
                  loading
                    ? "cursor-not-allowed bg-gray-600"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Item"
                  : "Save Item"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-lg bg-gray-700 px-6 py-2.5 text-sm sm:text-base font-semibold text-white transition hover:bg-gray-600 active:scale-95 sm:w-auto"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* ================= LIST TABLE ================= */}
          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-xl">
            <div className="flex flex-row items-center justify-between border-b border-gray-800 p-4 sm:p-6">
              <h3 className="text-base font-semibold text-teal-300 sm:text-xl">
                All Records
              </h3>

              <button
                type="button"
                onClick={() => fetchData("education")}
                disabled={loading}
                className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-white transition hover:bg-gray-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm sm:text-base text-gray-400">
                Loading Data...
              </div>
            ) : !Array.isArray(items) || items.length === 0 ? (
              <div className="p-8 text-center text-sm sm:text-base text-gray-500">
                No data found.
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="p-3 sm:p-4">Type</th>
                      <th className="p-3 sm:p-4">Title / Degree</th>
                      <th className="p-3 sm:p-4">Institution</th>
                      <th className="p-3 sm:p-4">Year</th>
                      <th className="p-3 sm:p-4 text-right sm:text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-800/60">
                    {items.map((item) => (
                      <tr
                        key={item._id}
                        className="transition hover:bg-gray-800/40"
                      >
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          <span className="inline-block rounded bg-teal-500/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold capitalize text-teal-400">
                            {item.type || "education"}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 font-medium text-white max-w-[180px] sm:max-w-none truncate sm:whitespace-normal">
                          {item.title || item.degree}
                        </td>
                        <td className="p-3 sm:p-4 text-cyan-400 max-w-[150px] sm:max-w-none truncate sm:whitespace-normal">
                          {item.institution}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-300 whitespace-nowrap">
                          {item.passingYear}
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditEducation(item)}
                              disabled={loading}
                              className="rounded px-2 py-1 text-xs sm:px-3 sm:py-1.5 font-medium text-cyan-400 transition hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEducation(item._id)}
                              disabled={loading}
                              className="rounded px-2 py-1 text-xs sm:px-3 sm:py-1.5 font-medium text-red-400 transition hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}