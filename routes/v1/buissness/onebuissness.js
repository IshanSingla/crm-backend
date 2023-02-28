const router = require("express").Router();
const { BuissnessData } = require("../../../controllers/getdata");
const { BuissnessDelete } = require("../../../controllers/delete");
const { BuissnessUpdate } = require("../../../controllers/update");

router.get("/", BuissnessData);
router.delete("/delete", BuissnessDelete);
router.post("/update", BuissnessUpdate);
router.use("/expenses", require("./expenses"));
router.use("/inventory", require("./inventory"));

module.exports = router;
