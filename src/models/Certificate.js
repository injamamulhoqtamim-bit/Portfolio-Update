import mongoose from "mongoose";

const certificateSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      organization: {
        type: String,
        required: true,
        trim: true,
      },

      date: {
        type: String,
        required: true,
        trim: true,
      },

      displayOrder: {
        type: Number,
        default: 0,
      },

      imageUrl: {
        type: String,
        default: "",
        trim: true,
      },

      documentUrl: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model(
    "Certificate",
    certificateSchema
  );

export default Certificate;