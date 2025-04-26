import { body } from "express-validator";

export const validateTask = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional().isString(),
];

export const validateAuth = [
  body("username").isString().notEmpty(),
  body("password").isLength({ min: 6 }),
];
