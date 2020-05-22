const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Driver = mongoose.model("driver");

describe("Driver controller", () => {
  it("Post to /api/drivers creates a new driver ", (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.countDocuments().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT to /api/drivers/:id update driver", (done) => {
    const driver = new Driver({ email: "test@123", driving: false });
    driver.save().then(() => {
      request(app)
        .put("/api/drivers/" + driver._id)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "test@123" }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/:id can delete a driver", (done) => {
    const driver = new Driver({ email: "yoyo@123", driving: false });
    driver.save().then(() => {
      request(app)
        .delete("/api/drivers/" + driver._id)
        .end(() => {
          Driver.findOne({ email: "yoyo@123" }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers/ find drivers in near location", (done) => {
    const mumbaidriver = new Driver({
      email: "mumbaidriver@123",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] },
      driving: false,
    });
    const Delhidriver = new Driver({
      email: "Delhidriver@123",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
      driving: false,
    });

    Promise.all([mumbaidriver.save(), Delhidriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, response) => {
          console.log("dev: response", response.body.length);
          // assert(response.body.length === 1);
          // assert(response.body[0].obj.email === "mumbaidriver@123");

          done();
        });
    });
  });
});
