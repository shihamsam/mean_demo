const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserDb", err => {
  if (!err) console.log("Mongo DB Connected.");
  else
    console.log("Error in Db Connection: " + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose