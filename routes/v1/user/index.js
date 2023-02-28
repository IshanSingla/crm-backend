const router = require("express").Router();
const userProfile = require("../../../schema/user/userProfile");

router.get("/profile", async (req, res) => {
  const { mongodbUser } = req.user;
  res.status(200).json({ message: "User fetched", user: mongodbUser });
});

router.post("/update", async (req, res) => {
  const { mongodbUser } = req.user;
  const { name, userGender, phoneNumber } = req.body;
  mongodbUser.name = name;
  mongodbUser.userGender = userGender;
  mongodbUser.phoneNumber = phoneNumber;
  mongodbUser.save((err, doc) => {
    if (err) {
      res.status(500).json({ message: "Error updating user" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  });
});

module.exports = router;
