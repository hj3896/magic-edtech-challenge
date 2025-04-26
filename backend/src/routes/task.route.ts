import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskForId,
} from "../controllers/task.controller";

import { validateTask } from "../utils/validate";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Task API
 *     description: Task management for users
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       - Task API
 *     summary: Create a new task
 *     description: Create a new task for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - due
 *               - complete
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               due:
 *                 type: string
 *                 format: date-time
 *               complete:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid task data
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Task API
 *     summary: Get all tasks for the authenticated user
 *     description: Retrieve a list of all tasks for the authenticated user.
 *     responses:
 *       200:
 *         description: List of tasks for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   due:
 *                     type: string
 *                     format: date-time
 *                   complete:
 *                     type: boolean
 *                   created_by:
 *                     type: string
 *                   updated_by:
 *                     type: string
 *                   is_active:
 *                     type: boolean
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 *
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Task API
 *     summary: Get single task for the authenticated user
 *     description: Retrieve a task for provided Id for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to get
 *     responses:
 *       200:
 *         description: Task for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 due:
 *                   type: string
 *                   format: date-time
 *                 complete:
 *                   type: boolean
 *                 created_by:
 *                   type: string
 *                 updated_by:
 *                   type: string
 *                 is_active:
 *                   type: boolean
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Task API
 *     summary: Update an existing task
 *     description: Update the details of a specific task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - due
 *               - complete
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               due:
 *                 type: string
 *                 format: date-time
 *               complete:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid data provided for task update
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Task API
 *     summary: Delete a task
 *     description: Delete a specific task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to be deleted
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

router.post("/tasks", validateTask, createTask);

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskForId);

router.put("/tasks/:id", validateTask, updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
