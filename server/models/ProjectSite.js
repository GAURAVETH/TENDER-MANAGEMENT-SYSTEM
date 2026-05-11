import mongoose from "mongoose";

const projectSiteSchema = new mongoose.Schema(
    {
        siteName: {
            type: String,
            required: true,
        },

        siteType: {
            type: String,
            enum: [
                "metro",
                "gas-pipeline",
                "road",
                "bridge",
            ],
        },

        location: {
            type: String,
            required: true,
        },

        receivedMaterials: [
            {
                material: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Material",
                },

                receivedDate: {
                    type: Date,
                    default: Date.now,
                },

                siteImages: [String],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const ProjectSite = mongoose.model(
    "ProjectSite",
    projectSiteSchema
);

export default ProjectSite;