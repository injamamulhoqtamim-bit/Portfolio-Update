import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";

// =========================
// GET ALL EDUCATION & EXPERIENCE
// =========================
export async function GET() {
  try {
    await connectDB();

    const data = await Education.find({}).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ GET Education Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// ADD EDUCATION / EXPERIENCE
// =========================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      degree,
      institution,
      passingYear,
      description,
      type,
      points,
      link,
    } = body;

    const finalTitle = (title || degree || "").trim();

    if (
      !finalTitle ||
      !institution?.trim() ||
      !passingYear?.trim() ||
      !description?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be filled.",
        },
        { status: 400 }
      );
    }

    // Process type value safely
    const itemType = type ? String(type).trim().toLowerCase() : "education";

    // Process points safely
    const formattedPoints = Array.isArray(points)
      ? points
      : typeof points === "string" && points.trim()
      ? points.split("\n").map((p) => p.trim()).filter(Boolean)
      : [];

    const education = await Education.create({
      title: finalTitle,
      degree: finalTitle,
      institution: institution.trim(),
      passingYear: passingYear.trim(),
      description: description.trim(),
      type: itemType,
      points: formattedPoints,
      link: link ? link.trim() : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Item added successfully!",
        data: education,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST Education Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE EDUCATION / EXPERIENCE
// =========================
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      id,
      title,
      degree,
      institution,
      passingYear,
      description,
      type,
      points,
      link,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required.",
        },
        { status: 400 }
      );
    }

    const finalTitle = (title || degree || "").trim();

    // Process type value safely
    const itemType = type ? String(type).trim().toLowerCase() : "education";

    // Process points safely
    const formattedPoints = Array.isArray(points)
      ? points
      : typeof points === "string" && points.trim()
      ? points.split("\n").map((p) => p.trim()).filter(Boolean)
      : [];

    const updated = await Education.findByIdAndUpdate(
      id,
      {
        title: finalTitle,
        degree: finalTitle,
        institution: institution?.trim(),
        passingYear: passingYear?.trim(),
        description: description?.trim(),
        type: itemType,
        points: formattedPoints,
        link: link?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Updated successfully!",
      data: updated,
    });
  } catch (error) {
    console.error("❌ PUT Education Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE EDUCATION / EXPERIENCE
// =========================
export async function DELETE(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required.",
        },
        { status: 400 }
      );
    }

    const deleted = await Education.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    console.error("❌ DELETE Education Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}