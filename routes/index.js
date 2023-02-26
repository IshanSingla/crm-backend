const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/buissness", require("./buissness"));
router.use("/admin", require("./admin"));

router.use("*", (req, res) => {
  res.status(404).json({ message: "404 Error", route: req.originalUrl });
});
module.exports = router;
