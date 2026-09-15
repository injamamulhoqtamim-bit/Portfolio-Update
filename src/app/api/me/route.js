
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request) {
  try {
    const token = request.cookies.get("admin_token")?.value;

    // No admin token
    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      console.error("ADMIN_SECRET is missing in environment variables");

      return NextResponse.json(
        {
          authenticated: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Verify JWT
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      {
        algorithms: ["HS256"],
      }
    );

    // Make sure this is an admin token
    if (payload.role !== "admin") {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      email: payload.email,
      role: payload.role,
    });
  } catch (error) {
    console.error("Admin authentication error:", error);

    return NextResponse.json(
      {
        authenticated: false,
        message: "Invalid or expired admin session",
      },
      { status: 401 }
    );
  }
}

