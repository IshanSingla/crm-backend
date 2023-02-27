const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Expense fetched", expense: req.expense });
});

router.post("/update", (req, res) => {
  const { expense } = req;
  const { name, description, amount, type, expenseOn } = req.body;
  expense.expenseName = name;
  expense.expenseDescription = description;
  expense.expensetype = type;
  expense.expenseOnType = expenseOn;
  expense.expenseAmount.count = amount;
  expense.save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error updating expense" });
    } else {
      res.status(200).json({ message: "Expense updated successfully" });
    }
  });
});

router.delete("/delete", (req, res) => {
  const { expense } = req;
  expense.delete((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error deleting expense" });
    } else {
      res.status(200).json({ message: "Expense deleted successfully" });
    }
  });
});

module.exports = router;
