const router = require("express").Router();
const { admin } = require("../../../configs/firebase");

router.post("/create", async (req, res) => {
  try{
  const { userGender, phoneNumber } = req.body;
  let uid = req.user.uid;
  await admin.auth().updateUser(uid, {
    phoneNumber: phoneNumber,
  });
  admin
    .auth()
    .setCustomUserClaims(uid, {
      type: "ghvjkjilukhgvhhb",
      userGender: userGender,
    })
    .then((newUser) => {
      res
        .status(200)
        .send({ message: "User created successfully", data: newUser });
    })
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
  }catch(err){
    res.status(404).send({ message: err.message });
  }
  
});

router.get("/check", async (req, res) => {
  res.status(200).json({ message: "User fetched", data: req.user });
});

module.exports = router;
