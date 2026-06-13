const express = require("express");
const { body, param } = require("express-validator");
const usersController = require("../controllers/usersController");
const validateRequest = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

// 
const usersValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
];

const idValidation = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

// ✅ ROUTES
router.get("/", usersController.getAllUsers);

router.get(
  "/:id",
  idValidation,
  validateRequest,
  usersController.getSingleUser
);

router.post(
  "/",
  authMiddleware,
  usersValidation,
  validateRequest,
  usersController.createUser
);

router.put(
  "/:id",
  authMiddleware,
  idValidation,
  usersValidation,
  validateRequest,
  usersController.updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  idValidation,
  validateRequest,
  usersController.deleteUser
);

module.exports = router;