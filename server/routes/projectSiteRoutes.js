import express from "express";

import {
  createProjectSite,
  getProjectSites,
  receiveMaterial,
} from "../controllers/projectSiteController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createProjectSite
);

router.get(
  "/",
  protect,
  getProjectSites
);

router.put(
  "/receive/:siteId",
  protect,
  receiveMaterial
);

export default router;
