const router = require("express").Router();
const { CartCreate } = require("../../../controllers/create");
const { CartDelete } = require("../../../controllers/delete");
const { CartUpdate } = require("../../../controllers/update");
const { verifyBuissness } = require("../../../middleware/fetching");

router.get("/create", CartCreate);
router.get("/delete/:id", CartDelete);
router.post("/update", CartUpdate);

module.exports = router;