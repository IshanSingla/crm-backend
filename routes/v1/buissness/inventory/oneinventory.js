const { InventoryDelete } = require("../../../../controllers/delete");
const { InventoryData } = require("../../../../controllers/getdata");
const { InventoryUpdate } = require("../../../../controllers/update");

const router = require("express").Router();

router.get("/", InventoryData);
router.post("/update", InventoryUpdate);
router.delete("/delete", InventoryDelete);

module.exports = router;
