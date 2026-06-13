const express = require("express");
const { body, param } = require("express-validator");
const categoriesController = require("../controllers/categoriesController");
const validateRequest = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

const categoriesValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("color").optional().isString(),
];

const idValidation = [
  param("id").isMongoId().withMessage("Invalid category ID"),
];

router.get("/", categoriesController.getAllCategories);
router.get(
  "/:id",
  idValidation,
  validateRequest,
  categoriesController.getSingleCategory,
);
router.post(
  "/",
  authMiddleware,
  categoriesValidation,
  validateRequest,
  categoriesController.createCategory,
);
router.put(
  "/:id",
  authMiddleware,
  idValidation,
  categoriesValidation,
  validateRequest,
  categoriesController.updateCategory,
);
router.delete(
  "/:id",
  authMiddleware,
  idValidation,
  validateRequest,
  categoriesController.deleteCategory,
);

module.exports = router;
