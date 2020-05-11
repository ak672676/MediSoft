const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  supplierName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pin: {
    type: String,
  },
  email: {
    type: String,
  },
  gsttin: {
    type: String,
  },
  drugLic: {
    type: String,
  },
  cellNo: {
    type: String,
  },
  cellNo2: {
    type: String,
  },
  panNo: {
    type: String,
  },
  bills: [
    {
      billId: {
        type: Schema.Types.ObjectId,
        ref: "supplierbill",
      },
      invoiceNumber: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Supplier = mongoose.model("supplier", SupplierSchema);
