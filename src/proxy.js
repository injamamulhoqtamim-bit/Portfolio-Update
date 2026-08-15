import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET
);

async function verifyAdmin(token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("admin_token")?.value;

  // ==============================
  // ADMIN LOGIN PAGE
  // ==============================

  if (pathname === "/admin/login") {
    // Already logged in
    if (token && (await verifyAdmin(token))) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    return NextResponse.next();
  }

  // ==============================
  // PROTECT ADMIN ROUTES
  // ==============================

  if (pathname.startsWith("/admin")) {
    if (!token || !(await verifyAdmin(token))) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};