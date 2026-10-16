import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            price,
            exchangeType,
        } = req.body;

        // Validate required fields
        if (
            !title?.trim() ||
            !description?.trim() ||
            !category?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Title, description, and category are required",
            });
        }

        // Validate service arrangement
        if (
            !["skill-exchange", "free", "paid"].includes(exchangeType)
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid service arrangement",
            });
        }

        // Validate price
        const numericPrice = Number(price);

        if (
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(numericPrice) ||
            numericPrice < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid price",
            });
        }

        if (exchangeType === "paid" && numericPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Paid services must have a price greater than zero",
            });
        }

        if (exchangeType !== "paid" && numericPrice !== 0) {
            return res.status(400).json({
                success: false,
                message:
                    "Free and skill-exchange services must have a price of zero",
            });
        }

        // Create service
        const service = await Service.create({
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            exchangeType,
            price: numericPrice,
            owner: req.userId,
        });

        // Return service with owner details
        await service.populate("owner", "fullName avatar");

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            service,
        });
    } catch (error) {
        console.error("Create service error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to create service",
        });
    }
};

export const getServices = async (req, res) => {
    try {
        const { search, category } = req.query;

        const filter = { status: "active" };

        if (category) {
            filter.category = {
                $regex: category,
                $options: "i",
            };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        const services = await Service.find(filter)
            .populate("owner", "fullName avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: services.length,
            services,
        });
    } catch (error) {
        console.error("Get services error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch services",
        });
    }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      status: "active",
    }).populate("owner", "fullName avatar bio");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    console.error("Get service by ID error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch service",
    });
  }
};

export const getMyServices = async (req, res) => {
    try {
        const services = await Service.find({
            owner: req.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: services.length,
            services,
        });
    } catch (error) {
        console.error("Get my services error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch your services",
        });
    }
};