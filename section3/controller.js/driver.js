const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
           distanceField: "distance",
          maxDistance: 2,
          query: { type: "public" },
          // includeLocs: "dist.location",
          spherical: true,
        },
      },
    ])
   .then((drivers) => res.send(drivers))
      .catch(next);

    // Driver.geoNear(
    //   { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
    //   { spherical: true, maxDistance: 200000 }
    // )
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndDelete({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  },
};
