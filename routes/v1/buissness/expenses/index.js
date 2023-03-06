const router = require("express").Router();
const { ExpenseCreate } = require("../../../../controllers/create");
const { AllExpenseData } = require("../../../../controllers/getdata");
const { verifyExpense } = require("../../../../middleware/fetching");

router.get("/", AllExpenseData);
router.post("/create", ExpenseCreate);
router.use("/:expid", verifyExpense, require("./oneexpense"));

module.exports = router;
