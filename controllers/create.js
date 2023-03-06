const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");

const ExpenseCreate = async (req, res) => {
  const { buissnessid } = req;
  const { mongodbUser } = req.user;
  const { name, description, amount, type, expenseOn } = req.body;
  new expense({
    buissness: buissnessid,
    expenseName: name,
    expenseDescription: description,
    expensetype: type,
    expenseOnType: expenseOn,
    expenseAmount: {
      count: amount,
    },
    createdBy: mongodbUser._id,
  }).save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      res
        .status(200)
        .json({ message: "Expense created successfully", data: doc });
    }
  });
};

const InventoryCreate = async (req, res) => {
  const { buissnessid } = req;
  const { mongodbUser } = req.user;
  const { name, description, quantity, sellingPrice, buyingPrice } = req.body;
  new inventory({
    buissness: buissnessid,
    inventoryName: name,
    inventoryDescription: description,
    inventoryCost: {
      sellingPrice: sellingPrice,
      buyingPrice: buyingPrice,
    },
    inventoryQuantity: quantity,
    createdBy: mongodbUser._id,
  }).save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      res
        .status(200)
        .json({ message: "Inventory created successfully", data: doc });
    }
  });
};

const BuissnessCreate = async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName } = req.body;
  let data = new buissness({
    buissnessName,
    createdBy: mongodbUser._id,
    users: [mongodbUser._id],
    roles: [mongodbUser.userType],
  });
  data
    .save()
    .then((doc) => {
      res.json({ message: "Buissness created", data: doc });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error creating buissness", err: err.message });
    });
};

module.exports = {
  ExpenseCreate,
  InventoryCreate,
  BuissnessCreate,
};
