import Material from "../models/Material.js";

export const addMaterial = async (req, res) => {
    try {

        const {
            tender,
            materialName,
            quantity,
            unit,
            expectedDeliveryDate,
        } = req.body;

        const material = await Material.create({
            tender,
            materialName,
            quantity,
            unit,
            expectedDeliveryDate,

            uploadedBy: req.user.id,

            trackingHistory: [
                {
                    status: "ordered",
                },
            ],
        });

        res.status(201).json(material);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getTenderMaterials = async (req, res) => {
    try {

        const materials = await Material.find({
            tender: req.params.id,
        })
            .populate("uploadedBy", "name email")
            .populate("tender", "tenderName");

        res.status(200).json(materials);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getSingleMaterial = async (req, res) => {
    try {

        const material = await Material.findById(
            req.params.id
        )
            .populate("uploadedBy", "name email")
            .populate("tender", "tenderName");

        if (!material) {
            return res.status(404).json({
                message: "Material not found",
            });
        }

        res.status(200).json(material);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const updateMaterialStatus = async (req, res) => {
    try {

        const material = await Material.findById(
            req.params.id
        );

        if (!material) {
            return res.status(404).json({
                message: "Material not found",
            });
        }

        material.deliveryStatus =
            req.body.deliveryStatus;

        material.trackingHistory.push({
            status: req.body.deliveryStatus,
        });

        await material.save();

        const io = req.app.get("io");

        io.emit("materialStatusUpdated", {
            materialId: material._id,
            status: material.deliveryStatus,
            trackingHistory: material.trackingHistory,
        });

        res.status(200).json(material);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const deleteMaterial = async (req, res) => {
    try {

        const material = await Material.findById(
            req.params.id
        );

        if (!material) {
            return res.status(404).json({
                message: "Material not found",
            });
        }

        await material.deleteOne();

        res.status(200).json({
            message: "Material deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};