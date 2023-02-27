const { firebaseAuth } = require("../middleware/firebaseAuth");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the CRM" });
});

router.use("/api/v1", firebaseAuth, require("./v1"));

router.use("*", (req, res) => {
  res.status(404).json({ message: "404 Error", route: req.originalUrl });
});
module.exports = router;
