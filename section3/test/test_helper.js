const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost:27017/olaa_test", {
    useNewUrlParser: true,  useUnifiedTopology: true 
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.log(err);
    });
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});
