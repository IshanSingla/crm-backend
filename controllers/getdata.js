const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");

const userProfile = require("../schema/user/userProfile");

const ExpenseData = async (req, res) => {
  // need to optamize
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }
  expense.find(
    { buissness: req.buissnessid },
    {},
    { sort: { createdAt: -1 }, skip: parseInt(from), limit: parseInt(to) },
    async (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        expense
          .find({ buissness: req.buissnessid })
          .countDocuments((err, count) => {
            if (err) {
              res.status(500).json({ message: "Error fetching inventory" });
            } else {
              res.status(200).json({
                message: "Inventory fetched",
                inventory: doc,
                count: doc.length,
                totalCount: count,
                totalPage: Math.ceil(count / (parseInt(to) - parseInt(from))),
              });
            }
          });
      }
    }
  );
};

const InventoryData = async (req, res) => {
  // need parallel pronessing here
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }

  inventory.find(
    { buissness: req.buissnessid },
    {},
    { sort: { createdAt: -1 }, skip: parseInt(from), limit: parseInt(to) },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        inventory
          .find({ buissness: req.buissnessid })
          .countDocuments((err, count) => {
            if (err) {
              res.status(500).json({ message: "Error fetching inventory" });
            } else {
              res.status(200).json({
                message: "Inventory fetched",
                inventory: doc,
                count: doc.length,
                totalCount: count,
                totalPage: Math.ceil(count / (parseInt(to) - parseInt(from))),
              });
            }
          });
      }
    }
  );
};

const AllBuissnessData = async (req, res) => {
  const { mongodbUser } = req.user;
  userProfile
    .findById(mongodbUser._id)
    .populate("buissness")
    .then((user) => {
      let buissness = user.buissness;
      if (buissness && buissness.length >= 0) {
        res.json({
          message: "Buissness fetched",
          buissness: buissness,
        });
      } else {
        res.status(404).json({ message: "Error buissness empty" });
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Error fetching buissness", err: err.message });
    });
};

const BuissnessData = async (req, res) => {
  const { buissnessid } = req;
  buissness.findById(buissnessid, (err, doc) => {
    if (err) {
      res.status(404).json({ message: "Buissness not found" });
    } else {
      res.status(200).json({ message: "Buissness fetched", buissness: doc });
    }
  });
};

module.exports = {
  ExpenseData,
  InventoryData,
  AllBuissnessData,
  BuissnessData,
};
