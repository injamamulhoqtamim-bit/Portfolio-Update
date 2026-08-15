import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      console.error("❌ ADMIN_SECRET is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Admin authentication is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const secret = new TextEncoder().encode(adminSecret);

    const { payload } = await jwtVerify(
      token,
      secret
    );

    if (payload.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({
      success: true,
      admin: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error(
      "❌ Admin authentication verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired admin session.",
      },
      {
        status: 401,
      }
    );
  }
}