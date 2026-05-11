import express from "express";

import {
    addMaterial,
    getTenderMaterials,
    getSingleMaterial,
    updateMaterialStatus,
    deleteMaterial,
} from "../controllers/materialController.js";

import { protect } from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
    materialValidation,
} from "../utils/validationRules.js";

const router = express.Router();

router.post(
    "/",
    protect,
    materialValidation,
    validate,
    addMaterial
);

router.get(
    "/tender/:id",
    protect,
    getTenderMaterials
);

router.get(
    "/:id",
    protect,
    getSingleMaterial
);

router.put(
    "/:id/status",
    protect,
    updateMaterialStatus
);

router.delete(
    "/:id",
    protect,
    deleteMaterial
);

export default router;