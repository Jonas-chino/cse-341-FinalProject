const { ObjectId } = require("mongodb");
const mongodb = require("../config/database");

const collectionName = "users";

// GET ALL
const getAllUsers = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const users = await mongodb
      .getDatabase()
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// GET ONE
const getSingleUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// CREATE
const createUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      city: req.body.city,
      lastLogin: req.body.lastLogin,
      createdAt: req.body.createdAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .insertOne(user);

    res.status(201).json({
      message: "User created successfully",
      id: response.insertedId
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
const updateUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      city: req.body.city,
      lastLogin: req.body.lastLogin,
      createdAt: req.body.createdAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .replaceOne(
        { _id: new ObjectId(userId) },
        user
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

// DELETE
const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(userId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};