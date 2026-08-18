import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    // degree / title
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    passingYear: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔴 EXPERIENCE vs EDUCATION ডিফাইন করার জন্য গুরুত্বপূর্ণ ফিল্ড
    type: {
      type: String,
      enum: ["education", "course", "experience", "research"],
      default: "education",
      lowercase: true,
      trim: true,
    },

    // অতিরিক্ত অপশনাল ফিল্ডসমূহ
    points: {
      type: [String],
      default: [],
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Education =
  mongoose.models.Education ||
  mongoose.model(
    "Education",
    EducationSchema,
    "education"
  );

export default Education;