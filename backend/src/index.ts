import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

// Config imports
import { setupCloudinary } from "./config/cloudinary";
import { connectDB } from "./config/mongodb";

// Routes import statements
import authRouter from "./routes/AuthRoute";
import myUserRouter from "./routes/MyUserRoute";
import myHotelsRouter from "./routes/MyHotelsRoute";
import hotelsRouter from "./routes/HotelsRoute";
import bookingsRouter from "./routes/MyBookingsRoute";

setupCloudinary();
connectDB();

const app = express();
const PORT = 7000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello from express endpoint",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", myUserRouter);
app.use("/api/my-hotels", myHotelsRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/my-bookings", bookingsRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:7000");
});
