import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;

        if (
            !title?.trim() ||
            !description?.trim() ||
            !category?.trim() ||
            price === undefined ||
            price === null ||
            price === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description, category, and price",
            });
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid non-negative number",
            });
        }

        const service = await Service.create({
            title,
            description,
            category,
            price: numericPrice,
            owner: req.userId,
        });

        const populatedService = await Service.findById(service._id)
            .populate("owner", "fullName avatar");

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            service: populatedService,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

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

        let filter = { status: "active" };

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

        res.status(200).json({
            success: true,
            count: services.length,
            services,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch services",
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
            message: "Failed to retrieve your services",
        });
    }
};
