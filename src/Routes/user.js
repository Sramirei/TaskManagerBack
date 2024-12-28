const express = require("express");
const router = express.Router();
const userExtrator = require("../Utils/userExtrator");

const { create, login } = require("../Controllers/user");

const { validateCreateUser } = require("../Validators/user");

router.post("/create", userExtrator, validateCreateUser, create);
router.post("/login", login);

module.exports = router;
