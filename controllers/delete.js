const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");

const userProfile = require("../schema/user/userProfile");

const BuissnessDelete = async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessid } = req;
  // under testing
  async.parallel(
    {
      task1: function (callback) {
        buissness.findByIdAndDelete(buissnessid).then((doc) => {
          callback(null, 1);
        });
      },
      task2: function (callback) {
        userProfile
          .findByIdAndUpdate(mongodbUser._id, {
            $pull: { buissness: buissnessid },
          })
          .then((doc) => {
            callback(null, 2);
          });
      },
    },
    function (err, results) {
      res.send({ message: "Buissness Deleted Sucessfully" });
    }
  );
  // await buissnessExpense.findByIdAndDelete(buissnessid);
  // await userProfile.findByIdAndUpdate(mongodbUser._id, {
  //   $pull: { buissness: buissnessid },
  // });
  // res.send({ message: "Buissness Deleted Sucessfully" });
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
