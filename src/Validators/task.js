const { check } = require("express-validator");
const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: -1,
      message: errors.array()[0].msg,
    });
  }
  next();
};

const validateCreateTask = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("The username is required and cannot be empty")
    .isString()
    .withMessage("The username must be a string"),

  check("description")
    .exists({ checkFalsy: false })
    .isString()
    .withMessage("The description must be a string"),

  check("completed")
    .exists({ checkFalsy: false })
    .isBoolean()
    .withMessage("The completed must be a boolean"),
  check("author")
    .exists({ checkFalsy: true })
    .withMessage("The author is required and cannot be empty")
    .isString()
    .withMessage("The username must be a string"),

  handleValidationErrors,
];

const validateEditTask = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("The username is required and cannot be empty")
    .isString()
    .withMessage("The username must be a string"),

  check("description")
    .exists({ checkFalsy: false })
    .isString()
    .withMessage("The description must be a string"),

  check("completed")
    .exists({ checkFalsy: false })
    .isBoolean()
    .withMessage("The completed must be a boolean"),

  check("state")
    .exists({ checkFalsy: true })
    .withMessage("The state is required and cannot be empty")
    .isString()
    .withMessage("The state must be a string")
    .isIn(["created", "progress", "finished"])
    .withMessage(
      "The state must be one of the following values: created, progress, finished"
    ),

  handleValidationErrors,
];

module.exports = { validateCreateTask, validateEditTask };
