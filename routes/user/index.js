const router = require("express").Router();
const userProfile = require("../../schema/user/userProfile");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRM" });
});
router.get("/profile", (req, res) => {
  const { mongodbUser } = req.user;
  res.status(200).json({ message: "User fetched", user: mongodbUser });
});

router.get("/avatar", (req, res) => {
  const { mongodbUser } = req.user;
  if (mongodbUser.photoUrl == "") {
    res.redirect(mongodbUser.photoUrl);
  } else {
    res.redirect(
      `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${mongodbUser.name}`
    );
  }
});
router.post("/update", async (req, res) => {
  const { mongodbUser } = req.user;
  const { name, userGender, phoneNumber, userAddress } = req.body;
  if (name) {
    await userProfile.findByIdAndUpdate(
      mongodbUser._id,
      { name },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: "Error updating user" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      }
    );
  }
  if (userGender) {
    await userProfile.findByIdAndUpdate(
      mongodbUser._id,
      { userGender },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: "Error updating user" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      }
    );
  }
  if (phoneNumber) {
    await userProfile.findByIdAndUpdate(
      mongodbUser._id,
      {
        phoneNumber: {
          number: phoneNumber,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: "Error updating user" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      }
    );
  }
  if (userAddress) {
    await userProfile.findByIdAndUpdate(
      mongodbUser._id,
      { userAddress },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).json({ message: "Error updating user" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      }
    );
  }
});

module.exports = router;
