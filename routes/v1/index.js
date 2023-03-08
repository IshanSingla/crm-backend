const { verifyUserAuth } = require("../../middleware/firebaseAuth");

const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/auth", verifyUserAuth, require("./auth"));
router.use("/buissness", verifyUserAuth, require("./buissness"));
router.use("/admin", require("./admin"));

module.exports = router;
