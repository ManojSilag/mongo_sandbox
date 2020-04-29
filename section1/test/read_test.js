const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");

describe("Readign user out of the db", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "joe" });

    joe.save().then(() => {
      done();
    });
  });

  it("Finds all user with name of joe", (done) => {
    User.find({ name: "joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("Find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "joe");
      done();
    });
  });
});
