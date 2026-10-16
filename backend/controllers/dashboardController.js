import Service from "../models/Service.js";
import ServiceRequest from "../models/ServiceRequest.js";

export const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.userId;

        const [
            totalServices,
            incomingRequests,
            outgoingRequests,
            recentIncoming,
            recentOutgoing,
        ] = await Promise.all([
            // Services offered by the logged-in user
            Service.countDocuments({ owner: userId }),

            // Requests received for the user's services
            ServiceRequest.countDocuments({ owner: userId }),

            // Requests sent by the logged-in user
            ServiceRequest.countDocuments({ requester: userId }),

            // Latest requests received
            ServiceRequest.find({ owner: userId })
                .populate("service", "title category")
                .populate("requester", "fullName avatar")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),

            // Latest requests sent
            ServiceRequest.find({ requester: userId })
                .populate("service", "title category")
                .populate("owner", "fullName avatar")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                totalServices,
                incomingRequests,
                outgoingRequests,
            },
            recentIncoming,
            recentOutgoing,
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load dashboard data.",
        });
    }
};
