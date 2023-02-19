const router = require("express").Router();
const { verifyBuissness } = require("../../middleware/fetching");
const buissnessExpense = require("../../schema/buissness/index.js");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  res.json({
    message: "Buissness fetched",
    buissness: req.buissnesses,
    
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
    $push: { buissnessExpense: data._id },
  });
  res.status(200).json({ message: "Buissness created successfully" });
});

router.use("/:buissnessid", verifyBuissness, require("./buissness"));

module.exports = router;
