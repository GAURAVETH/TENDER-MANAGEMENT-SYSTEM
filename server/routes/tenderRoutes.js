import express from "express";

import {
    createTender,
    getTenders,
    getSingleTender,
    updateTender,
    deleteTender,
    assignManager,
} from "../controllers/tenderController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    adminOnly,
    createTender
);

router.get(
    "/",
    protect,
    getTenders
);

router.get(
    "/:id",
    protect,
    getSingleTender
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateTender
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteTender
);

router.put(
    "/assign/:id",
    protect,
    adminOnly,
    assignManager
);

export default router;