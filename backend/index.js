import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import ServiceRequest from "./models/ServiceRequest.js";
import { saveMessage } from "./controllers/messageController.js";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 8081;
const CLIENT_URLS = [
    "http://localhost:5173",
    "https://skill-sync-sooty-eight.vercel.app",
    "https://skill-sync-ps9m83v7s-bansalrujul07s-projects.vercel.app",
    "https://skill-sync-git-main-bansalrujul07s-projects.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an Origin header, such as server-to-server requests.
            if (!origin || CLIENT_URLS.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to SkillSync API",
    });
});

const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_URLS,
        credentials: true,
    },
});

// Authenticate each Socket.IO connection using the existing login cookie.
io.use((socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie || "";

        const tokenCookie = cookieHeader
            .split(";")
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith("token="));

        if (!tokenCookie) {
            return next(new Error("Authentication required. Please log in."));
        }

        const token = decodeURIComponent(
            tokenCookie.substring("token=".length)
        );

        if (!process.env.jwt_secret) {
            return next(new Error("Server authentication is not configured."));
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);

        if (!decoded.userId) {
            return next(new Error("Invalid login session."));
        }

        socket.userId = decoded.userId;
        next();
    } catch {
        next(new Error("Invalid or expired login session."));
    }
});

io.on("connection", (socket) => {
    console.log(`Authenticated socket connected: ${socket.id}`);

    // Join only conversations the logged-in user is allowed to access.
    socket.on("chat:join", async (requestId, acknowledge) => {
        const reply =
            typeof acknowledge === "function" ? acknowledge : () => {};

        try {
            if (!mongoose.Types.ObjectId.isValid(requestId)) {
                return reply({
                    success: false,
                    message: "Invalid service request ID.",
                });
            }

            const request = await ServiceRequest.findOne({
                _id: requestId,
                status: "accepted",
                $or: [
                    { requester: socket.userId },
                    { owner: socket.userId },
                ],
            });

            if (!request) {
                return reply({
                    success: false,
                    message: "Chat unavailable or access denied.",
                });
            }

            socket.join(`request:${requestId}`);

            return reply({
                success: true,
                message: "Joined chat successfully.",
            });
        } catch (error) {
            console.error("Join chat error:", error.message);

            return reply({
                success: false,
                message: "Unable to join this chat.",
            });
        }
    });

    // Validate, save, and broadcast each new message.
    socket.on("chat:send", async (payload, acknowledge) => {
        const reply =
            typeof acknowledge === "function" ? acknowledge : () => {};

        try {
            const { requestId, content } = payload || {};

            if (!mongoose.Types.ObjectId.isValid(requestId)) {
                return reply({
                    success: false,
                    message: "Invalid service request ID.",
                });
            }

            const room = `request:${requestId}`;

            if (!socket.rooms.has(room)) {
                return reply({
                    success: false,
                    message: "Join the conversation before sending a message.",
                });
            }

            const message = await saveMessage(
                requestId,
                socket.userId,
                content
            );

            // Deliver the saved message to both participants.
            io.to(room).emit("chat:new", message);

            return reply({
                success: true,
                message: "Message sent.",
            });
        } catch (error) {
            return reply({
                success: false,
                message: error.message || "Unable to send message.",
            });
        }
    });

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

app.set("io", io);

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

        httpServer.listen(PORT, () => {
            console.log(`SkillSync server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();