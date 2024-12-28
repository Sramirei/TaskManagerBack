const express = require("express");
const router = express.Router();
const userExtrator = require("../Utils/userExtrator");

const { getHistory } = require("../Controllers/histoy");

router.get("/", userExtrator, getHistory);

module.exports = router;
