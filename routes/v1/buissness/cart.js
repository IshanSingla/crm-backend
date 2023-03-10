const router = require("express").Router();
const { CartDelete } = require("../../../controllers/delete");
const { CartUpdate } = require("../../../controllers/update");
const { CartData } = require("../../../controllers/getdata");
const { verifyCart } = require("../../../middleware/fetching");

router.get("/delete/:id", CartDelete);
router.post("/update", CartUpdate);
router.get("/", CartData);

module.exports = router;