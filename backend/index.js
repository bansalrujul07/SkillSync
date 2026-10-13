import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 8081;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to SkillSync API",
    });
});

// app.get("/api/health", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "SkillSync API is running",
//     });
// });

const startServer = async () => {
    try {
        const mongoUrl = process.env.DB_URL || process.env.db_url;

        if (!mongoUrl) {
            throw new Error(
                "MongoDB connection string is missing. Check your environment configuration."
            );
        }

        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`SkillSync server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();