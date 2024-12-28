const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  userName: {
    type: "string",
    unique: true,
  },
  password: {
    type: String,
    minWidth: 8,
    maxWidth: 32,
  },
  admin: Boolean,
  createdAt: Date,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

const user = model("user", userSchema);

module.exports = user;
