const mongoose = require("mongoose");

const PointSchema = mongoose.Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" },
});
const DriverSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  geometry: PointSchema,
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
