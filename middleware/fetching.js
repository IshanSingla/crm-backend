const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");
const cart = require("../schema/buissness/cart");

const verifyBuissness = (req, res, next) => {
  // const { mongodbUser } = req.user;
  if (!req.headers || !req.headers["buissnessid"]) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }
  const buissnessid = req.headers["buissnessid"];
  if (!buissnessid) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }
  buissness
    .findOne({
      _id: buissnessid,
      users: { $elemMatch: { user: req.user.uid } },
    })
    .then((doc) => {
      if (doc) {
        req.buissness = doc;
        req.buissnessid = doc._id;
        next();
      } else {
        return res.status(404).json({ message: "Buissness not found" });
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Error fetching buissness", err: err.message });
    });
};

const verifyInventry = (req, res, next) => {
  req.invid = req.params.invid;
  inventory.findOne(
    { buissness: req.buissnessid, _id: req.invid },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        if (doc) {
          req.inventory = doc;
          next();
        } else {
          res.status(404).json({ message: "Inventory not found" });
        }
      }
    }
  );
};

const verifyExpense = (req, res, next) => {
  req.expid = req.params.expid;
  expense.findOne(
    { buissness: req.buissnessid, _id: req.expid },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching expense" });
      } else {
        if (doc) {
          req.expense = doc;
          next();
        } else {
          res.status(404).json({ message: "Expense not found" });
        }
      }
    }
  );
};

const verifyCart = async (req, res, next) => {
  if (!req.headers || !req.headers["buissnessid"]) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }
  const buissnessid = req.headers["buissnessid"];

  if (!buissnessid) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }

  let data = await cart.findOne({ createdBy: req.user.uid, business: buissnessid });

  if(!data){
    let newData = new cart({
      business: buissnessid,
      inventory: [],
      createdBy: req.user.uid
    });

    try{
      await newData.save();
    } catch(err){
      return res.status(500).json({message: err.message});
    }
  }

  req.user = {
    buissnessid,
    uid: req.user.uid
  }

  next();
}

module.exports = {
  verifyBuissness,
  verifyInventry,
  verifyExpense,
  verifyCart
};
