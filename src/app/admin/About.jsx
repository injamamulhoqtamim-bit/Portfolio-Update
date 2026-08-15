"use client";

export default function AboutAdmin({ admin }) {
  const {
    activeTab,
    aboutForm,
    aboutLoading,
    aboutMessage,
    handleAboutSubmit,
    setAboutForm,
  } = admin;

  if (activeTab !== "about") {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAboutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="w-full">

      {/* HEADER */}

      <div className="mb-6 sm:mb-8">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6 lg:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                About Me
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Update the content displayed in your About section.
              </p>
            </div>

            <div className="w-fit rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-400">
              About Content
            </div>

          </div>
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleAboutSubmit}
        className="space-y-6"
      >

        {/* BASIC INFORMATION */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6 lg:p-8">

          <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* NAME */}

            <div>
              <label
                htmlFor="about-name"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Name
              </label>

              <input
                id="about-name"
                name="name"
                type="text"
                value={aboutForm.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

            {/* LOCATION */}

            <div>
              <label
                htmlFor="about-location"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Location
              </label>

              <input
                id="about-location"
                name="location"
                type="text"
                value={aboutForm.location}
                onChange={handleChange}
                placeholder="Your location"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="about-email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email
              </label>

              <input
                id="about-email"
                name="email"
                type="email"
                value={aboutForm.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

            {/* EDUCATION */}

            <div>
              <label
                htmlFor="about-education"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Education
              </label>

              <input
                id="about-education"
                name="education"
                type="text"
                value={aboutForm.education}
                onChange={handleChange}
                placeholder="BSc in CSE"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

          </div>
        </div>

        {/* INTRO */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6 lg:p-8">

          <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">
            Introduction
          </h3>

          <div>
            <label
              htmlFor="about-intro"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Intro Text
            </label>

            <textarea
              id="about-intro"
              name="intro"
              value={aboutForm.intro}
              onChange={handleChange}
              rows={4}
              placeholder="Write your short introduction..."
              className="w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              This text will appear after your name in the About section.
            </p>
          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6 lg:p-8">

          <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">
            About Description
          </h3>

          <div className="space-y-5">

            {/* PARAGRAPH 1 */}

            <div>
              <label
                htmlFor="about-paragraph1"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                First Paragraph
              </label>

              <textarea
                id="about-paragraph1"
                name="paragraph1"
                value={aboutForm.paragraph1}
                onChange={handleChange}
                rows={7}
                placeholder="Write your first paragraph..."
                className="w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

            {/* PARAGRAPH 2 */}

            <div>
              <label
                htmlFor="about-paragraph2"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Second Paragraph
              </label>

              <textarea
                id="about-paragraph2"
                name="paragraph2"
                value={aboutForm.paragraph2}
                onChange={handleChange}
                rows={7}
                placeholder="Write your second paragraph..."
                className="w-full resize-y rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              />
            </div>

          </div>
        </div>

        {/* STATUS */}

        {aboutMessage && (
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 px-4 py-3 text-sm text-teal-400">
            {aboutMessage}
          </div>
        )}

        {/* SAVE */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

          <button
            type="submit"
            disabled={aboutLoading}
            className="w-full rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {aboutLoading
              ? "Saving..."
              : "Save About Information"}
          </button>

        </div>

      </form>
    </section>
  );
}