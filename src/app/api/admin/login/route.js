import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body?.email?.trim() || "";
    const password = body?.password || "";

    const adminEmail = process.env.ADMIN_EMAIL?.trim() || "";
    const adminPassword = process.env.ADMIN_PASSWORD || "";
    const adminSecret = process.env.ADMIN_SECRET || "";

    /* -------------------------------------------------------
       Check environment variables
    ------------------------------------------------------- */

    if (!adminEmail || !adminPassword || !adminSecret) {
      console.error(
        "❌ Admin authentication environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin authentication is not configured.",
        },
        { status: 500 }
      );
    }

    /* -------------------------------------------------------
       Validate input
    ------------------------------------------------------- */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       Check credentials
    ------------------------------------------------------- */

    const emailMatch =
      email.toLowerCase() === adminEmail.toLowerCase();

    const passwordMatch =
      password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    /* -------------------------------------------------------
       Create JWT
    ------------------------------------------------------- */

    const secret = new TextEncoder().encode(adminSecret);

    const token = await new SignJWT({
      role: "admin",
      email: adminEmail,
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    /* -------------------------------------------------------
       Create response
    ------------------------------------------------------- */

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    /* -------------------------------------------------------
       Set HTTP-only admin cookie
    ------------------------------------------------------- */

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,

      // localhost => false
      // production => true
      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",
      path: "/",

      // 8 hours
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("❌ ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during login.",
      },
      { status: 500 }
    );
  }
}