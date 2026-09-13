import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/connectDB";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

/* =========================================================
   UPDATE GALLERY
   ========================================================= */

export async function PUT(request, { params }) {
  try {
    /* -------------------------------------------------------
       ADMIN AUTH
    ------------------------------------------------------- */

    const admin = await verifyAdmin(request);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /* -------------------------------------------------------
       GET ID
    ------------------------------------------------------- */

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gallery ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       DATABASE
    ------------------------------------------------------- */

    await connectDB();

    const body = await request.json();

    const title = body?.title?.trim() || "";
    const imageUrl = body?.imageUrl?.trim() || "";
    const publicId = body?.publicId?.trim() || "";

    const displayOrder = Number(body?.displayOrder) || 0;

    const isActive =
      typeof body?.isActive === "boolean"
        ? body.isActive
        : true;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       FIND EXISTING
    ------------------------------------------------------- */

    const existingGallery = await Gallery.findById(id);

    if (!existingGallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* -------------------------------------------------------
       DELETE OLD CLOUDINARY IMAGE
       ONLY IF NEW IMAGE IS DIFFERENT
    ------------------------------------------------------- */

    if (
      publicId &&
      existingGallery.publicId &&
      publicId !== existingGallery.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(
          existingGallery.publicId,
          {
            resource_type: "image",
          }
        );
      } catch (cloudinaryError) {
        console.error(
          "⚠️ Old Cloudinary image deletion failed:",
          cloudinaryError
        );
      }
    }

    /* -------------------------------------------------------
       UPDATE
    ------------------------------------------------------- */

    existingGallery.title = title;
    existingGallery.imageUrl = imageUrl;
    existingGallery.publicId = publicId;
    existingGallery.displayOrder = displayOrder;
    existingGallery.isActive = isActive;

    await existingGallery.save();

    return NextResponse.json({
      success: true,
      message: "Gallery image updated successfully.",
      data: existingGallery,
    });
  } catch (error) {
    console.error("❌ Gallery PUT Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gallery image.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE GALLERY
   ========================================================= */

export async function DELETE(request, { params }) {
  try {
    /* -------------------------------------------------------
       ADMIN AUTH
    ------------------------------------------------------- */

    const admin = await verifyAdmin(request);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /* -------------------------------------------------------
       GET ID
    ------------------------------------------------------- */

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gallery ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------------------------
       DATABASE
    ------------------------------------------------------- */

    await connectDB();

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* -------------------------------------------------------
       DELETE CLOUDINARY IMAGE
    ------------------------------------------------------- */

    if (gallery.publicId) {
      try {
        await cloudinary.uploader.destroy(
          gallery.publicId,
          {
            resource_type: "image",
          }
        );
      } catch (cloudinaryError) {
        console.error(
          "⚠️ Cloudinary delete failed:",
          cloudinaryError
        );
      }
    }

    /* -------------------------------------------------------
       DELETE DATABASE DOCUMENT
    ------------------------------------------------------- */

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Gallery DELETE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete gallery image.",
      },
      {
        status: 500,
      }
    );
  }
}