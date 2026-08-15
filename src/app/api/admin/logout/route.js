import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Remove the JWT authentication cookie
    response.cookies.delete("admin_token");

    return response;
  } catch (error) {
    console.error("Admin Logout Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
      },
      {
        status: 500,
      }
    );
  }
}
