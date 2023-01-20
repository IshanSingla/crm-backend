const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");

router.get("/", (req, res) => {
  var data = buissnessExpense
    .findById(req.buissness._id)
    .populate("expenses")
    .exec(function (err, doc) {
      if (err) {
        res.status(500).json({ message: "Error fetching buissness" });
      } else {
        res.json({ message: "Buissness fetched", buissness: doc });
      }
    });
});

router.delete("/delete", async (req, res) => {
    const { id } = req.params;
    await buissnessExpense.findByIdAndDelete(id);
    res.send({ message: "Buissness Deleted Sucessfully" });
    });

router.use("/data/:expid", require("./expense"));

module.exports = router;
