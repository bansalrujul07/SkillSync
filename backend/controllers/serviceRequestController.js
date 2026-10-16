import Service from "../models/Service.js";
import ServiceRequest from "../models/ServiceRequest.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { message = "" } = req.body;

    if (typeof message !== "string" || message.trim().length > 500) {
      return res.status(400).json({
        success: false,
        message: "Message must be a string of at most 500 characters",
      });
    }

    const service = await Service.findOne({
      _id: serviceId,
      status: "active",
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or no longer available",
      });
    }

    if (service.owner.toString() === req.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own service",
      });
    }

    const existingRequest = await ServiceRequest.findOne({
      service: service._id,
      requester: req.userId,
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "You have already requested this service",
      });
    }

    const serviceRequest = await ServiceRequest.create({
      service: service._id,
      requester: req.userId,
      owner: service.owner,
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Service request submitted successfully",
      request: serviceRequest,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already requested this service",
      });
    }

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    console.error("Create service request error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit service request",
    });
  }
};

export const getIncomingRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({
            owner: req.userId,
        })
            .populate("service", "title category exchangeType price")
            .populate("requester", "fullName avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: requests.length,
            requests,
        });
    } catch (error) {
        console.error("Get incoming requests error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch incoming requests",
        });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be accepted or rejected",
            });
        }

        const request = await ServiceRequest.findOne({
            _id: requestId,
            owner: req.userId,
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Service request not found",
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending requests can be updated",
            });
        }

        request.status = status;
        await request.save();

        return res.status(200).json({
            success: true,
            message: `Request ${status} successfully`,
            request,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                success: false,
                message: "Service request not found",
            });
        }

        console.error("Update request status error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to update request status",
        });
    }
};
