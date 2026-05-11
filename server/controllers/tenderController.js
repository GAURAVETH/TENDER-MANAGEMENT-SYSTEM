import Tender from "../models/Tender.js";

export const createTender = async (req, res) => {
    try {

        const tender = await Tender.create(req.body);

        res.status(201).json(tender);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getTenders = async (req, res) => {
    try {

        const tenders = await Tender.find()
            .populate("assignedManagers", "name email");

        res.status(200).json(tenders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getSingleTender = async (req, res) => {
    try {

        const tender = await Tender.findById(req.params.id)
            .populate("assignedManagers", "name email");

        if (!tender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        res.status(200).json(tender);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const updateTender = async (req, res) => {
    try {

        const tender = await Tender.findById(req.params.id);

        if (!tender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        tender.tenderName =
            req.body.tenderName || tender.tenderName;

        tender.description =
            req.body.description || tender.description;

        tender.startDate =
            req.body.startDate || tender.startDate;

        tender.endDate =
            req.body.endDate || tender.endDate;

        tender.status =
            req.body.status || tender.status;

        await tender.save();

        res.status(200).json(tender);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const deleteTender = async (req, res) => {
    try {

        const tender = await Tender.findById(req.params.id);

        if (!tender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        await tender.deleteOne();

        res.status(200).json({
            message: "Tender deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const assignManager = async (req, res) => {
    try {

        const tender = await Tender.findById(req.params.id);

        if (!tender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        tender.assignedManagers = req.body.managers;

        await tender.save();

        const updatedTender = await Tender.findById(
            req.params.id
        ).populate("assignedManagers", "name email");

        res.status(200).json(updatedTender);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};