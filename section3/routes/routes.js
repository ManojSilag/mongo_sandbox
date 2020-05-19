const DriverController = require("../controller.js/driver");

module.exports = (app) => {
  app.get("/api", DriverController.greeting);
};
