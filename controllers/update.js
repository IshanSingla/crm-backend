const expenses = require("../schema/buissness/expenses");
const inventorys = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const cart = require("../schema/buissness/cart");
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

const CartUpdate = async (req, res) => {
  try {
    let { uid, buissnessid } = req.user;
    let type = req.params.type;

    if (type == "push") {
      let details = await cart.findOne({ createdBy: uid, business: buissnessid, "inventory.inventory_id": req.body.inventoryId });

      if (details) {
        return res.status(200).json({
          message: "Already in cart"
        });
      }

      await cart.updateOne({ createdBy: uid, business: buissnessid }, {
        $addToSet: {
          inventory: {
            inventory_id: req.body.inventoryId,
            quantity: 1,
            inventoryName: req.body.inventoryName,
            inventoryCost: {
              sellingPrice: req.body.sellingPrice,
              buyingPrice: req.body.buyingPrice
            }
          }
        }
      });
    } else if (type == "add") {
      await cart.updateOne({ createdBy: uid, business: buissnessid, "inventory.inventory_id": req.body.inventoryId }, {
        $inc: {
          "inventory.$.quantity": 1,
        }
      })
    } else if (type == "subtract") {
      await cart.updateOne({ createdBy: uid, business: buissnessid, "inventory.inventory_id": req.body.inventoryId }, {
        $inc: {
          "inventory.$.quantity": -1,
        }
      })
    } else if (type == "remove") {
      await cart.updateOne({ createdBy: uid, business: buissnessid, "inventory.inventory_id": req.body.inventoryId }, {
        $pull: {
          inventory: {
            inventory_id: req.body.inventoryId
          }
        }
      })
    } else {
      return res.status(500).json({
        message: "wrong type value"
      })
    }

    res.status(200).json({ message: "Action Done" });
  } catch (err) {
    throw (err);
  }
}

module.exports = {
  BuissnessUpdate,
  ExpenseUpdate,
  InventoryUpdate,
  CartUpdate
};
