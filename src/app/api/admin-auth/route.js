import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const username =
      body?.username?.trim() || "";

    const password =
      body?.password || "";

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username and password are required.",
        },
        { status: 400 }
      );
    }

    const adminUsername =
      process.env.ADMIN_USERNAME;

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (
      !adminUsername ||
      !adminPassword
    ) {
      console.error(
        "ADMIN_USERNAME or ADMIN_PASSWORD is missing from environment variables."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Admin authentication is not configured.",
        },
        { status: 500 }
      );
    }

    /*
     * Check credentials
     */
    if (
      username !== adminUsername ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    /*
     * Login successful.
     *
     * Create HTTP-only cookie.
     */
    const response =
      NextResponse.json({
        success: true,
        message:
          "Admin login successful.",
      });

    response.cookies.set({
      name: "admin_session",

      value: "authenticated",

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong during admin login.",
      },
      { status: 500 }
    );
  }
}