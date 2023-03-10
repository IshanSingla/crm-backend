const router = require("express").Router();
const { BuissnessCreate } = require("../../../controllers/create");
const {
  AllBuissnessData,
  BuissnessData,
} = require("../../../controllers/getdata");
const { verifyBuissness, verifyCart } = require("../../../middleware/fetching");
const { BuissnessDelete } = require("../../../controllers/delete");
const { BuissnessUpdate } = require("../../../controllers/update");
const { AddBuissnessUser } = require("../../../controllers/AddAccess");

router.get("/all", AllBuissnessData);
router.post("/create", BuissnessCreate);

router.get("/one", verifyBuissness, BuissnessData);
router.delete("/delete", verifyBuissness, BuissnessDelete);
router.post("/update", verifyBuissness, BuissnessUpdate);
router.post("/adduser", verifyBuissness, AddBuissnessUser);
router.use("/expenses", verifyBuissness, require("./expenses"));
router.use("/inventory", verifyBuissness, require("./inventory"));
router.use("/cart", verifyCart, require("./cart"));

module.exports = router;
