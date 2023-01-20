const router = require("express").Router();
const { Auth, firebaseAuth } = require("../../middleware/firebaseAuth");
const userProfile = require("../../schema/user/userProfile");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});

router.post("/create", Auth, async (req, res) => {
  const { email, name, userGender, phoneNumber } = req.body;
  const { firebaseUser } = req.user;
  let us = new userProfile({
    email,
    name,
    userGender: userGender,
    phoneNumber: {
      number: phoneNumber,
    },
    uid: firebaseUser.uid,
    // userAddress,
    userType: "63ca92f13ec1a3d50bdeb75b",
  });
  let user = await us.save();
  res.status(200).json({ message: "User created successfully" });
});

router.get("/get", firebaseAuth, async (req, res) => {
  let { mongodbUser } = req.user;
  res.status(200).json({ message: "User fetched", user: mongodbUser });
});

module.exports = router;
