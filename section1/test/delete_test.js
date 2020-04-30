const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => done());
  });

  it("Model instance remove", (done) => {
    joe
      .remove()
      .then(() => {
        return User.findOne({ name: "joe" });
      })
      .then((user) => {
        console.log("dev: user", user);
        assert(user === null);
        done();
      });
  });

  it("Class method remove", (done) => {
    User.remove({ name: "joe" })
      .then(() => {
        return User.findOne({ name: "joe" });
      })
      .then((user) => {
        console.log("dev: user", user);
        assert(user === null);
        done();
      });
  });

  it("Class method findAndRemove", (done) => {
    User.findOneAndRemove({ name: "joe" })
      .then(() => {
        return User.findOne({ name: "joe" });
      })
      .then((user) => {
        console.log("dev: user", user);
        assert(user === null);
        done();
      });
  });

  it("Class method findbyIdAndRemove", (done) => {
    User.findByIdAndRemove(joe._id )
      .then(() => {
        return User.findOne({ name: "joe" });
      })
      .then((user) => {
        console.log("dev: user", user);
        assert(user === null);
        done();
      });
  });
});
