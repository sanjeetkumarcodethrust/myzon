import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const atlasUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "myzon";
  const isCloud = process.env.NODE_ENV === "production" || !!process.env.VERCEL || !!process.env.RENDER;

  const tryConnect = async (uri, label) => {
    const conn = await mongoose.connect(uri, { 
      dbName, 
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected (${label}): ${conn.connection.host}`);
    return conn;
  };

  try {
    if (atlasUri) {
      try {
        return await tryConnect(atlasUri, "Atlas");
      } catch (atlasError) {
        console.warn(`⚠️ Atlas MongoDB connection failed: ${atlasError.message}`);
        if (isCloud) {
          throw new Error(`MongoDB Atlas connection error: ${atlasError.message}. Please check MongoDB Atlas Network Access (whitelist 0.0.0.0/0).`);
        }
      }
    }

    if (isCloud) {
      throw new Error("No MONGO_URI configured for cloud/production environment.");
    }

    try {
      const localUri = `mongodb://127.0.0.1:27017/${dbName}`;
      return await tryConnect(localUri, "Local");
    } catch (localError) {
      console.warn("⚠️ Local MongoDB connection failed:", localError.message);
      throw new Error("Unable to connect to MongoDB. Please ensure MongoDB service is running locally or provide a valid MONGO_URI.");
    }
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    console.error("💡 Tip: Agar Atlas se connect nahi ho raha to MongoDB Atlas > Network Access me jakar 0.0.0.0/0 whitelist karein.");
    throw error;
  }
};

export default connectDB;
