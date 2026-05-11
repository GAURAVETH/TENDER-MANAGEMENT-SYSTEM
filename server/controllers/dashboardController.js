import Tender from "../models/Tender.js";
import Material from "../models/Material.js";
import User from "../models/User.js";

export const adminDashboard = async (req, res) => {
    try {

        const totalTenders =
            await Tender.countDocuments();

        const completedTenders =
            await Tender.countDocuments({
                status: "completed",
            });

        const totalMaterials =
            await Material.countDocuments();

        const managers =
            await User.countDocuments({
                role: "manager",
            });

        res.status(200).json({
            totalTenders,
            completedTenders,
            totalMaterials,
            managers,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const managerDashboard = async (req, res) => {
    try {

        const assignedTenders =
            await Tender.find({
                assignedManagers: req.user.id,
            });

        const materials = await Material.find({
            uploadedBy: req.user.id,
        });

        res.status(200).json({
            assignedTenders,
            materials,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};