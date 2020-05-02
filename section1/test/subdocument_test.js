const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }],
    });

    joe
      .save()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        console.log(user.posts[0].title);
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("Can add subdocunent to an existing records", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user.posts.length === 1);
        assert(user.posts[0].title === "New Post");
        done();
      });
  });
});
