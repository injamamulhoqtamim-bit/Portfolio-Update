"use client";

export default function Certificates({ admin }) {
  const {
    activeTab,
    certificateDocumentFile,
    certificateDocumentName,
    certificateForm,
    certificateImageFile,
    certificateImagePreview,
    certificateLoading,
    certificates,
    editingCertificate,
    existingCertificateDocument,
    existingCertificateImage,
    handleCertificateChange,
    handleCertificateDocumentChange,
    handleCertificateImageChange,
    handleCertificateSubmit,
    handleDeleteCertificate,
    handleEditCertificate,
    cancelCertificateEdit,
    setCertificateForm,
  } = admin;

  if (activeTab !== "certificates") {
    return null;
  }

  return (
    <section className="w-full space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Certificates
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Add, edit and manage your certificates.
        </p>
      </div>

      {/* FORM */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-teal-400">
            {editingCertificate
              ? "Edit Certificate"
              : "Add Certificate"}
          </h3>

          {editingCertificate && (
            <button
              type="button"
              onClick={cancelCertificateEdit}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-700 hover:text-white"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleCertificateSubmit}
          className="space-y-5"
        >
          {/* TITLE */}
          <div>
            <label
              htmlFor="certificate-title"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Certificate Title
            </label>

            <input
              id="certificate-title"
              name="title"
              type="text"
              value={certificateForm.title}
              onChange={handleCertificateChange}
              placeholder="e.g. Full Stack Web Development"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              required
            />
          </div>

          {/* ORGANIZATION */}
          <div>
            <label
              htmlFor="certificate-organization"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Organization
            </label>

            <input
              id="certificate-organization"
              name="organization"
              type="text"
              value={certificateForm.organization}
              onChange={handleCertificateChange}
              placeholder="e.g. Programming Hero"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
              required
            />
          </div>

          {/* DATE + ORDER */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="certificate-date"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Date
              </label>

              <input
                id="certificate-date"
                name="date"
                type="text"
                value={certificateForm.date}
                onChange={handleCertificateChange}
                placeholder="e.g. January 2026"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="certificate-order"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Display Order
              </label>

              <input
                id="certificate-order"
                name="order"
                type="number"
                value={certificateForm.order}
                onChange={handleCertificateChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-teal-500"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label
              htmlFor="certificate-image"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Certificate Image
            </label>

            <input
              id="certificate-image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleCertificateImageChange}
              className="block w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-3 text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-teal-700"
            />

            {certificateImagePreview && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-800 bg-gray-950 p-3">
                <p className="mb-2 text-xs text-gray-500">
                  Image Preview
                </p>

                <img
                  src={certificateImagePreview}
                  alt="Certificate preview"
                  className="max-h-64 w-full rounded-lg object-contain"
                />
              </div>
            )}

            {!certificateImagePreview &&
              existingCertificateImage && (
                <p className="mt-2 text-xs text-gray-500">
                  Existing certificate image will be kept unless
                  you select a new image.
                </p>
              )}

            {certificateImageFile && (
              <p className="mt-2 text-xs text-teal-400">
                Selected: {certificateImageFile.name}
              </p>
            )}
          </div>

          {/* PDF */}
          <div>
            <label
              htmlFor="certificate-document"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Certificate PDF
            </label>

            <input
              id="certificate-document"
              name="document"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleCertificateDocumentChange}
              className="block w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-3 text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-teal-700"
            />

            {certificateDocumentName && (
              <p className="mt-2 text-xs text-teal-400">
                {certificateDocumentName}
              </p>
            )}

            {!certificateDocumentFile &&
              existingCertificateDocument && (
                <p className="mt-2 text-xs text-gray-500">
                  Existing PDF will be kept unless you select
                  a new PDF.
                </p>
              )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={certificateLoading}
            className="w-full rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {certificateLoading
              ? "Saving..."
              : editingCertificate
              ? "Update Certificate"
              : "Add Certificate"}
          </button>
        </form>
      </div>

      {/* CERTIFICATE LIST */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Existing Certificates
          </h3>

          <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
            {certificates?.length || 0}
          </span>
        </div>

        {!certificates || certificates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-700 bg-gray-950 p-8 text-center">
            <p className="text-gray-500">
              No certificates found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {certificates.map((certificate) => {
              const imageUrl =
                certificate.imageUrl ||
                certificate.image ||
                "";

              const documentUrl =
                certificate.documentUrl ||
                certificate.credentialLink ||
                "";

              return (
                <article
                  key={certificate._id}
                  className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950"
                >
                  {/* IMAGE */}
                  {imageUrl ? (
                    <div className="h-48 overflow-hidden bg-gray-900">
                      <img
                        src={imageUrl}
                        alt={certificate.title || "Certificate"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-900 text-sm text-gray-600">
                      No Image
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="space-y-4 p-4">
                    <div>
                      <h4 className="font-semibold text-white">
                        {certificate.title || "Untitled Certificate"}
                      </h4>

                      <p className="mt-1 text-sm text-teal-400">
                        {certificate.organization || "Unknown Organization"}
                      </p>

                      {certificate.date && (
                        <p className="mt-1 text-xs text-gray-500">
                          {certificate.date}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditCertificate(certificate)
                        }
                        disabled={certificateLoading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                      >
                        Edit
                      </button>

                      {documentUrl && (
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white"
                        >
                          View PDF
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCertificate(certificate._id)
                        }
                        disabled={certificateLoading}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
