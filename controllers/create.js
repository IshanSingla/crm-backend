const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const redisBuissness = require("../schema/redis");

const ExpenseCreate = async (req, res) => {
  const { buissnessid } = req;
  const { mongodbUser } = req.user;
  const { name, description, amount, type, expenseOn } = req.body;
  new expense({
    buissness: buissnessid,
    expenseName: name,
    expenseDescription: description,
    expensetype: type,
    expenseOnType: expenseOn,
    expenseAmount: {
      count: amount,
    },
    createdBy: mongodbUser._id,
  }).save(async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      let redisData = await redisBuissness().fetch(String(buissnessid));
      redisData.expensesCount = redisData.expensesCount + 1;
      await redisBuissness(String(buissnessid)).createAndSave(redisData);
      res
        .status(200)
        .json({ message: "Expense created successfully", data: doc });
    }
  });
};

const InventoryCreate = async (req, res) => {
  const { buissnessid } = req;
  const { mongodbUser } = req.user;
  const { name, description, quantity, sellingPrice, buyingPrice } = req.body;
  new inventory({
    buissness: buissnessid,
    inventoryName: name,
    inventoryDescription: description,
    inventoryCost: {
      sellingPrice: sellingPrice,
      buyingPrice: buyingPrice,
    },
    inventoryQuantity: quantity,
    createdBy: mongodbUser._id,
  }).save(async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      let redisData = await redisBuissness().fetch(String(buissnessid));
      redisData.inventoryCount = redisData.inventoryCount + 1;
      await redisBuissness(String(buissnessid)).createAndSave(redisData);
      res
        .status(200)
        .json({ message: "Inventory created successfully", data: doc });
    }
  });
};

const BuissnessCreate = async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName } = req.body;
  let da = new buissness({
    buissnessName,
    createdBy: mongodbUser._id,
  });
  let data = await da.save();
  await redisBuissness(String(data._id)).createAndSave({
    buissnessID: String(data._id),
    expensesCount: 0,
    inventoryCount: 0,
  });
  userProfile
    .findByIdAndUpdate(mongodbUser._id, {
      $push: { buissness: data._id },
    })
    .then((doc) => {
      res.json({ message: "Buissness created", data: data });
    });
};

module.exports = {
  ExpenseCreate,
  InventoryCreate,
  BuissnessCreate,
};
