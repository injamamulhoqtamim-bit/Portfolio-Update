import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "My Resume",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      default: "resume.pdf",
    },
  },
  {
    timestamps: true,
  }
);

const Resume =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default Resume;