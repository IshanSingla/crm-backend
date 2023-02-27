const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
module.exports = router;