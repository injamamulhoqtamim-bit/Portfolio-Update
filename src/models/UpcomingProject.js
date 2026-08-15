import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "Sparkles",
      trim: true,
    },
  },
  { _id: false }
);

const TechSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "Code2",
      trim: true,
    },
  },
  { _id: false }
);

const UpcomingProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    features: {
      type: [FeatureSchema],
      default: [],
    },

    tech: {
      type: [TechSchema],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UpcomingProject =
  mongoose.models.UpcomingProject ||
  mongoose.model("UpcomingProject", UpcomingProjectSchema);

export default UpcomingProject;