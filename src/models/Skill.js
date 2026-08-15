import mongoose from "mongoose";

// ==========================================
// SKILL SCHEMA
// ==========================================

const SkillSchema = new mongoose.Schema(
  {
    // ========================================
    // SKILL NAME
    // ========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================
    // CATEGORY
    // ========================================

    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Tools"],
      default: "Frontend",
    },

    // ========================================
    // SKILL LEVEL
    // ========================================

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 50,
    },

    // ========================================
    // ICON
    // ========================================

    icon: {
      type: String,
      default: "CodeXml",
    },

    // ========================================
    // COLOR
    // ========================================

    color: {
      type: String,
      default: "#00d4ff",
    },

    // ========================================
    // SHOW IN ORBIT
    // ========================================

    showInOrbit: {
      type: Boolean,
      default: true,
    },

    // ========================================
    // ORDER
    // ========================================

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// MODEL
// ==========================================

const Skill =
  mongoose.models.Skill ||
  mongoose.model("Skill", SkillSchema);

export default Skill;