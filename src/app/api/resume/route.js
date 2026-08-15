import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const runtime = "nodejs";

// ==========================================
// GET - Resume information
// ==========================================
export async function GET() {
  try {
    await connectDB();

    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

   if (!resume) {
  return NextResponse.json({
    success: false,
    resume: null,
    message: "Resume not found",
  });
}

    return NextResponse.json({
      success: true,
      resume: {
        id: resume._id,
        title: resume.title,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        publicId: resume.publicId,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET Resume Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch resume",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// POST - Upload / Replace Resume
// ==========================================
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "PDF file is required",
        },
        {
          status: 400,
        }
      );
    }

    // Only PDF allowed
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        {
          status: 400,
        }
      );
    }

    // Maximum 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "PDF size must be less than 10MB",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Convert file to Buffer
    // ==========================================

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ==========================================
    // Convert Buffer to Base64
    // ==========================================

    const base64File = `data:application/pdf;base64,${buffer.toString(
      "base64"
    )}`;

    // ==========================================
    // Upload PDF to Cloudinary
    // ==========================================

    const uploadResult = await cloudinary.uploader.upload(
      base64File,
      {
        folder: "portfolio/resume",
        resource_type: "raw",
        type: "upload",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      }
    );

    // ==========================================
    // Find existing resume
    // ==========================================

    const oldResume = await Resume.findOne().sort({
      createdAt: -1,
    });

    // ==========================================
    // Create new resume
    // ==========================================

    const resume = await Resume.create({
      title: "My Resume",
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileName: file.name,
    });

    // ==========================================
    // Delete old Cloudinary PDF
    // ==========================================

    if (oldResume?.publicId) {
      try {
        await cloudinary.uploader.destroy(
          oldResume.publicId,
          {
            resource_type: "raw",
            type: "upload",
          }
        );
      } catch (deleteError) {
        console.error(
          "Old Resume Cloudinary Delete Error:",
          deleteError
        );
      }
    }

    // ==========================================
    // Delete old MongoDB record
    // ==========================================

    if (oldResume?._id) {
      await Resume.deleteOne({
        _id: oldResume._id,
      });
    }

    // ==========================================
    // Success
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        message: "Resume uploaded successfully",
        resume: {
          id: resume._id,
          title: resume.title,
          fileName: resume.fileName,
          fileUrl: resume.fileUrl,
          publicId: resume.publicId,
          createdAt: resume.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Resume Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Failed to upload resume",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// DELETE - Delete Resume
// ==========================================
export async function DELETE() {
  try {
    await connectDB();

    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume not found",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================
    // Delete from Cloudinary
    // ==========================================

    if (resume.publicId) {
      try {
        await cloudinary.uploader.destroy(
          resume.publicId,
          {
            resource_type: "raw",
            type: "upload",
          }
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary Delete Error:",
          cloudinaryError
        );
      }
    }

    // ==========================================
    // Delete from MongoDB
    // ==========================================

    await Resume.deleteOne({
      _id: resume._id,
    });

    return NextResponse.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Resume Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete resume",
      },
      {
        status: 500,
      }
    );
  }
}
