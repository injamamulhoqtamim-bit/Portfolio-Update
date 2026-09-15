import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";

export const runtime = "nodejs";

/* =========================================================
   ADMIN AUTHENTICATION
   ========================================================= */

async function isAdmin() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("admin_token")?.value;

    if (!token) {
      console.warn(
        "⚠️ ADMIN AUTH: admin_token cookie not found."
      );

      return false;
    }

    const adminSecret =
      process.env.ADMIN_SECRET;

    if (!adminSecret) {
      console.error(
        "❌ ADMIN AUTH: ADMIN_SECRET is missing."
      );

      return false;
    }

    const secret = new TextEncoder().encode(
      adminSecret
    );

    const { payload } = await jwtVerify(
      token,
      secret,
      {
        algorithms: ["HS256"],
      }
    );

    if (payload?.role !== "admin") {
      console.warn(
        "⚠️ ADMIN AUTH: JWT role is not admin."
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "❌ ADMIN JWT VERIFY ERROR:",
      error
    );

    return false;
  }
}

/* =========================================================
   GET COMMENTS
   Public
   ========================================================= */

export async function GET() {
  try {
    await connectDB();

    const comments = await Comment.find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error(
      "❌ GET COMMENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load comments.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST COMMENT
   Public
   ========================================================= */

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const name =
      body?.name?.trim() || "";

    const relation =
      body?.relation?.trim() || "";

    const message =
      body?.message?.trim() || "";

    /* -------------------------------------------------------
       Required fields
    ------------------------------------------------------- */

    if (!name || !relation || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, relation and comment are required.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       Name validation
    ------------------------------------------------------- */

    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name must be at least 2 characters.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       Relation validation
    ------------------------------------------------------- */

    if (relation.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Relation must be at least 2 characters.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       Comment validation
    ------------------------------------------------------- */

    if (message.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment must be at least 3 characters.",
        },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment is too long.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------------------------
       Duplicate protection
       Same name + same message within 60 seconds
    ------------------------------------------------------- */

    const recentDuplicate =
      await Comment.findOne({
        name,
        message,
        createdAt: {
          $gte: new Date(
            Date.now() - 60 * 1000
          ),
        },
      });

    if (recentDuplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please wait before posting the same comment again.",
        },
        { status: 429 }
      );
    }

    /* -------------------------------------------------------
       Create comment
    ------------------------------------------------------- */

    const comment =
      await Comment.create({
        name,
        relation,
        message,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Comment posted successfully.",
        data: comment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "❌ CREATE COMMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to post comment.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH COMMENT
   Admin only
   ========================================================= */

export async function PATCH(request) {
  try {
    const admin = await isAdmin();

    if (!admin) {
      console.warn(
        "⚠️ PATCH COMMENT BLOCKED: Invalid or missing admin_token."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized. Please login as admin.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const id = body?.id;

    const reply =
      body?.reply?.trim() || "";

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment ID is required.",
        },
        { status: 400 }
      );
    }

    if (reply.length > 1500) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Reply is too long.",
        },
        { status: 400 }
      );
    }

    const comment =
      await Comment.findById(id);

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment not found.",
        },
        { status: 404 }
      );
    }

    comment.reply = reply;

    comment.repliedAt = reply
      ? new Date()
      : null;

    await comment.save();

    return NextResponse.json({
      success: true,

      message: reply
        ? "Reply added successfully."
        : "Reply removed successfully.",

      data: comment,
    });
  } catch (error) {
    console.error(
      "❌ REPLY COMMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update reply.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE COMMENT
   Admin only
   ========================================================= */

export async function DELETE(request) {
  try {
    const admin = await isAdmin();

    if (!admin) {
      console.warn(
        "⚠️ DELETE COMMENT BLOCKED: Invalid or missing admin_token."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized. Please login as admin.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment ID is required.",
        },
        { status: 400 }
      );
    }

    const deleted =
      await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Comment deleted successfully.",
    });
  } catch (error) {
    console.error(
      "❌ DELETE COMMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete comment.",
      },
      { status: 500 }
    );
  }
}