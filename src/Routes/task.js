const express = require("express");
const router = express.Router();
const userExtrator = require("../Utils/userExtrator");

const {
  getTasks,
  getTask,
  getTaskForUser,
  create,
  update,
  deleted,
} = require("../Controllers/task");
const { validateCreateTask, validateEditTask } = require("../Validators/task");

router.get("/", userExtrator, getTasks);
router.get("/:id", userExtrator, getTask); //get by task id
router.get("/forUser/:id", userExtrator, getTaskForUser); //get by user id
router.post("/create", userExtrator, validateCreateTask, create);
router.put("/edit/:id", userExtrator, validateEditTask, update);
router.delete("/deleted/:id", userExtrator, deleted);

module.exports = router;
