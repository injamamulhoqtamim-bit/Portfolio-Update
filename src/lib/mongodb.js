import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    };

    console.log(
      "🔄 Connecting to MongoDB Atlas..."
    );

    cached.promise = mongoose
      .connect(
        MONGODB_URI,
        options
      )
      .then((mongooseInstance) => {
        console.log(
          "✅ Connected to MongoDB Atlas"
        );

        return mongooseInstance;
      })
      .catch((error) => {
        console.error(
          "❌ MongoDB Connection Error:",
          error
        );

        cached.promise = null;

        throw error;
      });
  }

  try {
    cached.conn =
      await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;