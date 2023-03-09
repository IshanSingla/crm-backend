const router = require("express").Router();
const { CartCreate } = require("../../../controllers/create");
const { CartDelete } = require("../../../controllers/delete");
const { CartUpdate } = require("../../../controllers/update");
const { verifyBuissness } = require("../../../middleware/fetching");

router.get("/create", verifyBuissness, CartCreate);
router.get("/delete/:id", verifyBuissness, CartDelete);
router.post("/update", verifyBuissness, CartUpdate);

module.exports = router;