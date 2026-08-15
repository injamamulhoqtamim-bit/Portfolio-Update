import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";

// =========================
// GET ALL EDUCATION
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
// ADD EDUCATION
// =========================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      degree,
      institution,
      passingYear,
      description,
    } = body;

    if (
      !degree?.trim() ||
      !institution?.trim() ||
      !passingYear?.trim() ||
      !description?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const education = await Education.create({
      degree: degree.trim(),
      institution: institution.trim(),
      passingYear: passingYear.trim(),
      description: description.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Education added successfully!",
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
// UPDATE EDUCATION
// =========================
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      id,
      degree,
      institution,
      passingYear,
      description,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Education ID is required.",
        },
        { status: 400 }
      );
    }

    const updated = await Education.findByIdAndUpdate(
      id,
      {
        degree: degree?.trim(),
        institution: institution?.trim(),
        passingYear: passingYear?.trim(),
        description: description?.trim(),
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
          message: "Education not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Education updated successfully!",
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
// DELETE EDUCATION
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
          message: "Education ID is required.",
        },
        { status: 400 }
      );
    }

    const deleted = await Education.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Education not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Education deleted successfully!",
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