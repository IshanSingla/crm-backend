const router = require("express").Router();
const buissnessExpense = require("../../schema/buissness/buissnessExpense");
const userProfile = require("../../schema/user/userProfile");

router.get("/", async (req, res) => {
  const { mongodbUser } = req.user;
  res.json({
    message: "Buissness fetched",
    buissness: mongodbUser.buissnessExpense,
  });
});

router.use(
  "/buissness/:id",
  (req, res, next) => {
    const { id } = req.params;
    const { mongodbUser } = req.user;
    const buissness = mongodbUser.buissnessExpense.filter(
      (buissness) => buissness._id == id
    );
    if (buissness.length > 0) {
      req.buissness = buissness[0];
      next();
    } else {
      res.status(404).json({ message: "Buissness not found" });
    }
  },
  require("./buissness")
);

router.post("/create", async (req, res) => {
  const { mongodbUser } = req.user;
  const { buissnessName, buissnessGstNo } = req.body;
  let da = new buissnessExpense({
    buissnessName,
    buissnessGstNo,
    buissnessExpensesTypes: [],
    buissnessCustomers: [],
    createdBy: mongodbUser._id,
  });
  let data = await da.save();
  res.status(200).json({ message: "Buissness created successfully" });

  // await userProfile.findByIdAndUpdate(
  //   mongodbUser._id,
  //   { $push: { buissnessExpense: data._id } },
  //   { new: true },
  //   (err, doc) => {
  //     if (err) {
  //       res.status(500).json({ message: "Error creating buissness" });
  //     } else {
  //       res
  //         .status(200)
  //         .json({ message: "Buissness created successfully" });
  //     }
  //   }
  // );
});

module.exports = router;
