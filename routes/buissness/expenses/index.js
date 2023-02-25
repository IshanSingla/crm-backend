const router = require("express").Router();
const expense = require("../../../schema/buissness/expenses");

router.get("/", (req, res) => {
  const { buissnessid, buissness } = req;
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }
  expense.find(
    { buissness: buissnessid },
    {},
    { skip: parseInt(from), limit: parseInt(to) },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        res.status(200).json({
          message: "Inventory fetched",
          inventory: doc,
          count: doc.length,
          totalCount: buissness.expenses.length,
          totalPage: Math.ceil(
            buissness.expenses.length / (parseInt(to) - parseInt(from))
          ),
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
    buissnessId: buissnessid,
    expenseName: name,
    expenseDescription: description,
    expensetype: type,
    expenseOnType: expenseOn,
    expenseAmount: {
      amount: amount,
    },
    createdBy: mongodbUser._id,
  }).save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      buissness.findByIdAndUpdate(buissnessid, {
        $push: { expenses: doc._id },
      });
      res.status(200).json({ message: "Expense created successfully" });
    }
  });
});

router.use("/:expid", require("./expense"));

module.exports = router;
