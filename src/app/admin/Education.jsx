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

  return (
    <>
      {/* =====================================================
          EDUCATION DATA
      ====================================================== */}

      {activeTab === "education" && (
        <section>
          {/* =================================================
              HEADER
          ================================================== */}

          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
            Manage Education
          </h2>

          {/* =================================================
              EDUCATION FORM
          ================================================== */}

          <form
            onSubmit={handleEducationSubmit}
            className="mb-6 space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:mb-8 sm:p-6"
          >
            <h3 className="text-2xl font-semibold text-teal-300">
              {editingId
                ? "Edit Education"
                : "Add New Education"}
            </h3>

            {/* DEGREE */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Degree
              </label>

              <input
                type="text"
                placeholder="Bachelor of Science in Computer Science"
                value={educationForm.degree || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    degree: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* INSTITUTION */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Institution
              </label>

              <input
                type="text"
                placeholder="Southeast University"
                value={educationForm.institution || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    institution: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* PASSING YEAR */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Passing Year
              </label>

              <input
                type="text"
                placeholder="2022 - 2026"
                value={educationForm.passingYear || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    passingYear: e.target.value,
                  })
                }
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>

              <textarea
                placeholder="Studying core computer science concepts..."
                value={educationForm.description || ""}
                onChange={(e) =>
                  setEducationForm({
                    ...educationForm,
                    description: e.target.value,
                  })
                }
                rows={5}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                required
              />
            </div>

            {/* FORM BUTTONS */}

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
                  ? "Update Education"
                  : "Save Education"}
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
              EDUCATION LIST
          ================================================== */}

          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            {/* LIST HEADER */}

            <div className="flex flex-col gap-3 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <h3 className="text-xl font-semibold text-teal-300">
                Education List
              </h3>

              <button
                type="button"
                onClick={() => fetchData("education")}
                disabled={loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh
              </button>
            </div>

            {/* LOADING */}

            {loading ? (
              <div className="p-8 text-center text-gray-400">
                Loading Education...
              </div>
            ) : !Array.isArray(items) || items.length === 0 ? (
              /* EMPTY */

              <div className="p-8 text-center text-gray-500">
                No education data found.
              </div>
            ) : (
              /* TABLE */

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="p-4">
                        Degree
                      </th>

                      <th className="p-4">
                        Institution
                      </th>

                      <th className="p-4">
                        Passing Year
                      </th>

                      <th className="p-4">
                        Description
                      </th>

                      <th className="p-4">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                      >
                        {/* DEGREE */}

                        <td className="p-4 font-medium text-white">
                          {item.degree}
                        </td>

                        {/* INSTITUTION */}

                        <td className="p-4 text-cyan-400">
                          {item.institution}
                        </td>

                        {/* PASSING YEAR */}

                        <td className="p-4 text-gray-300">
                          {item.passingYear}
                        </td>

                        {/* DESCRIPTION */}

                        <td className="p-4 text-gray-400 max-w-md">
                          <div className="line-clamp-3">
                            {item.description}
                          </div>
                        </td>

                        {/* ACTIONS */}

                        <td className="p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            {/* EDIT */}

                            <button
                              type="button"
                              onClick={() =>
                                handleEditEducation(item)
                              }
                              disabled={loading}
                              className="px-3 py-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Edit
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteEducation(
                                  item._id
                                )
                              }
                              disabled={loading}
                              className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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