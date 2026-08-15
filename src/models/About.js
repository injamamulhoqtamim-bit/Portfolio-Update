import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    education: {
      type: String,
      required: true,
      trim: true,
    },

    intro: {
      type: String,
      required: true,
      trim: true,
    },

    paragraph1: {
      type: String,
      required: true,
      trim: true,
    },

    paragraph2: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema);