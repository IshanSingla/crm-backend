const router = require("express").Router();
const { verifyBuissness } = require("../../middleware/fetching");
const buissnessExpense = require("../../schema/buissness/buissness");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  const { mongodbUser } = req.user;
  buissnessExpense.find({ createdBy: mongodbUser._id }, (err, buissness) => {
    if (err) {
      res.status(500).json({ message: "Error fetching buissness" });
    } else {
      res.json({
        message: "Buissness fetched",
        buissness: buissness,
      });
    }
  });
});
router.post("/create", async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName, buissnessGstNo } = req.body;
  let da = new buissnessExpense({
    buissnessName,
    buissnessGstNo,
    createdBy: mongodbUser._id,
  });
  let data = await da.save();
  await userProfile.findByIdAndUpdate(mongodbUser._id, {
    $push: { buissnessExpense: data._id },
  });
  res.status(200).json({ message: "Buissness created successfully" });
});

router.use("/:buissnessid", verifyBuissness, require("./buissness"));

module.exports = router;
