import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateAuth } from "../utils/validate";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth API
 *     description: Authentication and user management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth API
 *     summary: Register a new user
 *     description: Create a new user by providing a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/register", validateAuth, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth API
 *     summary: Login a user
 *     description: Login an existing user by providing username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", validateAuth, login);

export default router;
