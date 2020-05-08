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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogpost",
    },
  ],
});

UserSchema.virtual("postCount").get(function () {
  const user = this;
  return user.posts.length;
});

UserSchema.pre("remove", function (next) {
  const BlogPost = mongoose.model("blogpost");
  //this === User
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
