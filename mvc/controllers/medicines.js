const Medicine = require("../models/medicine");

const addMedicine = (req, res) => {
  // console.log(req.body);
  Medicine.findOne({ productName: req.body.productName.toUpperCase() })
    .then((product) => {
      if (product)
        return res.status(404).json({ message: "Product Already Exist" });
      const newProduct = new Medicine({
        productName: req.body.productName.toUpperCase(),
        company: req.body.company.toUpperCase(),
        pack: req.body.pack.toUpperCase(),
        hsn: req.body.hsn,
      });
      newProduct.save().then((createdProduct) => {
        res.status(201).json({ createdProduct, success: true });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Something went wrong." });
    });
};

const searchCompany = (req, res) => {
  Medicine.find(
    {
      company: { $regex: req.params.company, $options: "i" },
    },
    "company"
  ).then((companies) => {
    if (companies.length == 0) {
      return res.status(200).json({ companies: [] });
    }
    res.status(200).json({ companies: companies });
  });
};

const searchMedicine = (req, res) => {
  Medicine.find({
    productName: { $regex: req.params.medicine, $options: "i" },
  }).then((medicines) => {
    if (medicines.length == 0) {
      return res.status(200).json({ medicines: [] });
    }
    res.status(200).json({ medicines: medicines });
  });
};

module.exports = { addMedicine, searchCompany, searchMedicine };
