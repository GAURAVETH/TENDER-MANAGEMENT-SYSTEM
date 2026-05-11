import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  registerValidation,
} from "../utils/validationRules.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post("/login", login);

export default router;