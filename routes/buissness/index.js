const router = require("express").Router();
const { verifyBuissness } = require("../../middleware/fetching");
const buissnessExpense = require("../../schema/buissness/index.js");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  const { mongodbUser } = req.user;
  buissnessExpense.find({ createdBy: mongodbUser._id }, (err, buissness) => {
    if (err) {
      res
        .status(404)
        .json({ message: "Error fetching buissness", err: err.message });
    } else {
      if (buissness && buissness.length >= 0) {
        res.json({
          message: "Buissness fetched",
          buissness: buissness,
        });
      } else {
        res.status(404).json({ message: "Error buissness empty" });
      }
    }
  });
});

router.post("/create", async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName } = req.body;
  let da = new buissnessExpense({
    buissnessName,
    createdBy: mongodbUser._id,
  });
  let data = await da.save();
  await userProfile.findByIdAndUpdate(mongodbUser._id, {
    $push: { buissness: data._id },
  });
  res.status(200).json({ message: "Buissness created successfully" });
});

router.use("/:buissnessid", verifyBuissness, require("./onebuissness"));

module.exports = router;
