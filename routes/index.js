const { firebaseAuth } = require("../middleware/firebaseAuth");
const axios = require("axios");

const router = require("express").Router();
// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the CRM" });
// });
router.get("/", function (req, res) {
  axios
    .get("https://www.iplocate.io/api/lookup/" + req.ip, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: "Bearer " + process.env.IPLOCATE_API_KEY,
      },
    })
    .then((response) => {
      res.json({ hearder: req.headers["user-agent"], ...response.data });
    });
});

router.use("/api/v1", firebaseAuth, require("./v1"));
router.use("/data",require("./data"))

router.use("*", (req, res) => {
  res.status(404).json({ message: "404 Error", route: req.originalUrl });
});
module.exports = router;