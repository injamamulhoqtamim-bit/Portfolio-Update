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

    const usernameMatch =
      username.toLowerCase() ===
      adminUsername.trim().toLowerCase();

    const passwordMatch =
      password === adminPassword;

    if (!usernameMatch || !passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(adminSecret);

    const token = await new SignJWT({
      email: adminUsername.trim(),
      role: "admin",
      authProvider: "password",
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful.",
    });

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