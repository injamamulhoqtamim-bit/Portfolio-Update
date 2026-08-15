import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import About from "@/models/About";

export async function GET() {
  try {
    await connectDB();

    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        name: "Md. Injamamul Hoq",
        location: "Banani BTCL Colony, Dhaka",
        email: "injamamulhoqtamim@gmail.com",
        education: "BSc in CSE",
        intro:
          "a passionate Frontend Developer who loves building modern and responsive web applications.",
        paragraph1:
          "I specialize in creating beautiful user interfaces using HTML, CSS, JavaScript, Tailwind CSS and React. I also enjoy exploring Cybersecurity and learning how to build more secure web systems.",
        paragraph2:
          "My goal is to become a professional developer who creates innovative and secure digital experiences for people around the world.",
      });
    }

    return NextResponse.json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error("GET About Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch About information.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      location,
      email,
      education,
      intro,
      paragraph1,
      paragraph2,
    } = body;

    if (
      !name?.trim() ||
      !location?.trim() ||
      !email?.trim() ||
      !education?.trim() ||
      !intro?.trim() ||
      !paragraph1?.trim() ||
      !paragraph2?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All About fields are required.",
        },
        { status: 400 }
      );
    }

    const about = await About.findOneAndUpdate(
      {},
      {
        name: name.trim(),
        location: location.trim(),
        email: email.trim(),
        education: education.trim(),
        intro: intro.trim(),
        paragraph1: paragraph1.trim(),
        paragraph2: paragraph2.trim(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "About information updated successfully.",
      data: about,
    });
  } catch (error) {
    console.error("PUT About Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update About information.",
      },
      { status: 500 }
    );
  }
}