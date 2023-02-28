const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");

const BuissnessUpdate = async (req, res) => {
  const { buissnessid } = req;
  const { buissnessName, buissnessType, buissnessPhoneNumber } = req.body;
  buissness.findByIdAndUpdate(
    buissnessid,
    {
      buissnessName,
      buissnessType,
      buissnessPhoneNumber,
    },
    { new: true },
    (err, doc) => {
      if (err) {
      } else {
        res
          .status(200)
          .json({ message: "Buissness updated successfully", buissmess: doc });
      }
    }
  );
};

const ExpenseUpdate = (req, res) => {
  const { expense } = req;
  const { name, description, amount, type, expenseOn } = req.body;
  expense.expenseName = name;
  expense.expenseDescription = description;
  expense.expensetype = type;
  expense.expenseOnType = expenseOn;
  expense.expenseAmount.count = amount;
  expense.save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error updating expense" });
    } else {
      res.status(200).json({ message: "Expense updated successfully" });
    }
  });
};

const InventoryUpdate = async (req, res) => {
  const { inventory } = req;
  const { name, description, cost, quantity, sellingPrice, buyingPrice } =
    req.body;
  inventory.inventoryName = name;
  inventory.inventoryDescription = description;
  inventory.inventoryCost.sellingPrice = sellingPrice;
  inventory.inventoryCost.buyingPrice = buyingPrice;
  inventory.inventoryQuantity = quantity;
  inventory.save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error updating inventory" });
    } else {
      res.status(200).json({ message: "Inventory updated successfully" });
    }
  });
};

module.exports = {
  BuissnessUpdate,
  ExpenseUpdate,
  InventoryUpdate,
};
