const DriverController = require("../controller.js/driver");

module.exports = (app) => {
  app.get("/api", DriverController.greeting);

  app.post("/api/drivers", DriverController.create)

};
