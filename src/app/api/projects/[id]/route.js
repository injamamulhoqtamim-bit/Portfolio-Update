import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import mongoose from "mongoose";


// ===============================
// UPDATE PROJECT
// ===============================
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      desc,
      image,
      tech,
      live,
      code,
      challenges,
      improvements,
      longDesc,
    } = body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        image,
        tech: Array.isArray(tech)
          ? tech
          : typeof tech === "string"
          ? tech
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        live: live || "#",
        code: code || "#",
        challenges: challenges || "",
        improvements: improvements || "",
        longDesc: longDesc || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully!",
      data: updatedProject,
    });
  } catch (error) {
    console.error("❌ UPDATE Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}