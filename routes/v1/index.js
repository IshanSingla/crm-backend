const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/buissness", require("./buissness"));
router.use("/admin", require("./admin"));

module.exports = router;
