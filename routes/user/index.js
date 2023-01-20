const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
router.use("/profile", require("./profile"));
module.exports = router;