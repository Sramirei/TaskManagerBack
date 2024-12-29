const moment = require("moment-timezone");
const mongoose = require("mongoose");
const taskModel = require("../Models/task");
const { createHistory } = require("../Controllers/histoy");
require("dotenv").config();

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({}).populate("author", "userName");

    if (tasks.length === 0) {
      return res.status(404).json({ code: 0, message: "No found", data: [] });
    }

    return res.status(200).json({ code: 1, message: "success", data: tasks });
  } catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({
      code: -1,
      message: "An error occurred while searching the tasks.",
      error: error.message,
    });
    next();
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findById(id).populate("author", "userName");

    if (!task) {
      return res.status(404).json({ code: 0, message: "not found" });
    }

    return res.status(200).json({ code: 1, message: "success", data: task });
  } catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({
      code: -1,
      message: "An error occurred while searching the tasks.",
      error: error.message,
    });
    next();
  }
};

const getTaskForUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      code: -1,
      message: "Invalid author ID format.",
    });
  }

  try {
    const tasks = await taskModel
      .find({ author: id })
      .populate("author", "userName");

    if (tasks.length === 0) {
      return res.status(404).json({ code: 0, message: "not found" });
    }

    return res.status(200).json({
      code: 1,
      message: "Success",
      data: tasks,
    });
  } catch (error) {
    console.error("Error searching tasks:", error);
    return res.status(500).json({
      code: -1,
      message: "An error occurred while searching the tasks.",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  const localDateTime = moment()
    .tz("America/Bogota")
    .format("YYYY-MM-DD HH:mm:ss");

  const {
    title,
    description = "",
    state = "created", //created, progress, finished
    completed = false,
    author,
    createdAt = localDateTime,
  } = req.body;

  try {
    if (!title) {
      return res.status(400).json({
        code: -1,
        message: "The 'title' fields are required and cannot be empty.",
      });
    }

    const task = await taskModel({
      title,
      description,
      state,
      completed,
      author,
      createdAt,
    }).save();

    await createHistory(author, `Task created: ${title}`, localDateTime);

    return res.status(201).json({
      code: 1,
      message: "task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      code: -1,
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const localDateTime = moment()
    .tz("America/Bogota")
    .format("YYYY-MM-DD HH:mm:ss");
  const { id } = req.params;
  const { title, description, state, completed } = req.body;

  try {
    // Busca la tarea por su ID
    const task = await taskModel.findById(id);

    // Si la tarea no existe, responde con un error
    if (!task) {
      return res.status(404).json({
        code: 0,
        message: "Task not found.",
      });
    }

    // Actualiza la tarea si existe
    await taskModel.updateOne(
      { _id: id },
      {
        $set: {
          title,
          description,
          state,
          completed,
        },
      }
    );

    // Crear historial
    await createHistory(task.author, `Task Edit: ${title}`, localDateTime);

    return res.status(200).json({
      code: 1,
      message: "Task edited successfully.",
    });
  } catch (error) {
    console.error("Error editing task:", error);
    return res.status(500).json({
      code: -1,
      message: "An error occurred while editing the task.",
      error: error.message,
    });
  }
};

const deleted = async (req, res) => {
  const { id } = req.params;
  const localDateTime = moment()
    .tz("America/Bogota")
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        code: 0,
        message: "Task not found.",
      });
    }

    await taskModel.findByIdAndRemove(id);

    await createHistory(
      task.author,
      `Task Deleted: ${task.title}`,
      localDateTime
    );

    return res.status(200).json({
      code: 1,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      code: -1,
      message: "An error occurred while deleting the task.",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  getTaskForUser,
  create,
  update,
  deleted,
};
