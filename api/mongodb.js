const mongoose = require("mongoose");
require("dotenv").config(); // for using .env file

// Connect mongodb
const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connection successful"))
    .catch((err) => console.error("Connection failed"));
};

module.exports.toConnect = connectDb;
