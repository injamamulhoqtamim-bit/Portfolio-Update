import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Gallery from "@/models/Gallery";
import { verifyAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =========================================================
   GET ACTIVE GALLERY IMAGES
   ========================================================= */

export async function GET() {
  try {
    await connectDB();

    const gallery = await Gallery.find({
      isActive: true,
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: gallery,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Gallery GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to load gallery.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE GALLERY ITEM
   ========================================================= */

export async function POST(request) {
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
       DATABASE
    ------------------------------------------------------- */

    await connectDB();

    const body = await request.json();

    const title =
      typeof body?.title === "string"
        ? body.title.trim()
        : "";

    const imageUrl =
      typeof body?.imageUrl === "string"
        ? body.imageUrl.trim()
        : "";

    const publicId =
      typeof body?.publicId === "string"
        ? body.publicId.trim()
        : "";

    const displayOrder =
      Number.isFinite(Number(body?.displayOrder))
        ? Number(body.displayOrder)
        : 0;

    const isActive =
      typeof body?.isActive === "boolean"
        ? body.isActive
        : true;

    /* -------------------------------------------------------
       VALIDATION
    ------------------------------------------------------- */

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
       CREATE
    ------------------------------------------------------- */

    const gallery = await Gallery.create({
      title,
      imageUrl,
      publicId,
      displayOrder,
      isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery image added successfully.",
        data: gallery,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("❌ Gallery POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to add gallery image.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE GALLERY ITEM
   ========================================================= */

export async function PATCH(request) {
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

    await connectDB();

    const body = await request.json();

    const id = body?.id || body?._id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const updateData = {};

    if (typeof body?.title === "string") {
      updateData.title = body.title.trim();
    }

    if (typeof body?.imageUrl === "string") {
      updateData.imageUrl = body.imageUrl.trim();
    }

    if (typeof body?.publicId === "string") {
      updateData.publicId = body.publicId.trim();
    }

    if (body?.displayOrder !== undefined) {
      updateData.displayOrder = Number(body.displayOrder) || 0;
    }

    if (typeof body?.isActive === "boolean") {
      updateData.isActive = body.isActive;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

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

    return NextResponse.json(
      {
        success: true,
        message: "Gallery image updated successfully.",
        data: gallery,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Gallery PATCH Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to update gallery image.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE GALLERY ITEM
   ========================================================= */

export async function DELETE(request) {
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

    await connectDB();

    const body = await request.json();

    const id = body?.id || body?._id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const deletedGallery = await Gallery.findByIdAndDelete(id).lean();

    if (!deletedGallery) {
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

    return NextResponse.json(
      {
        success: true,
        message: "Gallery image deleted successfully.",
        data: deletedGallery,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Gallery DELETE Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to delete gallery image.",
      },
      {
        status: 500,
      }
    );
  }
}