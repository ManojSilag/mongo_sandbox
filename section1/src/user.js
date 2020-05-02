const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be larger than 2 character",
    },
  },
  postCount: Number,
  posts: [PostSchema],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
