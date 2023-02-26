const router = require("express").Router();
const buissness = require("../../../schema/buissness");
const expense = require("../../../schema/buissness/expenses");

router.get("/", (req, res) => {
  // const { buissnessid, buissness } = req;
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }
  expense.find(
    { buissness: req.buissnessid },
    {},
    { skip: parseInt(from), limit: parseInt(to) },
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
});
router.post("/create", (req, res) => {
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
  }).save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      res.status(200).json({ message: "Expense created successfully" });
    }
  });
});

router.use("/:expid", require("./oneexpense"));

module.exports = router;
