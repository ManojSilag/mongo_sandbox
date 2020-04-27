const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/user_test");

mongoose.connect("mongodb://127.0.0.1:27017/user_test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => console.log("Good to go"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });
