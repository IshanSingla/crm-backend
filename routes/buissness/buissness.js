const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  const { id } = req.params;
  const { mongodbUser } = req.user;
  const buissness = mongodbUser.buissnessExpense.filter(
    (buissness) => buissness._id == id
  );
  if (buissness.length > 0) {
    res
      .json({ message: "Buissness fetched", buissness: buissness[0] });
  } else {
    res.status(404).json({ message: "Buissness not found" });
  }
});

router.post("/update", async (req, res) => {
  const { id } = req.params;
  const { mongodbUser } = req.user;
  const {
    buissnessName,
    buissnessType,
    buissnessAddress,
    buissnessPhoneNumber,
  } = req.body;
  const buissness = mongodbUser.buissnessExpense.filter(
    (buissness) => buissness._id == id
  );
  if (buissness.length > 0) {
    if (buissnessName) {
      await buissnessExpense.findByIdAndUpdate(
        id,
        {
          buissnessName,
        },
        { new: true },
        (err, doc) => {
          if (err) {
          } else {
            res.status(200).json({ message: "Buissness updated successfully" });
          }
        }
      );
    }
    if (buissnessType) {
      await buissnessExpense.findByIdAndUpdate(
        id,
        {
          buissnessType,
        },
        { new: true },
        (err, doc) => {
          if (err) {
          } else {
            res.status(200).json({ message: "Buissness updated successfully" });
          }
        }
      );
    }
    if (buissnessAddress) {
      await buissnessExpense.findByIdAndUpdate(
        id,
        {
          buissnessAddress,
        },
        { new: true },
        (err, doc) => {
          if (err) {
          } else {
            res.status(200).json({ message: "Buissness updated successfully" });
          }
        }
      );
    }
    if (buissnessPhoneNumber) {
      await buissnessExpense.findByIdAndUpdate(
        id,
        {
          buissnessAddress,
        },
        { new: true },
        (err, doc) => {
          if (err) {
          } else {
            res.status(200).json({ message: "Buissness updated successfully" });
          }
        }
      );
    }
  } else {
    res.status(404).json({ message: "Buissness not found" });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.params;
  const { mongodbUser } = req.user;
  const buissness = mongodbUser.buissnessExpense.filter(
    (buissness) => buissness._id == id
  );
  if (buissness.length > 0) {
    await buissnessExpense.findByIdAndDelete(buissness[0]._id);
    res.send({ message: "Buissness Deleted Sucessfully" });
  } else {
    res.status(404).json({ message: "Buissness not found" });
  }
});

module.exports = router;
