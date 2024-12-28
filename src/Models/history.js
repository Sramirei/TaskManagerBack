const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const historySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  createdAt: Date,
});

historySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

historySchema.plugin(uniqueValidator);

const history = model("history", historySchema);

module.exports = history;
