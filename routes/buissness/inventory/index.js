const router = require("express").Router();
const inventory = require("../../../schema/buissness/inventory");
const buissness = require("../../../schema/buissness");

router.get("/", (req, res) => {
  const { buissnessid, buissness } = req;
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }
  inventory.find(
    { buissness: buissnessid },
    {},
    { skip: parseInt(from), limit: parseInt(to) },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        res.status(200).json({
          message: "Inventory fetched",
          inventory: doc,
          count: doc.length,
          totalCount: buissness.inventory.length,
          totalPage: Math.ceil(
            buissness.inventory.length / (parseInt(to) - parseInt(from))
          ),
        });
      }
    }
  );
});
router.post("/create", (req, res) => {
  const { buissnessid } = req;
  const { mongodbUser } = req.user;
  const { name, description, cost, quantity } = req.body;
  new inventory({
    buissnessId: buissnessid,
    inventoryName: name,
    inventoryDescription: description,
    inventoryCost: {
      cost: cost,
    },
    inventoryQuantity: quantity,
    createdBy: mongodbUser._id,
  }).save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error creating inventory" });
    } else {
      buissness.findByIdAndUpdate(buissnessid, {
        $push: { inventory: doc._id },
      });
      res.status(200).json({ message: "Inventory created successfully" });
    }
  });
});

module.exports = router;
