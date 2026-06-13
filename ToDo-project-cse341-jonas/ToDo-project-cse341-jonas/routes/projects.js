const express = require("express");
const { body, param } = require("express-validator");
const projectsController = require("../controllers/projectsController");
const validateRequest = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

const projectsValidation = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  body("status").trim().notEmpty().withMessage("Status is required"),
  body("createdAt").notEmpty().withMessage("Created date is required"),
  body("endDate").optional(),
  body("userId").notEmpty().withMessage("User ID is required"),
];

const idValidation = [
  param("id").isMongoId().withMessage("Invalid project ID"),
];

router.get("/", projectsController.getAllProjects);

router.get(
  "/:id",
  idValidation,
  validateRequest,
  projectsController.getSingleProject
);

router.post(
  "/",
  authMiddleware,
  projectsValidation,
  validateRequest,
  projectsController.createProject
);

router.put(
  "/:id",
  authMiddleware,
  idValidation,
  projectsValidation,
  validateRequest,
  projectsController.updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  idValidation,
  validateRequest,
  projectsController.deleteProject
);

module.exports = router;