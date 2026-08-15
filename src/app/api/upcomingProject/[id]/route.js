import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UpcomingProject from "@/models/UpcomingProject";
import mongoose from "mongoose";

// =========================================================
// GET SINGLE UPCOMING PROJECT
// =========================================================

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    const project = await UpcomingProject.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Upcoming project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Single Upcoming Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch upcoming project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================================================
// UPDATE UPCOMING PROJECT
// =========================================================

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      tagline,
      description,
      desc,
      image,
      features,
      tech,
      order,
      isActive,
    } = body;

    const projectDescription = description || desc;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    if (!tagline?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Tagline is required",
        },
        { status: 400 }
      );
    }

    if (!projectDescription?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required",
        },
        { status: 400 }
      );
    }

    if (!image?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project image is required",
        },
        { status: 400 }
      );
    }

    const updatedProject =
      await UpcomingProject.findByIdAndUpdate(
        id,
        {
          title: title.trim(),

          tagline: tagline.trim(),

          desc: projectDescription.trim(),

          image: image.trim(),

          features: Array.isArray(features)
            ? features
                .filter((feature) => feature?.name?.trim())
                .map((feature) => ({
                  name: feature.name.trim(),
                  icon:
                    feature.icon?.trim() ||
                    "Sparkles",
                }))
            : [],

          tech: Array.isArray(tech)
            ? tech
                .filter((item) => item?.name?.trim())
                .map((item) => ({
                  name: item.name.trim(),
                  icon:
                    item.icon?.trim() ||
                    "Code2",
                }))
            : [],

          order: Number(order) || 0,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Upcoming project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Upcoming project updated successfully",
        data: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Upcoming Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update upcoming project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================================================
// DELETE UPCOMING PROJECT
// =========================================================

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 }
      );
    }

    const deletedProject =
      await UpcomingProject.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Upcoming project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Upcoming project deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Upcoming Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete upcoming project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}