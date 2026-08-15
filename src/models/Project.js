import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    tech: {
      type: [String],
      default: [],
    },

    live: {
      type: String,
      default: "#",
    },

    code: {
      type: String,
      default: "#",
    },

    challenges: {
      type: String,
      default: "",
    },

    improvements: {
      type: String,
      default: "",
    },

    longDesc: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema, "projects");

export default Project;