import { jwtVerify } from "jose";

export async function verifyAdmin(request) {
  try {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return null;
    }

    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      console.error("❌ ADMIN_SECRET is missing.");
      return null;
    }

    const encodedSecret = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(
      token,
      encodedSecret
    );

    if (payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("❌ Admin token verification failed:", error);
    return null;
  }
}