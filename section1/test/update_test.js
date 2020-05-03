const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => {
        return User.find({});
      })
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  }

  it("Instance type using set n save", (done) => {
    joe.set({ name: "Alex" });
    assertName(joe.save(), done);
  });

  it("A modal insance can update", (done) => {
    assertName(joe.update({ name: "Alex" }), done);
  });

  it("A Model class can update", (done) => {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A Model Class can update one record and update", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A Model Class can find a record with an Id and update", (done) => {
    assertName(
      User.findByIdAndUpdate({ _id: joe._id }, { name: "Alex" }),
      done
    );
  });

  it("A user can have their postcount increased by 1", (done) => {
    User.update({ name: "Joe" }, { $inc: { likes: 1 } })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
