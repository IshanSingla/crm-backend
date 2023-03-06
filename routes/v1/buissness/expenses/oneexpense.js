const { ExpenseDelete } = require("../../../../controllers/delete");
const { ExpenseData } = require("../../../../controllers/getdata");
const { ExpenseUpdate } = require("../../../../controllers/update");

const router = require("express").Router();

router.get("/", ExpenseData);
router.post("/update", ExpenseUpdate);
router.delete("/delete", ExpenseDelete);

module.exports = router;
