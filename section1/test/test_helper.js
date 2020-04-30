const mongoose = require("mongoose");
// mongoose.Promise = global;
// mongoose.connect("mongodb://localhost/user_test");

before((done)=>{
  
  mongoose.connect("mongodb://127.0.0.1:27017/user_test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => {done()})
  .on("error", (error) => {
    console.warn("Warning", error);
  });
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
  
});
