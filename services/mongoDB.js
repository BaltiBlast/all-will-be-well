import mongoose from "mongoose";
import "dotenv/config";

const { DB_URI, NODE_ENV } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
    if (NODE_ENV === "dev") {
      console.log("✅ Connected to MongoDB with Mongoose !");
    }
  })
  .catch((error) => {
    console.error("❌ Connection to MongoDB failed:", error);
    process.exit(1);
  });

export default mongoose;
