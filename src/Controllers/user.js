const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const userModel = require("../Models/user");
require("dotenv").config();

const create = async (req, res) => {
  try {
    const localDateTime = moment()
      .tz("America/Bogota")
      .format("YYYY-MM-DD HH:mm:ss");

    const {
      userName,
      password,
      admin = false,
      createdAt = localDateTime,
    } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        code: -1,
        message:
          "The 'userName' and 'password' fields are required and cannot be empty.",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await userModel({
      userName,
      password: passwordHash,
      admin,
      createdAt,
    }).save();

    return res.status(201).json({
      code: 1,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      code: -1,
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const localDateTime = moment()
    .tz("America/Bogota")
    .format("YYYY-MM-DD HH:mm:ss");
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid user or Password",
    });
  }

  const userForToken = {
    id: user._id,
    userName: user.userName,
    admin: user.admin,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 2,
  });

  res.status(200).json({
    code: 1,
    user: userForToken,
    token,
  });
  return;
};

module.exports = {
  create,
  login,
};
