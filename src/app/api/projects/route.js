import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import mongoose from "mongoose";

// ===============================
// GET ALL PROJECTS
// ===============================
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("❌ GET Projects Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ===============================
// ADD NEW PROJECT
// ===============================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("📥 POST Project Body:", body);

    const {
      title,
      image,

      // New Admin Panel fields
      shortDescription,
      longDescription,
      techStack,
      liveLink,
      githubLink,
      challenges,
      futureImprovements,

      // Old fields - compatibility
      desc,
      tech,
      live,
      code,
      longDesc,
      improvements,
    } = body;

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    const finalDescription =
      shortDescription || desc || "";

    const finalImage = image || "";

    if (!title || !finalDescription || !finalImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description and image are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // TECH STACK
    // ==========================================

    let finalTechStack = [];

    if (Array.isArray(techStack)) {
      finalTechStack = techStack;
    } else if (typeof techStack === "string") {
      finalTechStack = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (Array.isArray(tech)) {
      finalTechStack = tech;
    } else if (typeof tech === "string") {
      finalTechStack = tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    // ==========================================
    // CHALLENGES
    // ==========================================
    // MongoDB model যদি String হয়,
    // তাহলে array -> string করে পাঠানো হবে।

    let finalChallenges = "";

    if (Array.isArray(challenges)) {
      finalChallenges = challenges.join("\n");
    } else if (typeof challenges === "string") {
      finalChallenges = challenges;
    }

    // Old field compatibility
    if (!finalChallenges && improvements) {
      finalChallenges = "";
    }

    // ==========================================
    // FUTURE IMPROVEMENTS
    // ==========================================

    let finalImprovements = "";

    if (Array.isArray(futureImprovements)) {
      finalImprovements = futureImprovements.join("\n");
    } else if (typeof futureImprovements === "string") {
      finalImprovements = futureImprovements;
    } else if (Array.isArray(improvements)) {
      finalImprovements = improvements.join("\n");
    } else if (typeof improvements === "string") {
      finalImprovements = improvements;
    }

    // ==========================================
    // CREATE PROJECT
    // ==========================================

    const newProject = await Project.create({
      title,

      // Image
      image: finalImage,

      // Description
      desc: finalDescription,

      // Full description
      longDesc: longDescription || longDesc || "",

      // Technologies
      tech: finalTechStack,

      // URLs
      live: liveLink || live || "#",
      code: githubLink || code || "#",

      // IMPORTANT:
      // These are STRING because your current
      // MongoDB model expects String.
      challenges: finalChallenges,
      improvements: finalImprovements,
    });

    console.log("✅ Project Created:", newProject);

    return NextResponse.json(
      {
        success: true,
        message: "Project added successfully!",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ===============================
// PUT / UPDATE PROJECT
// ===============================
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("📥 PUT Project Body:", body);

    const {
      id,
      title,
      image,
      shortDescription,
      longDescription,
      techStack,
      liveLink,
      githubLink,
      challenges,
      futureImprovements,
    } = body;

    // ==========================================
    // CHECK ID
    // ==========================================

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // TECH STACK
    // ==========================================

    let finalTechStack = [];

    if (Array.isArray(techStack)) {
      finalTechStack = techStack;
    } else if (typeof techStack === "string") {
      finalTechStack = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    // ==========================================
    // CHALLENGES
    // ==========================================

    let finalChallenges = "";

    if (Array.isArray(challenges)) {
      finalChallenges = challenges.join("\n");
    } else if (typeof challenges === "string") {
      finalChallenges = challenges;
    }

    // ==========================================
    // FUTURE IMPROVEMENTS
    // ==========================================

    let finalImprovements = "";

    if (Array.isArray(futureImprovements)) {
      finalImprovements = futureImprovements.join("\n");
    } else if (typeof futureImprovements === "string") {
      finalImprovements = futureImprovements;
    }

    // ==========================================
    // UPDATE DATA
    // ==========================================

    const updateData = {
      title,
      image,

      desc: shortDescription || "",

      longDesc: longDescription || "",

      tech: finalTechStack,

      live: liveLink || "#",

      code: githubLink || "#",

      challenges: finalChallenges,

      improvements: finalImprovements,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
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

    console.log("✅ Project Updated:", updatedProject);

    return NextResponse.json({
      success: true,
      message: "Project updated successfully!",
      data: updatedProject,
    });
  } catch (error) {
    console.error("❌ PUT Project Error:", error);

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

// ===============================
// DELETE PROJECT
// ===============================
export async function DELETE(request) {
  try {
    await connectDB();

    const { id } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
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
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error("❌ DELETE Project Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}