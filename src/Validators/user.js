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

const validateCreateUser = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("The username is required and cannot be empty")
    .isString()
    .withMessage("The username must be a string"),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("The password is required and cannot be empty")
    .isString()
    .withMessage("The password must be a string")
    .isLength({ min: 8, max: 32 })
    .withMessage("The password must be between 8 and 32 characters long"),

  handleValidationErrors,
];

module.exports = { validateCreateUser };
