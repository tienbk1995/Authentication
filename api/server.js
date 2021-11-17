const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./mongodb");
const app = express();
const router = require("./routerApi");

// Legacy configuration
app.use(cors());
app.use(express.static("public"));

// Connect mongo db
connectdb.toConnect();

// Root handler
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to router
app.use("/api", router);

// Listen on port
const listener = app.listen(3000, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
