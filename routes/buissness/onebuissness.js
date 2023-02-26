const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/index.js");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  const { buissnessid } = req;
  buissnessExpense.findById(buissnessid, (err, doc) => {
    if (err) {
      res.status(404).json({ message: "Buissness not found" });
    } else {
      res.status(200).json({ message: "Buissness fetched", buissness: doc });
    }
  });
});

router.delete("/delete", async (req, res) => {

  // need to check this api is working or not
  const { mongodbUser } = req.user;
  const { buissnessid } = req;
  const data = [];
  await buissnessExpense.findByIdAndDelete(buissnessid);
  mongodbUser.buissnessExpense.map((buissness, index) => {
    if (String(buissness._id) !== id) {
      data.push(String(buissness._id));
    }
  });
  await userProfile.findByIdAndUpdate(mongodbUser._id, {
    buissnessExpense: data,
  });
  res.send({ message: "Buissness Deleted Sucessfully" });
});

router.post("/update", async (req, res) => {
  const { buissnessid } = req;
  const { buissnessName, buissnessType, buissnessPhoneNumber } = req.body;
  let data = {};
  data.buissnessName = buissnessName;
  data.buissnessType = buissnessType;
  data.buissnessPhoneNumber = buissnessPhoneNumber;

  await buissnessExpense.findByIdAndUpdate(
    buissnessid,
    data,
    { new: true },
    (err, doc) => {
      if (err) {
      } else {
        res.status(200).json({ message: "Buissness updated successfully" });
      }
    }
  );
});

router.use("/expenses", require("./expenses"));
router.use("/inventory", require("./inventory"));

module.exports = router;
