const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  state: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  createdAt: Date,
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

taskSchema.plugin(uniqueValidator);

const task = model("task", taskSchema);

module.exports = task;
