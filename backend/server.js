import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js"; 
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    connectDB();
    console.log("Server running on port 8000");
});
