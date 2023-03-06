const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");

const AddBuissnessUser = async (req, res) => {
  const { buissnessid } = req;
  const { email } = req.body;
  userProfile.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).json({ message: "Error finding user" });
    } else {
      if (user) {
        buissness.findByIdAndUpdate(
          buissnessid,
          {
            $push: {
              users: {
                $each: [user._id],
                $position: 0,
              },
              roles: {
                $each: [user.userType],
                $position: 0,
              },
            },
          },
          (err, doc) => {
            if (err) {
              res.status(500).json({ message: "Error adding user" });
            } else {
              res.status(200).json({ message: "User added successfully" });
            }
          }
        );
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
};

module.exports = {
  AddBuissnessUser,
};
