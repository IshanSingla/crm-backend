const router = require("express").Router();
const { verifyInventry } = require("../../../../middleware/fetching");
const { InventoryCreate } = require("../../../../controllers/create");
const { AllInventoryData } = require("../../../../controllers/getdata");

router.get("/", AllInventoryData);

router.post("/create", InventoryCreate);

router.use("/:invid", verifyInventry, require("./oneinventory"));

module.exports = router;
