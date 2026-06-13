const express = require("express");
const { body, param } = require("express-validator");
const tasksController = require("../controllers/tasksController");
const validateRequest = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

const tasksValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("status").trim().notEmpty().withMessage("Status is required"),
  body("priority").trim().notEmpty().withMessage("Priority is required"),
  body("dueDate").notEmpty().withMessage("Due date is required"),
  body("projectId").optional().isString(),
];

const idValidation = [
  param("id").isMongoId().withMessage("Invalid task ID"),
];

router.get("/", tasksController.getAllTasks);

router.get(
  "/:id",
  idValidation,
  validateRequest,
  tasksController.getSingleTask,
);

router.post(
  "/",
  authMiddleware,
  tasksValidation,
  validateRequest,
  tasksController.createTask,
);

router.put(
  "/:id",
  authMiddleware,
  idValidation,
  tasksValidation,
  validateRequest,
  tasksController.updateTask,
);

router.delete(
  "/:id",
  authMiddleware,
  idValidation,
  validateRequest,
  tasksController.deleteTask,
);

module.exports = router;