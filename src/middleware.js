
import { NextResponse } from "next/server";

export function middleware(request) {
  const path =
    request.nextUrl.pathname;

  // =========================================================
  // ADMIN ROUTES
  // =========================================================

  const isAdminRoute =
    path.startsWith("/admin");

  const isLoginPage =
    path === "/admin/login";

  // =========================================================
  // ADMIN JWT COOKIE
  // =========================================================

  const adminToken =
    request.cookies.get(
      "admin_token"
    )?.value;

  // =========================================================
  // 1. NOT LOGGED IN
  // =========================================================

  if (
    isAdminRoute &&
    !isLoginPage &&
    !adminToken
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  // =========================================================
  // 2. ALREADY LOGGED IN
  // =========================================================

  if (
    isLoginPage &&
    adminToken
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );
  }

  return NextResponse.next();
}

// =========================================================
// MIDDLEWARE MATCHER
// =========================================================

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
