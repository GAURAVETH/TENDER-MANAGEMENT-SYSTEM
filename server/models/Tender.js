import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema(
    {
        tenderName: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["open", "in-progress", "completed"],
            default: "open",
        },

        assignedManagers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Tender = mongoose.model("Tender", tenderSchema);

export default Tender;