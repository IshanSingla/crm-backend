const router = require("express").Router();
const inventory = require("../../../schema/buissness/inventory");
const buissness = require("../../../schema/buissness");
const { verifyInventry } = require("../../../middleware/fetching");

router.get("/", (req, res) => {
  // const { buissnessid, buissness } = req;
  let { from, to } = req.query;
  from = from ? from : "0";
  to = to ? to : "20";
  if (parseInt(from) > parseInt(to)) {
    res.status(400).json({ message: "Invalid query" });
  }
  inventory.find(
    { buissness: req.buissnessid },
    {},
    {sort: { createdAt: -1 }, skip: parseInt(from), limit: parseInt(to) },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error fetching inventory" });
      } else {
        inventory
          .find({ buissness: req.buissnessid })
          .countDocuments((err, count) => {
            if (err) {
              res.status(500).json({ message: "Error fetching inventory" });
            } else {
              res.status(200).json({
                message: "Inventory fetched",
                inventory: doc,
                count: doc.length,
                totalCount: count,
                totalPage: Math.ceil(count / (parseInt(to) - parseInt(from))),
              });
            }
          });
      }
    }
  );
});

router.post("/create", async (req, res) => {
  try {
    const { buissnessid } = req;
    const { mongodbUser } = req.user;
    const { name, description, cost, quantity, sellingPrice, buyingPrice } =
      req.body;
    let data = new inventory({
      buissness: buissnessid,
      inventoryName: name,
      inventoryDescription: description,
      inventoryCost: {
        sellingPrice: sellingPrice,
        buyingPrice: buyingPrice,
      },
      inventoryQuantity: quantity,
      createdBy: mongodbUser._id,
    });

    let doc = await data.save();
    buissness.findByIdAndUpdate(buissnessid, {
      $push: { inventory: doc._id },
    });
    res.status(200).json({ message: "Inventory created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating inventory" });
  }
});

router.use("/:invid", verifyInventry, require("./oneinventory"));

module.exports = router;
