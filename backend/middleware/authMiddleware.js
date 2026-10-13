
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in to access this resource",
            });
        }

        if (!process.env.jwt_secret) {
            console.error("jwt_secret is not configured");

            return res.status(500).json({
                success: false,
                message: "Server authentication configuration error",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.jwt_secret
        );

        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Session does not contain a user ID. Please log in again.",
            });
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired session. Please log in again.",
            });
        }

        console.error("Authentication error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Authentication failed due to a server error",
        });
    }
};
