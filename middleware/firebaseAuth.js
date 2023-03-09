const admin = require("../configs/firebase");
const userProfile = require("../schema/user/userProfile");

async function firebaseAuth(req, res, next) {
  if (!req.headers || !req.headers["authorization"]) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "Token not found" });
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[0];
  if (!token || token === null) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "Token not found" });
  }
  let firebaseUser = await admin.auth().verifyIdToken(token);
  if (!(firebaseUser && firebaseUser.uid)) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "User not found in firebase" });
  }
  let mongodbUser = await userProfile.findOne({
    uid: firebaseUser.uid,
  });
  req.user = {
    firebaseUser,
    mongodbUser,
  };
  next();
}

async function verifyUserAuth(req, res, next) {
  const { mongodbUser, firebaseUser } = req.user;

  if (mongodbUser) {
    next();
  } else {
      admin
        .auth()
        .deleteUser(firebaseUser.uid)
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error) => {
          console.log("Error deleting user:", error.message);
        });
    return res.status(401).json({
      message: "Unauthorized, Firebase User Deleted",
      status: "User not found in Mongodb",
    });
  }
}

module.exports = {
  firebaseAuth,
  verifyUserAuth,
};
