import mongoose from "mongoose";

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "myzon";
  const localUri = "mongodb://127.0.0.1:27017/myzon";

  const tryConnect = async (uri, label) => {
    const conn = await mongoose.connect(uri, { dbName });
    console.log(`✅ MongoDB Connected (${label}): ${conn.connection.host}`);
    return conn;
  };

  try {
    if (atlasUri) {
      return await tryConnect(atlasUri, "Atlas");
    }

    return await tryConnect(localUri, "Local");
  } catch (error) {
    const isAtlasFailure = Boolean(atlasUri) && (
      error?.message?.includes("querySrv") ||
      error?.message?.includes("ECONNREFUSED") ||
      error?.message?.includes("ENOTFOUND") ||
      error?.code === "ECONNREFUSED"
    );

    if (isAtlasFailure) {
      console.warn("⚠️ Atlas MongoDB connection failed. Retrying with local MongoDB...");
      try {
        return await tryConnect(localUri, "Local fallback");
      } catch (localError) {
        console.error("❌ MongoDB Error: Atlas connection failed and local MongoDB is not available.");
        console.error("Check your MongoDB Atlas username/password, allow your current IP in Atlas Network Access, or start MongoDB locally.");
        console.error(localError.message);
        process.exit(1);
      }
    }

    console.error("❌ MongoDB Error:", error.message);
    console.error("Check your MONGO_URI, username/password, or local MongoDB service status.");
    process.exit(1);
  }
};

export default connectDB;
