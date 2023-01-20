const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");


router.get("/", async (req, res) => {
  const { mongodbUser } = req.user;
  res.status(200).json({ message: "Buissness fetched", buissness: mongodbUser.buissnessExpense });
});
router.get("/buissness/:id", require("./buissness"));

router.post("/create", async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName, buissnessType, buissnessAddress, buissnessPhoneNumber, } = req.body;
  let da=new buissnessExpense(
    {
      buissnessName,
      buissnessType,
      buissnessAddress,
      buissnessPhoneNumber,
    },
    async (err, buissness) => {
      if (err) {
        res.status(500).json({ message: "Error creating buissness" });
      } else {
        await userProfile.findByIdAndUpdate(
          mongodbUser._id,
          { $push: { buissnessExpense: buissness } },
          { new: true },
          (err, doc) => {
            if (err) {
              res.status(500).json({ message: "Error creating buissness" });
            } else {
              res.status(200).json({ message: "Buissness created successfully" });
            }
          }
        );
      }
    }
  );
  await da.save();
});



  
  
module.exports = router;
