"use client";

export default function Resume({ admin }) {
  const {
    activeTab,
    handleDeleteResume,
    handleResumeFileChange,
    handleResumeUpload,
    resumeFile,
    resumeInfo,
    resumeLoading,
    resumeMessage,
  } = admin;

  return (
    <>
      {/* =====================================================
          RESUME
      ====================================================== */}

      {activeTab === "resume" && (
        <>
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Manage Resume
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Upload your latest PDF. The public “View Resume”
                button will open this file.
              </p>
            </div>

            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold transition sm:w-auto ${
                resumeInfo
                  ? "border-teal-500/40 text-teal-400 hover:bg-teal-500/10"
                  : "pointer-events-none border-gray-700 text-gray-600"
              }`}
            >
              View Current Resume
            </a>
          </div>

          {/* =================================================
              UPLOAD FORM
          ================================================== */}

          <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:mb-8 sm:p-6">
            <form
              onSubmit={handleResumeUpload}
              className="space-y-5"
            >
              {/* FILE INPUT */}

              <div>
                <label
                  htmlFor="resume-file"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Resume PDF
                </label>

                <input
                  id="resume-file"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleResumeFileChange}
                  disabled={resumeLoading}
                  className="block w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-teal-500 disabled:opacity-50"
                />

                <p className="mt-2 text-xs text-gray-500">
                  PDF only • Maximum 10MB
                </p>
              </div>

              {/* =================================================
                  SELECTED FILE
              ================================================== */}

              {resumeFile && (
                <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4">
                  <p className="text-xs text-gray-400">
                    Selected file
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-teal-300">
                    {resumeFile.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              {/* =================================================
                  BUTTONS
              ================================================== */}

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="submit"
                  disabled={!resumeFile || resumeLoading}
                  className="w-full rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {resumeLoading
                    ? "Uploading..."
                    : resumeInfo
                    ? "Replace Resume"
                    : "Upload Resume"}
                </button>

                {resumeInfo && (
                  <button
                    type="button"
                    onClick={handleDeleteResume}
                    disabled={resumeLoading}
                    className="w-full rounded-lg border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    Delete Resume
                  </button>
                )}
              </div>

              {/* =================================================
                  MESSAGE
              ================================================== */}

              {resumeMessage && (
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-gray-300">
                  {resumeMessage}
                </div>
              )}
            </form>
          </div>

          {/* =================================================
              CURRENT RESUME
          ================================================== */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white">
                  Current Resume
                </h3>

                {resumeInfo ? (
                  <>
                    <p className="mt-2 break-all text-sm text-teal-400">
                      {resumeInfo.fileName || "resume.pdf"}
                    </p>

                    {resumeInfo.createdAt && (
                      <p className="mt-1 text-xs text-gray-500">
                        Uploaded:{" "}
                        {new Date(
                          resumeInfo.createdAt
                        ).toLocaleString()}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    No resume uploaded yet.
                  </p>
                )}
              </div>

              {/* OPEN PDF */}

              {resumeInfo && (
                <a
                  href="/api/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 sm:w-auto"
                >
                  Open PDF
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}