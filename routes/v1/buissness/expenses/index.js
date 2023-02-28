const router = require("express").Router();
const { ExpenseCreate } = require("../../../../controllers/create");
const { ExpenseData } = require("../../../../controllers/getdata");
const { verifyExpense } = require("../../../../middleware/fetching");

router.get("/", ExpenseData);
router.post("/create", ExpenseCreate);
router.use("/:expid", verifyExpense, require("./oneexpense"));

module.exports = router;
