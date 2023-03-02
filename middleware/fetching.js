const expenses = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");

const verifyBuissness = (req, res, next) => {
  if (!req.headers || !req.headers["buissnessid"]) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }
  const buissnessid = req.headers["buissnessid"];
  if (!buissnessid) {
    return res.status(404).json({ message: "Buissness Not Defined" });
  }
  const { mongodbUser } = req.user;
  const buissness = mongodbUser.buissness.filter(
    (buissness) => buissness == buissnessid
  );
  if (buissness.length > 0) {
    req.buissness = buissness[0];
    req.buissnessid = buissnessid;
    next();
  } else {
    res.status(404).json({ message: "Buissness not found" });
  }
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
  expenses.findOne(
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

module.exports = {
  verifyBuissness,
  verifyInventry,
  verifyExpense,
};
