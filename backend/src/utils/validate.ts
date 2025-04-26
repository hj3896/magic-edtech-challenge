import { body } from "express-validator";

export const validateTask = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
];

export const validateAuth = [
  body("username").isString().notEmpty(),
  body("password").isLength({ min: 6 }),
];
