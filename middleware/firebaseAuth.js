const { admin } = require("../configs/firebase");
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
  req.user = firebaseUser;
  next();
}

async function verifyUserAuth(req, res, next) {
  if (!(req.user.type)) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "User not found in firebase" });
  }
  else{
    next();
  }
}

module.exports = {
  firebaseAuth,
  verifyUserAuth,
};
