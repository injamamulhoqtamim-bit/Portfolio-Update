import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const username = body?.username?.trim() || "";
    const password = body?.password || "";

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required.",
        },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminUsername || !adminPassword || !adminSecret) {
      console.error(
        "ADMIN_USERNAME, ADMIN_PASSWORD or ADMIN_SECRET is missing from .env.local"
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin authentication is not configured.",
        },
        { status: 500 }
      );
    }

    // Check credentials
    if (
      username !== adminUsername ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    // JWT secret
    const secret = new TextEncoder().encode(adminSecret);

    // Create JWT
    const token = await new SignJWT({
      email: username,
      role: "admin",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    // Response
    const response = NextResponse.json({
      success: true,
      message: "Admin login successful.",
    });

    // Store JWT in httpOnly cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during admin login.",
      },
      { status: 500 }
    );
  }
}