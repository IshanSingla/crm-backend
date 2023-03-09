const expenses = require("../schema/buissness/expenses");
const inventorys = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");


const BuissnessUpdate = async (req, res) => {
  const { buissnessid } = req;
  const { buissnessName, buissnessType, buissnessPhoneNumber } = req.body;
  buissness.updateOne(
    { _id: buissnessid },
    {
      buissnessName,
      buissnessType,
      buissnessPhoneNumber,
    },
    (err, doc) => {
      if (err) {
      } else {
        res.status(200).json({ message: "Buissness updated successfully" });
      }
    }
  );
};

const ExpenseUpdate = (req, res) => {
  const { expense } = req;
  const { name, description, amount, type, expenseOn } = req.body;
  expenses.updateOne(
    { _id: expense._id },
    {
      $set: {
        expenseName: name,
        expenseDescription: description,
        expensetype: type,
        expenseOnType: expenseOn,
        expenseAmount: {
          count: amount,
        },
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error updating expense" });
      } else {
        res.status(200).json({ message: "Expense updated successfully" });
      }
    }
  );
};

const InventoryUpdate = async (req, res) => {
  const { inventory } = req;
  const { name, description, cost, quantity, sellingPrice, buyingPrice } =
    req.body;
  inventorys.updateOne(
    { _id: inventory._id },
    {
      inventoryName: name,
      inventoryDescription: description,
      inventoryCost: {
        sellingPrice: sellingPrice,
        buyingPrice: buyingPrice,
      },
      inventoryQuantity: quantity,
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error updating inventory" });
      } else {
        res.status(200).json({ message: "Inventory updated successfully" });
      }
    }
  );
};

module.exports = {
  BuissnessUpdate,
  ExpenseUpdate,
  InventoryUpdate,
};
