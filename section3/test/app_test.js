const assert = require("assert");
const request = require("supertest");
const app = require("../app");
describe("The express app", () => {
  it("handles a GET request /", (done) => {
    request(app)
      .get("/api")
      .expect(200, done)
    //   .end((err, response) => {
    //     console.log("dev: response", response.body);
    //     assert(response.body.hi === "there");
    //     done();
    //   });
  });
});
