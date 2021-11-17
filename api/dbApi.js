const mongoose = require("mongoose");

class Model {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// Create new user API
const createUser = (username, password, callback, model) => {
  // Create document by instantiating user model
  const newUser = new model(new Model(username, password));
  // Save user to database
  newUser.save((err, data) => {
    callback(err, data);
  });
};

// Find log in user
const findOne = (username, callback, model) => {
  model.findOne({ username: username }, (err, data) => {
    callback(err, data);
  });
};

module.exports.createUser = createUser;
module.exports.findOne = findOne;
