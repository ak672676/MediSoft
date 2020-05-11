const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupplierBillSchema = new Schema({
  supplier: {
    type: String,
    required: true,
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: "supplier",
  },
  invoiceNo: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: [
    {
      hsn: {
        type: String,
      },
      productName: {
        type: String,
        required: true,
      },
      company: {
        type: String,
      },
      pack: {
        type: String,
      },
      batch: {
        type: String,
      },
      exp: {
        type: Date,
      },
      mrp: {
        type: Number,
      },
      rate: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      bonus: {
        type: String,
      },
      sgst: {
        type: Number,
      },
      cgst: {
        type: Number,
      },
      trade: {
        type: Number,
      },
      discount: {
        type: String,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SupplierBill = mongoose.model(
  "supplierbill",
  SupplierBillSchema
);
