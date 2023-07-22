import mongoose from "mongoose";

export const connectDB = async (DATABASE_URI) => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully of project db");
  } catch (error) {
    console.log(error);
  }
};
