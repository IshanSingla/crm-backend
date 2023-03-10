const router = require("express").Router();
const { CartUpdate } = require("../../../controllers/update");

router.get("/", (req, res) => {
  res.json({ message: "Cart fetched", data: req.cart });
});
router.post("/update/:type", CartUpdate);

module.exports = router;
