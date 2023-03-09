const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");

const async = require("async");

const BuissnessDelete = async (req, res) => {
  console.log("BuissnessDelete");
  const { buissnessid } = req;
  // under testing
  async.parallel(
    {
      task1: function (callback) {
        buissness
          .findByIdAndDelete(buissnessid)
          .then((doc) => {
            callback(null, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      task2: function (callback) {
        expense
          .deleteMany({ buissness: buissnessid })
          .then((doc) => {
            callback(null, 2);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      task3: function (callback) {
        inventory
          .deleteMany({ buissness: buissnessid })
          .then((doc) => {
            callback(null, 3);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    function (err, results) {
      if (err) {
        res.status(500).json({ message: "Error deleting buissness" });
      } else {
        res.send({ message: "Buissness Deleted Sucessfully" });
      }
    }
  );
};

const ExpenseDelete = (req, res) => {
  const { expense } = req;
  expense.delete((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error deleting expense" });
    } else {
      res.status(200).json({ message: "Expense deleted successfully" });
    }
  });
};

const InventoryDelete = (req, res) => {
  const { inventory } = req;
  // require parallel processing here for deleting transactions
  inventory.delete((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error deleting inventory" });
    } else {
      res.status(200).json({ message: "Inventory deleted successfully" });
    }
  });
};

module.exports = {
  ExpenseDelete,
  InventoryDelete,
  BuissnessDelete,
};
