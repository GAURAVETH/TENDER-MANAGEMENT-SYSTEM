import ProjectSite from "../models/ProjectSite.js";

export const createProjectSite = async (req, res) => {
    try {

        const site = await ProjectSite.create(req.body);

        res.status(201).json(site);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getProjectSites = async (req, res) => {
    try {

        const sites = await ProjectSite.find()
            .populate(
                "receivedMaterials.material"
            );

        res.status(200).json(sites);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const receiveMaterial = async (req, res) => {
    try {

        const site = await ProjectSite.findById(
            req.params.siteId
        );

        if (!site) {
            return res.status(404).json({
                message: "Project Site not found",
            });
        }

        site.receivedMaterials.push({
            material: req.body.materialId,
            siteImages: req.body.siteImages,
        });

        await site.save();

        res.status(200).json(site);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};