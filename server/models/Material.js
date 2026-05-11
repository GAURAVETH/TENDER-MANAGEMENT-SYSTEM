import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
    {
        tender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tender",
            required: true,
        },

        materialName: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        unit: {
            type: String,
            required: true,
        },

        expectedDeliveryDate: {
            type: Date,
        },

        deliveryStatus: {
            type: String,
            enum: ["ordered", "in-transit", "delivered"],
            default: "ordered",
        },

        trackingHistory: [
            {
                status: {
                    type: String,
                },

                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        receiptImage: {
            type: String,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Material = mongoose.model(
    "Material",
    materialSchema
);

export default Material;