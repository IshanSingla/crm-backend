const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
router.delete("/delete", async (req, res) => {
  const { id } = req.params;
  await buissnessExpense.findByIdAndDelete(id);
  res.send({ message: "Buissness Deleted Sucessfully" });
});

module.exports = router;
