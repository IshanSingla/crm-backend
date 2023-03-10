const expenses = require("../schema/buissness/expenses");
const inventorys = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");
const carts = require("../schema/buissness/cart");

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
  const { buissnessid, cart, user } = req;
  const { inventoryId } = req.body;
  let type = req.params.type;
  let inventorydata = {};
  try {
    inventorydata = await inventorys.findOne({
      _id: inventoryId,
      buissness: buissnessid,
    });
    if (inventorydata == null) {
      return res.status(404).json({ message: "Inventory not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  const { _id, inventoryName, inventoryCost } = inventorydata;
  let query = {};
  if (type == "push") {
    let data = cart.inventory.filter(
      (item) => item.inventory_id == inventoryId
    );
    if (data.length > 0) {
      return res.status(400).json({ message: "Item already in cart" });
    } else {
      query = {
        $addToSet: {
          inventory: {
            inventory_id: _id,
            quantity: 1,
            inventoryName: inventoryName,
            inventoryCost: inventoryCost,
          },
        },
      };
    }
  } else if (type == "add") {
    query = {
      $inc: {
        "inventory.$.quantity": 1,
      },
    };
  } else if (type == "subtract") {
    query = {
      $inc: {
        "inventory.$.quantity": -1,
      },
    };
  } else if (type == "delete") {
    query = {
      $pull: {
        inventory: {
          inventory_id: _id,
        },
      },
    };
  }
  carts
    .updateOne({ createdBy: user.uid, business: buissnessid }, query)
    .then((doc) => {
      return res
        .status(200)
        .json({ message: `Item ${type} to cart SucessFully` });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

module.exports = {
  BuissnessUpdate,
  ExpenseUpdate,
  InventoryUpdate,
  CartUpdate,
};
