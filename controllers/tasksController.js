const { ObjectId } = require("mongodb");
const mongodb = require("../config/database");

const collectionName = "tasks";

// GET ALL
const getAllTasks = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const tasks = await mongodb
      .getDatabase()
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET ONE
const getSingleTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const taskId = req.params.id;

    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// CREATE
const createTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      projectId: req.body.projectId,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .insertOne(task);

    res.status(201).json({
      message: "Task created successfully",
      id: response.insertedId
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
const updateTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const taskId = req.params.id;

    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      projectId: req.body.projectId,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .replaceOne(
        { _id: new ObjectId(taskId) },
        task
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    next(err);
  }
};

// DELETE
const deleteTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const taskId = req.params.id;

    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(taskId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};