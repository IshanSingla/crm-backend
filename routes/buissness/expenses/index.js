const router = require("express").Router();
const buissnessExpense = require("../../../schema/buissness/buissness");

router.get("/", (req, res) => {
  const { id } = req.params;
  var data = buissnessExpense.findById(id).exec(function (err, doc) {
    if (err) {
      res.status(500).json({ message: "Error fetching buissness" });
    } else {
      res.json({ message: "Buissness fetched", buissness: doc });
    }
  });
});

router.use("/:expid", require("./expense"));

module.exports = router;
