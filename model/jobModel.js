const mongoose = require("mongoose");

const Jobs = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    stdate: {
      type: String,
    },
    endate: {
      type: String,
    },
    status: {
      type: Number,
    },
    discriptions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("job", Jobs);
