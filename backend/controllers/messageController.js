import mongoose from "mongoose";
import Message from "../models/Message.js";
import ServiceRequest from "../models/ServiceRequest.js";

const getAuthorizedRequest = async (requestId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return null;
    }

    return ServiceRequest.findOne({
        _id: requestId,
        status: "accepted",
        $or: [
            { requester: userId },
            { owner: userId },
        ],
    });
};

export const getMessages = async (req, res) => {
    try {
        const request = await getAuthorizedRequest(
            req.params.requestId,
            req.userId
        );

        if (!request) {
            return res.status(403).json({
                success: false,
                message:
                    "Chat is unavailable. Only participants of accepted requests can access it.",
            });
        }

        const messages = await Message.find({
            serviceRequest: request._id,
        })
            .populate("sender", "fullName name")
            .sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error("Get messages error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to load messages",
        });
    }
};

export const saveMessage = async (requestId, userId, content) => {
    if (typeof content !== "string") {
        throw new Error("Message must be text");
    }

    const trimmedContent = content.trim();

    if (!trimmedContent || trimmedContent.length > 2000) {
        throw new Error("Message must contain 1–2000 characters");
    }

    const request = await getAuthorizedRequest(requestId, userId);

    if (!request) {
        throw new Error("Chat is unavailable or you are not authorized");
    }

    const message = await Message.create({
        serviceRequest: request._id,
        sender: userId,
        content: trimmedContent,
    });

    return Message.findById(message._id).populate(
        "sender",
        "fullName name"
    );
};