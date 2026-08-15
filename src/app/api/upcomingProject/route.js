import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UpcomingProject from "@/models/UpcomingProject";

// =========================================================
// GET ALL UPCOMING PROJECTS
// =========================================================

export async function GET() {
  try {
    await connectDB();

    const projects = await UpcomingProject.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Upcoming Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch upcoming projects",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// CREATE UPCOMING PROJECT
// =========================================================

export async function POST(request) {
  try {
    await connectDB();

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

    // Support both `description` and old `desc`
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

    const project = await UpcomingProject.create({
      title: title.trim(),

      tagline: tagline.trim(),

      desc: projectDescription.trim(),

      image: image.trim(),

      features: Array.isArray(features)
        ? features
            .filter((feature) => feature?.name?.trim())
            .map((feature) => ({
              name: feature.name.trim(),
              icon: feature.icon?.trim() || "Sparkles",
            }))
        : [],

      tech: Array.isArray(tech)
        ? tech
            .filter((item) => item?.name?.trim())
            .map((item) => ({
              name: item.name.trim(),
              icon: item.icon?.trim() || "Code2",
            }))
        : [],

      order: Number(order) || 0,

      isActive:
        typeof isActive === "boolean"
          ? isActive
          : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Upcoming project created successfully",
        data: project,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Upcoming Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create upcoming project",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}