const { ExpenseDelete } = require("../../../../controllers/delete");
const { ExpenseUpdate } = require("../../../../controllers/update");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Expense fetched", expense: req.expense });
});

router.post("/update", ExpenseUpdate);

router.delete("/delete", ExpenseDelete);

module.exports = router;
