import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export const runtime = "nodejs";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  /* =========================================================
     1. CHECK GOOGLE AUTHORIZATION CODE
  ========================================================= */

  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/admin/login?error=GoogleAuthFailed",
        request.url
      )
    );
  }

  try {
    /* =========================================================
       2. CHECK REQUIRED ENV VARIABLES
    ========================================================= */

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSecret = process.env.ADMIN_SECRET;

    if (
      !googleClientId ||
      !googleClientSecret ||
      !adminEmail ||
      !adminSecret
    ) {
      console.error(
        "❌ Google Admin Authentication environment variables are missing."
      );

      return NextResponse.redirect(
        new URL(
          "/admin/login?error=ServerError",
          request.url
        )
      );
    }

    /* =========================================================
       3. GOOGLE REDIRECT URI
    ========================================================= */

    const redirectUri = `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
    }/api/auth/google/callback`;

    /* =========================================================
       4. EXCHANGE GOOGLE CODE FOR ACCESS TOKEN
    ========================================================= */

    const resToken = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: googleClientId,
          client_secret: googleClientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
        cache: "no-store",
      }
    );

    const tokenData = await resToken.json();

    if (
      !resToken.ok ||
      !tokenData.access_token
    ) {
      console.error(
        "❌ Google Token Error:",
        tokenData
      );

      return NextResponse.redirect(
        new URL(
          "/admin/login?error=GoogleAuthFailed",
          request.url
        )
      );
    }

    /* =========================================================
       5. GET GOOGLE USER INFORMATION
    ========================================================= */

    const resUser = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: "no-store",
      }
    );

    const userData = await resUser.json();

    if (
      !resUser.ok ||
      !userData.email
    ) {
      console.error(
        "❌ Google User Info Error:",
        userData
      );

      return NextResponse.redirect(
        new URL(
          "/admin/login?error=GoogleAuthFailed",
          request.url
        )
      );
    }

    /* =========================================================
       6. AUTHORIZE ONLY ONE ADMIN GMAIL
    ========================================================= */

    const googleEmail = String(
      userData.email
    )
      .trim()
      .toLowerCase();

    const authorizedEmail = String(
      adminEmail
    )
      .trim()
      .toLowerCase();

    /* ---------------------------------------------------------
       IMPORTANT:
       Only ADMIN_EMAIL is allowed.
       Any other Google account is rejected.
    --------------------------------------------------------- */

    if (googleEmail !== authorizedEmail) {
      console.warn(
        "🚫 Unauthorized Google Admin Login Attempt:",
        googleEmail
      );

      return NextResponse.redirect(
        new URL(
          "/admin/login?error=UnauthorizedGmail",
          request.url
        )
      );
    }

    /* =========================================================
       7. CREATE ADMIN JWT
    ========================================================= */

    const secretKey = new TextEncoder().encode(
      adminSecret
    );

    const adminToken = await new SignJWT({
      email: googleEmail,
      role: "admin",
      name: userData.name || "Admin",
      picture: userData.picture || "",
      authProvider: "google",
    })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secretKey);

    /* =========================================================
       8. SET ADMIN COOKIE
    ========================================================= */

    const cookieStore = await cookies();

    cookieStore.set(
      "admin_token",
      adminToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    /* =========================================================
       9. REMOVE OLD SESSION COOKIE
    ========================================================= */

    cookieStore.set(
      "admin_session",
      "",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }
    );

    /* =========================================================
       10. SUCCESS → ADMIN PANEL
    ========================================================= */

    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );
  } catch (error) {
    console.error(
      "❌ GOOGLE CALLBACK ERROR:",
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