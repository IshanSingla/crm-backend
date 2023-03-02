const router = require("express").Router();
const { BuissnessCreate } = require("../../../controllers/create");
const { AllBuissnessData } = require("../../../controllers/getdata");
const { verifyBuissness } = require("../../../middleware/fetching");
const { BuissnessData } = require("../../../controllers/getdata");
const { BuissnessDelete } = require("../../../controllers/delete");
const { BuissnessUpdate } = require("../../../controllers/update");

router.get("/all", AllBuissnessData);
router.post("/create", BuissnessCreate);

router.get("/one", verifyBuissness, BuissnessData);
router.delete("/delete", verifyBuissness, BuissnessDelete);
router.post("/update", verifyBuissness, BuissnessUpdate);
router.use("/expenses", verifyBuissness, require("./expenses"));
router.use("/inventory", verifyBuissness, require("./inventory"));

module.exports = router;
