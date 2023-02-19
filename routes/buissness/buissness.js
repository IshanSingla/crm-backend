const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissness");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  res.json({ message: "Buissness fetched", buissness: req.buissness });
});

router.delete("/delete", async (req, res) => {
  const { mongodbUser } = req.user;
  const { id } = req;
  const data = [];
  // console.log(req.params);
  await buissnessExpense.findByIdAndDelete(id);
  mongodbUser.buissnessExpense.map((buissness, index) => {
    if (String(buissness._id) !== id) {
      data.push(String(buissness._id));
    }
  });
  // console.log(data);

  console.log(
    await userProfile.findByIdAndUpdate(mongodbUser._id, {
      buissnessExpense: data,
    })
  );
  res.send({ message: "Buissness Deleted Sucessfully" });
});

router.use("/expenses", require("./expenses"));

router.post("/update", async (req, res) => {
  const { id } = req;
  const {
    buissnessName,
    buissnessType,
    buissnessPhoneNumber,
  } = req.body;
  let data = {};
  data.buissnessName = buissnessName ? buissnessName : req.buissness.buissnessName;
  data.buissnessType = buissnessType ? buissnessType : req.buissness.buissnessType;
  data.buissnessPhoneNumber = buissnessPhoneNumber ? buissnessPhoneNumber : req.buissness.buissnessPhoneNumber;
  await buissnessExpense.findByIdAndUpdate(
    id,
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

module.exports = router;
