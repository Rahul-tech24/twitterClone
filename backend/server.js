import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js"; 
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import dotenv from "dotenv";
import connectDB from "./db/db.js";

import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
