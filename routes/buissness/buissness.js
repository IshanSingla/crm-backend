const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");

router.get("/", async (req, res) => {
  res.json({ message: "Buissness fetched", buissness: req.buissness });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.params;
  await buissnessExpense.findByIdAndDelete(id);
  res.send({ message: "Buissness Deleted Sucessfully" });
});

router.use("/expenses", require("./expenses"));

router.post("/update", async (req, res) => {
  const { id } = req.params;
  const {
    buissnessName,
    buissnessType,
    buissnessAddress,
    buissnessPhoneNumber,
  } = req.body;
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
});

module.exports = router;
