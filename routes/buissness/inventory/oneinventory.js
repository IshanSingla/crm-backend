const router = require("express").Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Inventory fetched", inventory: req.inventory });
});

router.post("/update", (req, res) => {
  const { inventory } = req;
  const { name, description, cost, quantity, sellingPrice, buyingPrice } =
    req.body;
  inventory.inventoryName = name;
  inventory.inventoryDescription = description;
  inventory.inventoryCost.sellingPrice = sellingPrice;
  inventory.inventoryCost.buyingPrice = buyingPrice;
  inventory.inventoryQuantity = quantity;
  inventory.save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error updating inventory" });
    } else {
      res.status(200).json({ message: "Inventory updated successfully" });
    }
  });
});

router.delete("/delete", (req, res) => {
  const { inventory } = req;
  inventory.delete((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error deleting inventory" });
    } else {
      res.status(200).json({ message: "Inventory deleted successfully" });
    }
  });
});

router.post("/addquantity", (req, res) => {
  const { inventory } = req;
});

module.exports = router;
