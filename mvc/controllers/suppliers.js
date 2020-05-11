const Supplier = require("../models/supplier");
const Medicine = require("../models/medicine");
const SupplierBill = require("../models/supplierBill");
const addSupplier = (req, res) => {
  console.log(req.body);
  Supplier.findOne({ drugLic: req.body.drugLic }).then((supplier) => {
    if (supplier) {
      return res
        .status(404)
        .json({ message: "Supplier of this drugLic already exist." });
    }
    const newSupplier = new Supplier({
      supplierName: req.body.supplierName.toUpperCase(),
      address: req.body.address.toUpperCase(),
      city: req.body.city.toUpperCase(),
      state: req.body.state.toUpperCase(),
      country: req.body.country.toUpperCase(),
      pin: req.body.pin,
      email: req.body.email,
      gsttin: req.body.gsttin,
      drugLic: req.body.drugLic,
      cellNo: req.body.cellNo,
      cellNo2: req.body.cellNo2,
      panNo: req.body.panNo,
    });

    newSupplier.save((err, supplier) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Could not save to the Database" });
      }
      res.status(201).json({ success: true, supplier });
    });
  });
};

const searchSupplier = (req, res) => {
  Supplier.find(
    {
      supplierName: { $regex: req.params.supplier, $options: "i" },
    },
    "supplierName _id city"
  ).then((suppliers) => {
    if (suppliers.length == 0) {
      return res.status(200).json({ suppliers: [] });
    }
    res.status(200).json({ suppliers: suppliers });
  });
};

const addBill = async (req, res) => {
  // console.log(req.body);
  for (a of req.body.tableRows) {
    await Medicine.findOne({ productName: a.productName.toUpperCase() }).then(
      (med) => {
        let mm = Number(a.exp.split("/")[0]);
        let yy = Number(a.exp.split("/")[1]);
        if (mm < 10) {
          mm = "0" + mm;
        }
        a.exp = mm + "/" + "15" + "/" + "20" + yy;
        a.exp = new Date(a.exp);

        const newBatch = {
          batchNo: a.batch.toUpperCase(),
          exp: a.exp,
          rate: a.rate,
          mrp: a.mrp,
          quantity: a.quantity,
          bonus: a.bonus,
          trade: a.trade,
          cgst: a.cgst,
          sgst: a.sgst,
        };

        if (!med) {
          console.log("111");
          const newProduct = new Medicine({
            productName: a.productName.toUpperCase(),
            company: a.company.toUpperCase(),
            pack: a.pack.toUpperCase(),
            hsn: a.hsn,
            batch: [newBatch],
          });
          newProduct.save();
        } else {
          if (med.batch.length == 0) {
            med.batch.push(newBatch);
            med.save();
            console.log("Empty");
          } else {
            let index = med.batch.findIndex(
              (b) => b.batchNo == a.batch.toUpperCase()
            );
            if (index === -1) {
              med.batch.push(newBatch);
              med.save();
              console.log("Not Found");
            } else {
              med.batch[index].quantity =
                Number(med.batch[index].quantity) + Number(a.quantity);
              med.save();
            }
          }
        }
      }
    );
  }

  const newBill = new SupplierBill({
    supplier: req.body.supplier,
    supplierId: req.body.supplierId,
    invoiceNo: req.body.invoiceNo,
    total: req.body.total,
    items: req.body.tableRows,
  });

  newBill.save((err, bill) => {
    if (err) return res.status(500).json({ message: "Could not save." });
    Supplier.findOne({ _id: req.body.supplierId }).then((supplier) => {
      const billToSupplier = {
        billId: bill._id,
        invoiceNumber: req.body.invoiceNo,
        amount: req.body.total,
        date: new Date(),
      };

      if (!Array.isArray(supplier.bills)) {
        supplier.bills = [];
      }
      supplier.bills.push(billToSupplier);
      supplier.save((err, supplier) => {
        return res.status(201).json({ message: "Success bill saved" });
      });
    });
  });
};
module.exports = { addSupplier, searchSupplier, addBill };
