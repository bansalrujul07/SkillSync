import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        serviceRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceRequest",
            required: true,
            index: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: [2000, "Message cannot exceed 2000 characters"],
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.index({ serviceRequest: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;