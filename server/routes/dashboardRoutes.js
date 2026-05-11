import express from "express";

import {
    adminDashboard,
    managerDashboard,
} from "../controllers/dashboardController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/admin",
    protect,
    adminOnly,
    adminDashboard
);

router.get(
    "/manager",
    protect,
    managerDashboard
);

export default router;