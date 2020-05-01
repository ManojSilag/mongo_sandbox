const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({
      name: undefined,
    });

    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message === "Name is required.");
  });

  it("requiers a name longer than 2 character", () => {
    const user = new User({
      name: "Al",
    });

    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message === "Name must be larger than 2 character");
  });

  it("dissallows invalid records from beign saved", (done) => {
    const user = new User({ name: "AL" });

    user.save().catch((validationResult) => {
      const message = validationResult.errors.name.message;
      assert(message === "Name must be larger than 2 character");
      done();
    });
  });
});
