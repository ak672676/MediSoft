const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  pack: {
    type: String,
  },
  company: {
    type: String,
  },
  hsn: {
    type: String,
  },
  batch: [
    {
      batchNo: {
        type: String,
      },
      exp: {
        type: Date,
      },
      rate: {
        type: Number,
      },
      mrp: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      bonus: {
        type: String,
      },
      trade: {
        type: Number,
      },
      cgst: {
        type: Number,
      },
      sgst: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Medicine = mongoose.model("medicine", MedicineSchema);
