const expense = require("../schema/buissness/expenses");
const inventory = require("../schema/buissness/inventory");
const buissness = require("../schema/buissness");
const userProfile = require("../schema/user/userProfile");
const inventoryTransaction = require("../schema/buissness/inventory/inventorytransaction");
const { admin } = require("../configs/firebase");

const AddBuissnessUser = async (req, res) => {
  const { buissnessid } = req;
  const { email, type} = req.body;
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      if (userRecord) {
        buissness.findByIdAndUpdate(
          buissnessid,
          {
            $push: {
              users: {
                user: userRecord.uid,
                email: userRecord.email,
                roleName: type,
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
    })
    .catch((err) => {
      res.status(404).json({ message: "User not found" });
    });
};

module.exports = {
  AddBuissnessUser,
};
