import { NextResponse } from "next/server";
import mongoose from "mongoose";

import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

const IMAGE_FOLDER = "portfolio/certificates/images";
const DOCUMENT_FOLDER = "portfolio/certificates/documents";

const successResponse = (data = {}, status = 200) => {
  return NextResponse.json(
    {
      success: true,
      ...data,
    },
    { status }
  );
};

const errorResponse = (
  message = "Something went wrong.",
  status = 500,
  extra = {}
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      ...extra,
    },
    { status }
  );
};

const cleanText = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const parseDisplayOrder = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
};

const isValidFile = (file) => {
  return (
    file &&
    typeof file !== "string" &&
    typeof file.size === "number" &&
    file.size > 0
  );
};

const getCloudinaryPublicId = (
  url,
  resourceType = "image"
) => {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;

    const uploadMarker = "/upload/";
    const uploadIndex =
      pathname.indexOf(uploadMarker);

    if (uploadIndex === -1) {
      return null;
    }

    let publicPath = pathname.substring(
      uploadIndex + uploadMarker.length
    );

    const parts = publicPath
      .split("/")
      .filter(Boolean);

    if (!parts.length) {
      return null;
    }

    if (
      parts[0]?.includes(",") ||
      parts[0]?.startsWith("w_") ||
      parts[0]?.startsWith("h_") ||
      parts[0]?.startsWith("c_") ||
      parts[0]?.startsWith("f_") ||
      parts[0]?.startsWith("q_") ||
      parts[0]?.startsWith("fl_") ||
      parts[0]?.startsWith("e_") ||
      parts[0]?.startsWith("ar_")
    ) {
      parts.shift();
    }

    if (!parts.length) {
      return null;
    }

    publicPath = parts.join("/");

    publicPath = publicPath.replace(
      /^v\d+\//,
      ""
    );

    if (resourceType !== "raw") {
      publicPath = publicPath.replace(
        /\.[^/.]+$/,
        ""
      );
    }

    return publicPath || null;
  } catch (error) {
    console.error(
      "Cloudinary public ID extraction error:",
      error
    );

    return null;
  }
};

const deleteCloudinaryFile = async (
  url,
  resourceType = "image"
) => {
  if (!url) {
    return {
      success: false,
      skipped: true,
    };
  }

  try {
    const publicId =
      getCloudinaryPublicId(
        url,
        resourceType
      );

    if (!publicId) {
      console.warn(
        "Could not determine Cloudinary public ID:",
        url
      );

      return {
        success: false,
        skipped: true,
      };
    }

    const result =
      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: resourceType,
          invalidate: true,
        }
      );

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error(
      `Cloudinary ${resourceType} delete error:`,
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};

const uploadImageToCloudinary = async (
  file
) => {
  if (!isValidFile(file)) {
    return "";
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const base64 =
    buffer.toString("base64");

  const dataUri =
    `data:${
      file.type || "image/jpeg"
    };base64,${base64}`;

  const result =
    await cloudinary.uploader.upload(
      dataUri,
      {
        folder: IMAGE_FOLDER,
        resource_type: "image",
      }
    );

  return result.secure_url || "";
};

const uploadPdfToCloudinary = async (
  file
) => {
  if (!isValidFile(file)) {
    return "";
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const base64 =
    buffer.toString("base64");

  const dataUri =
    `data:${
      file.type || "application/pdf"
    };base64,${base64}`;

  const result =
    await cloudinary.uploader.upload(
      dataUri,
      {
        folder: DOCUMENT_FOLDER,
        resource_type: "raw",
      }
    );

  return result.secure_url || "";
};

const validateImage = (file) => {
  if (!isValidFile(file)) {
    return "Please upload a certificate image.";
  }

  const fileType =
    file.type?.toLowerCase() || "";

  if (!fileType.startsWith("image/")) {
    return "Please upload a valid certificate image.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Certificate image must be less than 5MB.";
  }

  return null;
};

const validatePdf = (file) => {
  if (!isValidFile(file)) {
    return "Please upload a certificate PDF document.";
  }

  const fileName =
    file.name?.toLowerCase() || "";

  const fileType =
    file.type?.toLowerCase() || "";

  const isPdf =
    fileType === "application/pdf" ||
    fileName.endsWith(".pdf");

  if (!isPdf) {
    return "Please upload a valid PDF certificate document.";
  }

  if (file.size > MAX_PDF_SIZE) {
    return "Certificate PDF must be less than 10MB.";
  }

  return null;
};

const validateCertificateFields = ({
  title,
  organization,
  date,
}) => {
  const cleanTitle =
    cleanText(title);

  const cleanOrganization =
    cleanText(organization);

  const cleanDate =
    cleanText(date);

  if (!cleanTitle) {
    return {
      error:
        "Certificate title is required.",
    };
  }

  if (!cleanOrganization) {
    return {
      error:
        "Certificate organization is required.",
    };
  }

  if (!cleanDate) {
    return {
      error:
        "Certificate date is required.",
    };
  }

  return {
    title: cleanTitle,
    organization: cleanOrganization,
    date: cleanDate,
  };
};

// =========================================================
// GET
// =========================================================

export async function GET() {
  try {
    await connectDB();

    const certificates =
      await Certificate.find({})
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .lean();

    return successResponse({
      data: certificates,
      certificates,
    });
  } catch (error) {
    console.error(
      "GET certificates error:",
      error
    );

    return errorResponse(
      error.message ||
        "Failed to fetch certificates.",
      500,
      {
        data: [],
        certificates: [],
      }
    );
  }
}

// =========================================================
// POST
// =========================================================

export async function POST(request) {
  let uploadedImageUrl = "";
  let uploadedDocumentUrl = "";

  try {
    await connectDB();

    const formData =
      await request.formData();

    const title =
      formData.get("title");

    const organization =
      formData.get("organization");

    const date =
      formData.get("date");

    const displayOrder =
      formData.get("displayOrder");

    const image =
      formData.get("image");

    const document =
      formData.get("document");

    const fields =
      validateCertificateFields({
        title,
        organization,
        date,
      });

    if (fields.error) {
      return errorResponse(
        fields.error,
        400
      );
    }

    if (!isValidFile(image)) {
      return errorResponse(
        "Please upload a certificate image.",
        400
      );
    }

    if (!isValidFile(document)) {
      return errorResponse(
        "Please upload a certificate PDF document.",
        400
      );
    }

    const imageError =
      validateImage(image);

    if (imageError) {
      return errorResponse(
        imageError,
        400
      );
    }

    const pdfError =
      validatePdf(document);

    if (pdfError) {
      return errorResponse(
        pdfError,
        400
      );
    }

    uploadedImageUrl =
      await uploadImageToCloudinary(
        image
      );

    if (!uploadedImageUrl) {
      throw new Error(
        "Certificate image upload failed."
      );
    }

    uploadedDocumentUrl =
      await uploadPdfToCloudinary(
        document
      );

    if (!uploadedDocumentUrl) {
      throw new Error(
        "Certificate PDF upload failed."
      );
    }

    const certificate =
      await Certificate.create({
        title: fields.title,
        organization:
          fields.organization,
        date: fields.date,
        displayOrder:
          parseDisplayOrder(
            displayOrder
          ),
        imageUrl:
          uploadedImageUrl,
        documentUrl:
          uploadedDocumentUrl,
      });

    return successResponse(
      {
        message:
          "Certificate added successfully.",
        certificate,
      },
      201
    );
  } catch (error) {
    console.error(
      "POST certificate error:",
      error
    );

    if (uploadedImageUrl) {
      await deleteCloudinaryFile(
        uploadedImageUrl,
        "image"
      );
    }

    if (uploadedDocumentUrl) {
      await deleteCloudinaryFile(
        uploadedDocumentUrl,
        "raw"
      );
    }

    return errorResponse(
      error.message ||
        "Failed to add certificate.",
      500
    );
  }
}

// =========================================================
// PUT
// =========================================================

export async function PUT(request) {
  let newImageUrl = "";
  let newDocumentUrl = "";

  try {
    await connectDB();

    const formData =
      await request.formData();

    const id = cleanText(
      formData.get("id")
    );

    const title =
      formData.get("title");

    const organization =
      formData.get("organization");

    const date =
      formData.get("date");

    const displayOrder =
      formData.get("displayOrder");

    const image =
      formData.get("image");

    const document =
      formData.get("document");

    if (!id) {
      return errorResponse(
        "Certificate ID is required.",
        400
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return errorResponse(
        "Invalid certificate ID.",
        400
      );
    }

    const oldCertificate =
      await Certificate.findById(id);

    if (!oldCertificate) {
      return errorResponse(
        "Certificate not found.",
        404
      );
    }

    const fields =
      validateCertificateFields({
        title,
        organization,
        date,
      });

    if (fields.error) {
      return errorResponse(
        fields.error,
        400
      );
    }

    if (isValidFile(image)) {
      const imageError =
        validateImage(image);

      if (imageError) {
        return errorResponse(
          imageError,
          400
        );
      }
    }

    if (isValidFile(document)) {
      const pdfError =
        validatePdf(document);

      if (pdfError) {
        return errorResponse(
          pdfError,
          400
        );
      }
    }

    let imageUrl =
      oldCertificate.imageUrl || "";

    let documentUrl =
      oldCertificate.documentUrl || "";

    if (isValidFile(image)) {
      newImageUrl =
        await uploadImageToCloudinary(
          image
        );

      if (!newImageUrl) {
        throw new Error(
          "Certificate image upload failed."
        );
      }

      imageUrl = newImageUrl;
    }

    if (isValidFile(document)) {
      newDocumentUrl =
        await uploadPdfToCloudinary(
          document
        );

      if (!newDocumentUrl) {
        throw new Error(
          "Certificate PDF upload failed."
        );
      }

      documentUrl = newDocumentUrl;
    }

    const updatedCertificate =
      await Certificate.findByIdAndUpdate(
        id,
        {
          title: fields.title,
          organization:
            fields.organization,
          date: fields.date,
          displayOrder:
            parseDisplayOrder(
              displayOrder
            ),
          imageUrl,
          documentUrl,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedCertificate) {
      throw new Error(
        "Certificate update failed."
      );
    }

    if (
      newImageUrl &&
      oldCertificate.imageUrl &&
      oldCertificate.imageUrl !==
        newImageUrl
    ) {
      await deleteCloudinaryFile(
        oldCertificate.imageUrl,
        "image"
      );
    }

    if (
      newDocumentUrl &&
      oldCertificate.documentUrl &&
      oldCertificate.documentUrl !==
        newDocumentUrl
    ) {
      await deleteCloudinaryFile(
        oldCertificate.documentUrl,
        "raw"
      );
    }

    return successResponse({
      message:
        "Certificate updated successfully.",
      certificate:
        updatedCertificate,
    });
  } catch (error) {
    console.error(
      "PUT certificate error:",
      error
    );

    if (newImageUrl) {
      await deleteCloudinaryFile(
        newImageUrl,
        "image"
      );
    }

    if (newDocumentUrl) {
      await deleteCloudinaryFile(
        newDocumentUrl,
        "raw"
      );
    }

    return errorResponse(
      error.message ||
        "Failed to update certificate.",
      500
    );
  }
}

// =========================================================
// DELETE
// =========================================================

export async function DELETE(request) {
  try {
    await connectDB();

    let body = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const id =
      cleanText(body?.id);

    if (!id) {
      return errorResponse(
        "Certificate ID is required.",
        400
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return errorResponse(
        "Invalid certificate ID.",
        400
      );
    }

    const certificate =
      await Certificate.findById(id);

    if (!certificate) {
      return errorResponse(
        "Certificate not found.",
        404
      );
    }

    await Certificate.findByIdAndDelete(
      id
    );

    if (certificate.imageUrl) {
      await deleteCloudinaryFile(
        certificate.imageUrl,
        "image"
      );
    }

    if (certificate.documentUrl) {
      await deleteCloudinaryFile(
        certificate.documentUrl,
        "raw"
      );
    }

    return successResponse({
      message:
        "Certificate deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE certificate error:",
      error
    );

    return errorResponse(
      error.message ||
        "Failed to delete certificate.",
      500
    );
  }
}