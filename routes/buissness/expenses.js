const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");

router.get("/", (req, res) => {
  const { id } = req.params;
  var data = buissnessExpense
    .findById(id)
    .populate("expenses")
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json({ message: "Error fetching buissness" });
      } else {
        res.json({ message: "Buissness fetched", buissness: doc });
      }
    });
});

router.get("/expenseMethod", async (req, res) => {
  const { id } = req.params;
  var data = buissnessExpense
    .findById(id)
    .populate("expenses")
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json({ message: "Error fetching buissness" });
      } else {
        res.json({
          message: "Buissness fetched",
          data: {
            card: doc.expenses
              .filter((expense) => expense.expenseType === "card")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            otherBank: doc.expenses
              .filter((expense) => expense.expenseType === "otherBank")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            sameBank: doc.expenses
              .filter((expense) => expense.expenseType === "sameBank")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            online: doc.expenses
              .filter((expense) => expense.expenseType === "online")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
          },
        });
      }
    });
});

router.get("/expenseCategory", async (req, res) => {
  const { id } = req.params;
  var data = buissnessExpense
    .findById(id)
    .populate("expenses")
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json({ message: "Error fetching buissness" });
      } else {
        res.json({
          message: "Buissness fetched",
          data: {
            food: doc.expenses
              .filter((expense) => expense.expenseCategory === "food")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            travel: doc.expenses
              .filter((expense) => expense.expenseCategory === "travel")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            entertainment: doc.expenses
              .filter((expense) => expense.expenseCategory === "entertainment")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            shopping: doc.expenses
              .filter((expense) => expense.expenseCategory === "shopping")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
            other: doc.expenses
              .filter((expense) => expense.expenseCategory === "other")
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
          },
        });
      }
    });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.params;
  await buissnessExpense.findByIdAndDelete(id);
  res.send({ message: "Buissness Deleted Sucessfully" });
});

router.use("/data/:expid", require("./expense"));

module.exports = router;
