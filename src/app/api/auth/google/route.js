import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    /*
     * =========================================================
     * GOOGLE OAUTH CALLBACK URL
     *
     * Priority:
     * 1. NEXT_PUBLIC_SITE_URL
     * 2. Current request origin
     *
     * This makes the same code work on:
     *
     * Local:
     * http://localhost:3000
     *
     * Production:
     * https://injamamul.vercel.app
     * =========================================================
     */

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.nextUrl.origin;

    const cleanSiteUrl = siteUrl.replace(/\/$/, "");

    const redirectUri =
      `${cleanSiteUrl}/api/auth/google/callback`;

    /*
     * =========================================================
     * GOOGLE OAUTH OPTIONS
     * =========================================================
     */

    const options = {
      redirect_uri: redirectUri,

      client_id: process.env.GOOGLE_CLIENT_ID,

      response_type: "code",

      prompt: "consent",

      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    /*
     * =========================================================
     * CHECK GOOGLE CLIENT ID
     * =========================================================
     */

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error(
        "❌ GOOGLE_CLIENT_ID is missing."
      );

      return NextResponse.redirect(
        new URL(
          "/admin/login?error=ServerError",
          request.url
        )
      );
    }

    /*
     * =========================================================
     * CREATE GOOGLE AUTH URL
     * =========================================================
     */

    const qs = new URLSearchParams(options);

    const googleAuthUrl =
      `${rootUrl}?${qs.toString()}`;

    console.log(
      "🔐 Google OAuth Redirect URI:",
      redirectUri
    );

    /*
     * =========================================================
     * REDIRECT USER TO GOOGLE
     * =========================================================
     */

    return NextResponse.redirect(
      googleAuthUrl
    );
  } catch (error) {
    console.error(
      "❌ GOOGLE AUTH ROUTE ERROR:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/admin/login?error=ServerError",
        request.url
      )
    );
  }
}