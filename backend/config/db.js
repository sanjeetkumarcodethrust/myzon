import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "myzon";
  const localUri = `mongodb://127.0.0.1:27017/${dbName}`;

  const tryConnect = async (uri, label) => {
    const conn = await mongoose.connect(uri, { dbName });
    console.log(`✅ MongoDB Connected (${label}): ${conn.connection.host}`);
    return conn;
  };

  const tryMemoryFallback = async () => {
    if (memoryServer) {
      return await tryConnect(memoryServer.getUri(), "InMemory");
    }

    console.warn("⚠️ No MongoDB server detected. Starting an in-memory MongoDB instance for development...");
    memoryServer = await MongoMemoryServer.create({ instance: { dbName } });
    return await tryConnect(memoryServer.getUri(), "InMemory");
  };

  try {
    if (atlasUri) {
      try {
        return await tryConnect(atlasUri, "Atlas");
      } catch (atlasError) {
        console.warn("⚠️ Atlas MongoDB connection failed. Retrying with local MongoDB...");
      }
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
    process.exit(1);
  }
};

export default connectDB;
