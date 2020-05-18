const app = require("./app");

const port = process.env.port || 3000;

app.get("/api", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(3000, () => {
  console.log("App runnning on port " + port);
});
