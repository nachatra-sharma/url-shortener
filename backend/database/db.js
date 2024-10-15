const mongoose = require("mongoose");

async function connectToDB(url) {
  await mongoose.connect(url + "shortify");
}

module.exports = connectToDB;
