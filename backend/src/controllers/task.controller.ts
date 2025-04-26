import { Request, Response } from "express";
import Task from "../models/task";
import { log } from "../configs/logger";

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({
      ...req.body.task,
      created_by: req.user!.id,
      updated_by: req.user!.id,
    });
    res.status(201).json(task);
  } catch (err) {
    log.error("Error in creating task:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      created_by: req.user!.id,
      is_active: true,
    });
    res.json(tasks);
  } catch (err) {
    log.error("Error in getting task:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getTaskForId = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || !task.is_active)
      return res.status(404).json({ msg: "Resource not found" });

    res.json(task);
  } catch (err) {
    log.error("Error in getting task:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || !task.is_active)
      return res.status(404).json({ msg: "Resource not found" });

    if (task.created_by.toString() !== req.user!.id)
      return res.status(403).json({ msg: "Access denied" });

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body.task, updated_by: req.user!.id },
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    log.error("Error in updating task:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || !task.is_active)
      return res.status(404).json({ msg: "Resource not found" });

    if (task.created_by.toString() !== req.user!.id)
      return res.status(403).json({ msg: "Access denied" });

    await Task.findByIdAndUpdate(req.params.id, { is_active: false });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    log.error("Error in deleting task:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
