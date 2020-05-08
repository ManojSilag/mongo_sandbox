const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");

describe("Readign user out of the db", () => {
  let joe, mike, rohan, amit;
  beforeEach((done) => {
    joe = new User({ name: "joe" });
    mike = new User({ name: "mike" });
    rohan = new User({ name: "rohan" });
    amit = new User({ name: "amit" });
    // joe.save().then(() => {
    //   done();
    // });

    Promise.all([joe.save(), mike.save(), rohan.save(), amit.save()]).then(() =>
      done()
    );
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

  it("can skip and limit the result set", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        console.log(users);
        assert(users.length === 2);
        done();
      });
  });
});
