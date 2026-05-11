import { body } from "express-validator";

export const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage(
            "Password must be at least 6 characters"
        ),
];

export const tenderValidation = [
    body("tenderName")
        .notEmpty()
        .withMessage("Tender name required"),

    body("description")
        .notEmpty()
        .withMessage("Description required"),
];

export const materialValidation = [
    body("materialName")
        .notEmpty()
        .withMessage("Material name required"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity required"),
];