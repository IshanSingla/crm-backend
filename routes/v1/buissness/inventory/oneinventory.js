const { InventoryDelete } = require("../../../../controllers/delete");
const { InventoryUpdate } = require("../../../../controllers/update");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res
    .status(200)
    .json({ message: "Inventory fetched", inventory: req.inventory });
});

router.post("/update", InventoryUpdate);

router.delete("/delete", InventoryDelete);


module.exports = router;
