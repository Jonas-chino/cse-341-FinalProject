const { ObjectId } = require("mongodb");
const mongodb = require("../config/database");

const collectionName = "projects";

// GET ALL
const getAllProjects = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const projects = await mongodb
      .getDatabase()
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// GET ONE
const getSingleProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const projectId = req.params.id;

    if (!ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(projectId) });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// CREATE
const createProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      categoryId: req.body.categoryId,
      userId: req.body.userId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .insertOne(project);

    res.status(201).json({
      message: "Project created successfully",
      id: response.insertedId
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
const updateProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const projectId = req.params.id;

    if (!ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      categoryId: req.body.categoryId,
      userId: req.body.userId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .replaceOne(
        { _id: new ObjectId(projectId) },
        project
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    next(err);
  }
};

// DELETE
const deleteProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const projectId = req.params.id;

    if (!ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(projectId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};