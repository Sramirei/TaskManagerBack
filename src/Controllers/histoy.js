const historyModel = require("../Models/history");
require("dotenv").config();

const getHistory = async (req, res) => {
  try {
    const histoy = await historyModel.find({}).populate("user", "userName");

    if (histoy.length === 0) {
      return res.status(404).json({ code: 0, message: "No found", data: [] });
    }

    return res.status(200).json({ code: 1, message: "success", data: histoy });
  } catch (error) {
    console.error("Error searching history:", error);
    res.status(500).json({
      code: -1,
      message: "An error occurred while searching the history.",
      error: error.message,
    });
    next();
  }
};

const createHistory = async (user, action, createdAt) => {
  if (!user || !action || !createdAt) {
    throw new Error(
      "The 'user, action, createdAt' fields are required and cannot be empty."
    );
  }

  const history = new historyModel({
    user,
    action,
    createdAt,
  });

  await history.save();
  return history;
};

module.exports = { createHistory, getHistory };
