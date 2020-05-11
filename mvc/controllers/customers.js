const Customer = require("../models/customer");

const addCustomer = (req, res) => {
  console.log(req.body);
  Customer.findOne({ drugLic: req.body.drugLic }).then((customer) => {
    if (customer) {
      return res
        .status(404)
        .json({ message: "Customer of this drugLic already exist." });
    }
    const newCustomer = new Customer({
      shopName: req.body.shopName,
      ownerName: req.body.ownerName,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      foodLic: req.body.foodLic,
      panNo: req.body.panNo,
      gstin: req.body.gstin,
      drugLic: req.body.drugLic,
      cellNo: req.body.cellNo,
      cellNo2: req.body.cellNo2,
      adharNo: req.body.adharNo,
    });

    newCustomer.save((err, customer) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Could not save to the Database" });
      }
      res.status(201).json({ success: true, customer });
    });
  });
};
// { phone: { $regex: /req.params.phone/ }
const getCustomerByName = (req, res) => {
  Customer.find({
    shopName: { $regex: req.params.customerName, $options: "i" },
  }).then((customers) => {
    if (customers.length == 0) {
      return res.status(200).json({ customers: [] });
    }
    console.log(customers);
    res.status(200).json({ customers: customers });
  });
};

module.exports = { addCustomer, getCustomerByName };
