const { request } = require("express");
const { firebaseAuth } = require("../middleware/firebaseAuth");
const axios = require("axios");

const router = require("express").Router();
// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the CRM" });
// });
router.get("/", function (req, res) {
  const ipAddress = req.socket.remoteAddress.replace("::ffff:", "");
  res.json({ hearder: req.headers["user-agent"], ipAddress });
  // axios
  //   .get("https://www.iplocate.io/api/lookup/" + ipAddress, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       // Authorization: "Bearer " + process.env.IPLOCATE_API_KEY,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(req.headers);
  //     res.json({ ...response.data });
  //   });
  // res.json({ ip: ipAddress });
});

router.use("/api/v1", firebaseAuth, require("./v1"));

router.use("*", (req, res) => {
  res.status(404).json({ message: "404 Error", route: req.originalUrl });
});
module.exports = router;
