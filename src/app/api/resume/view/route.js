import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const runtime = "nodejs";

// ==========================================
// GET - Open Resume PDF
// ==========================================
export async function GET() {
  try {
    await connectDB();

    // Get latest resume
    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    if (!resume) {
      return new NextResponse(
        "Resume not found",
        {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }

    if (!resume.fileUrl) {
      return new NextResponse(
        "Resume file URL not found",
        {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }

    // ==========================================
    // Fetch PDF from Cloudinary
    // ==========================================

    const pdfResponse = await fetch(resume.fileUrl);

    if (!pdfResponse.ok) {
      return new NextResponse(
        "Failed to fetch resume PDF",
        {
          status: 500,
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // ==========================================
    // Return PDF to browser
    // ==========================================

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",

        // IMPORTANT:
        // inline = browser PDF viewer-এ দেখাবে
        // attachment দিলে download হয়ে যেত
        "Content-Disposition": "inline",

        "Cache-Control":
          "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("View Resume Error:", error);

    return new NextResponse(
      "Failed to open resume",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}