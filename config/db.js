const mongoose = require("mongoose");
const COMMON = require("../Common/COMMON");

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(COMMON.uri);
    console.log("Connect successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
