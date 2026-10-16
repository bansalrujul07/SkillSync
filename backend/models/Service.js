import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Service title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Service description is required"],
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        category: {
            type: String,
            required: [true, "Service category is required"],
            trim: true,
        },
        exchangeType: {
            type: String,
            enum: ["skill-exchange", "free", "paid"],
            required: [true, "Service arrangement is required"],
            default: "skill-exchange",
        },
        price: {
            type: Number,
            required: [true, "Service price is required"],
            min: [0, "Price cannot be negative"],
            default: 0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;