import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("Connected to DB successfully");
});

export default mongoose;
