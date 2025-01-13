import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Connected to Database: ",
        process.env.MONGODB_CONNECTION_STRING,
      );
    }
  } catch (error: any) {
    console.log(error);
  }
};
