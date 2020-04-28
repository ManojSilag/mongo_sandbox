const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", (done) => {
    const pratik = new User({ name: "Pratik" });
    pratik.save().then(() => {
      assert(!pratik.isNew);
      done();
    });
  });
});
