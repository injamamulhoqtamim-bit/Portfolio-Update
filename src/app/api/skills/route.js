import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Skill from "@/models/Skill";
import mongoose from "mongoose";

// ==========================================
// GET ALL SKILLS
// ==========================================

export async function GET() {
  try {
    await connectDB();

    const skills = await Skill.find({})
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("❌ GET Skills Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// ADD NEW SKILL
// ==========================================

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("📥 POST Skill Body:", body);

    const {
      name,
      category,
      level,
      icon,
      color,
      showInOrbit,
      order,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !category || level === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill name, category and level are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // LEVEL VALIDATION
    // ==========================================

    const skillLevel = Number(level);

    if (
      Number.isNaN(skillLevel) ||
      skillLevel < 0 ||
      skillLevel > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill level must be between 0 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // CATEGORY VALIDATION
    // ==========================================

    const allowedCategories = [
      "Frontend",
      "Backend",
      "Tools",
    ];

    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category must be Frontend, Backend or Tools.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // CREATE SKILL
    // ==========================================

    const newSkill = await Skill.create({
      name: name.trim(),
      category,
      level: skillLevel,
      icon: icon || "CodeXml",
      color: color || "#00d4ff",
      showInOrbit:
        typeof showInOrbit === "boolean"
          ? showInOrbit
          : true,
      order:
        order !== undefined
          ? Number(order)
          : 0,
    });

    console.log("✅ Skill Created:", newSkill);

    return NextResponse.json(
      {
        success: true,
        message: "Skill added successfully!",
        data: newSkill,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("❌ POST Skill Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add skill",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// UPDATE SKILL
// ==========================================

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("📥 PUT Skill Body:", body);

    const {
      id,
      name,
      category,
      level,
      icon,
      color,
      showInOrbit,
      order,
    } = body;

    // ==========================================
    // ID VALIDATION
    // ==========================================

    if (
      !id ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid skill ID.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // REQUIRED DATA
    // ==========================================

    if (!name || !category || level === undefined) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Skill name, category and level are required.",
        },
        {
          status: 400,
        }
      );
    }

    const skillLevel = Number(level);

    if (
      Number.isNaN(skillLevel) ||
      skillLevel < 0 ||
      skillLevel > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Skill level must be between 0 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    const updatedSkill =
      await Skill.findByIdAndUpdate(
        id,
        {
          name: name.trim(),
          category,
          level: skillLevel,
          icon: icon || "CodeXml",
          color: color || "#00d4ff",
          showInOrbit:
            typeof showInOrbit === "boolean"
              ? showInOrbit
              : true,
          order:
            order !== undefined
              ? Number(order)
              : 0,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedSkill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.log("✅ Skill Updated:", updatedSkill);

    return NextResponse.json({
      success: true,
      message: "Skill updated successfully!",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("❌ PUT Skill Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update skill",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// DELETE SKILL
// ==========================================

export async function DELETE(request) {
  try {
    await connectDB();

    const { id } = await request.json();

    if (
      !id ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid skill ID.",
        },
        {
          status: 400,
        }
      );
    }

    const deletedSkill =
      await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully!",
    });
  } catch (error) {
    console.error("❌ DELETE Skill Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete skill",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}