const { verifyUserAuth } = require("../../middleware/firebaseAuth");

const router = require("express").Router();

router.use("/user", verifyUserAuth, require("./user"));
router.use("/auth", require("./auth"));
router.use("/buissness", verifyUserAuth, require("./buissness"));
router.use("/admin", require("./admin"));

module.exports = router;
