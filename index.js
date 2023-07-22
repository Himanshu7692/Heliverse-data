import express from "express";
// import { connectDB } from "./config/connectdb.js";
import { connectDB } from "./config/connectDB.js";
import dotenv from "dotenv";
import userRotes from "./routes/userRotes.js";
import cors from "cors";

dotenv.config();

const app = express();
const DATABASE_URI = process.env.DATABASE_URI;
connectDB(DATABASE_URI);
app.use(cors());
app.use(express.json());

app.use("/api", userRotes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
