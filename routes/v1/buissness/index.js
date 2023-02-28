const router = require("express").Router();
const { BuissnessCreate } = require("../../../controllers/create");
const { AllBuissnessData } = require("../../../controllers/getdata");
const { verifyBuissness } = require("../../../middleware/fetching");

router.get("/", AllBuissnessData);
router.post("/create", BuissnessCreate);
router.use("/:buissnessid", verifyBuissness, require("./onebuissness"));

module.exports = router;
