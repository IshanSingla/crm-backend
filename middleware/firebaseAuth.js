const admin = require("../configs/firebase");
const userProfile = require("../schema/user/userProfile");
const filters = ["/auth/*", "/user/*", "/admin/*"];

async function firebaseAuth(req, res, next) {
  if (!req.headers || !req.headers["authorization"]) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "Token not found" });
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
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
  let mongodbUser = await userProfile.findOne({ uid: firebaseUser.uid });
  if (!(mongodbUser && mongodbUser._id)) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "User not found in mongodb" });
  }
  req.user = {
    firebaseUser,
    mongodbUser,
  };
  next();
}

async function Auth(req, res, next) {
  if (!req.headers || !req.headers["authorization"]) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "Token not found" });
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
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
  let data = await userProfile.findOne({
    $or: [
      {
        uid: firebaseUser.uid,
      },
      {
        email: firebaseUser.email,
      },
      // {
      //   phoneNumber: {
      //     number: firebaseUser.phoneNumber,
      //   },
      // }
    ],
  });
  if (data && data._id) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "User Already Exist" });
  }
  data = req.user = {
    firebaseUser,
  };
  next();
}

async function firebaseBuissness(req, res, next) {
  if (!req.headers || !req.headers["authorization"]) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "Token not found" });
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
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
  let mongodbUser = await userProfile.findOne({ uid: firebaseUser.uid }).populate("buissnessExpense").exec();
  if (!(mongodbUser && mongodbUser._id)) {
    return res
      .status(401)
      .json({ message: "Unauthorized", status: "User not found in mongodb" });
  }
  req.buissness=mongodbUser.buissnessExpense;
  req.user = {
    firebaseUser,
    mongodbUser,
  };
  next();
}

module.exports = {
  firebaseAuth,
  Auth,
  firebaseBuissness,
};
