const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const cart = require("../schema/buissness/cart");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");

const ExpenseCreate = async (req, res) => {
  const { buissnessid } = req;
  // const { mongodbUser } = req.user;
  const { name, description, amount, type, expenseOn } = req.body;
  let data = new expense({
    buissness: buissnessid,
    expenseName: name,
    expenseDescription: description,
    expensetype: type,
    expenseOnType: expenseOn,
    expenseAmount: {
      count: amount,
    },
    createdBy: req.user.uid,
  });
  data
    .save()
    .then((doc) => {
      res
        .status(200)
        .json({ message: "Expense created successfully", data: doc });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating inventory" });
    });
};

const InventoryCreate = async (req, res) => {
  const { buissnessid } = req;
  // const { mongodbUser } = req.user;
  const { name, description, quantity, sellingPrice, buyingPrice } = req.body;
  let data = new inventory({
    buissness: buissnessid,
    inventoryName: name,
    inventoryDescription: description,
    inventoryCost: {
      sellingPrice: sellingPrice,
      buyingPrice: buyingPrice,
    },
    inventoryQuantity: quantity,
    createdBy: req.user.uid,
  });
  data
    .save()
    .then((doc) => {
      res
        .status(200)
        .json({ message: "Inventory created successfully", data: doc });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating inventory" });
    });
};

const BuissnessCreate = async (req, res) => {
  // const { mongodbUser } = req.user;
  const { buissnessName } = req.body;
  let data = new buissness({
    buissnessName,
    createdBy: req.user.uid,
    users: [req.user.uid],
    roles: ["63ca92f13ec1a3d50bdeb75b"],
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

const CartCreate = async (req, res) => {
  let { createdBy } = req.buissness;
  let data = new cart({
    business: req.buissnessid,
    inventory: [],
    createdBy: createdBy
  });

  data
    .save()
    .then((doc) => {
      res.json({ message: "Cart created", data: doc });
    }).catch((err) => {
      res
        .status(500)
        .json({ message: "Error creating buissness", err: err.message });
    })
}

module.exports = {
  ExpenseCreate,
  InventoryCreate,
  BuissnessCreate,
  CartCreate
};
