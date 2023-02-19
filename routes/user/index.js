const router = require("express").Router();
const userProfile = require("../../schema/user/userProfile");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
router.get("/profile", (req, res) => {
  const { mongodbUser } = req.user;
  res.status(200).json({ message: "User fetched", user: mongodbUser });
});

router.post("/update", async (req, res) => {
  const { mongodbUser } = req.user;
  const { name, userGender, phoneNumber } = req.body;
  let data = {};
  name ? (data.name = name) : (data.name = mongodbUser.name);
  userGender ? (data.userGender = userGender) : (data.userGender = mongodbUser.userGender);
  phoneNumber ? (data.phoneNumber.number = phoneNumber) : (data.phoneNumber = mongodbUser.phoneNumber);
  await userProfile.findByIdAndUpdate(
    mongodbUser._id,
    data,
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Error updating user" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

module.exports = router;
