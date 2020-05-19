const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  location: String,
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
