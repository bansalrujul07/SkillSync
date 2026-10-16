import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

serviceRequestSchema.index(
  { service: 1, requester: 1 },
  { unique: true }
);

const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);

export default ServiceRequest;