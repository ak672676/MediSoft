const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  shopName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  foodLic: {
    type: String,
  },
  panNo: {
    type: String,
  },
  gstin: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  drugLic: {
    type: String,
    required: true,
  },
  cellNo: {
    type: String,
    required: true,
  },
  cellNo2: {
    type: String,
    required: true,
  },
  adharNo: {
    type: String,
    required: true,
  },
  bills: [
    {
      bill: {
        type: Schema.Types.ObjectId,
        ref: "bills",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
