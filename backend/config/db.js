import mongoose from "mongoose";

let memoryServer;

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

  const tryMemoryFallback = async () => {
    if (isCloud) {
      throw new Error("MongoDB Atlas connection failed in production. Please verify MONGO_URI and ensure MongoDB Atlas Network Access allows 0.0.0.0/0.");
    }

    if (memoryServer) {
      return await tryConnect(memoryServer.getUri(), "InMemory");
    }

    console.warn("⚠️ No MongoDB server detected. Starting an in-memory MongoDB instance for development...");
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    memoryServer = await MongoMemoryServer.create({ instance: { dbName } });
    return await tryConnect(memoryServer.getUri(), "InMemory");
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
      return await tryConnect(localUri, "Local");
    } catch (localError) {
      console.warn("⚠️ Local MongoDB connection failed. Falling back to in-memory MongoDB...");
      return await tryMemoryFallback();
    }
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    console.error("Check your MONGO_URI, username/password, MongoDB service status, or your local environment.");
    if (!isCloud) {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
