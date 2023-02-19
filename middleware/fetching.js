const buissnessExpense = require("../schema/buissness");
const verifyBuissness = (req, res, next) => {
  const { buissnessid } = req.params;
  const buissness = req.buissnesses.filter(
    (buissness) => buissness._id == buissnessid
  );
  if (buissness.length > 0) {
    req.buissness = buissness[0];
    req.buissnessid = buissnessid;
    next();
  } else {
    res.status(404).json({ message: "Buissness not found" });
  }
};
const buissnesses = async (req, res, next) => {
  const { mongodbUser } = req.user;
  buissnessExpense.find({ createdBy: mongodbUser._id }, (err, buissness) => {
    if (err) {
      res.status(404).json({ message: "Error fetching buissness",err: err.message });
    } else {
      if (buissness&&buissness.length >= 0) {
        req.buissnesses = buissness;
        next();
      }
      else {
        res.status(404).json({ message: "Error buissness empty" });
      }
    }
  });
};
module.exports = {
  verifyBuissness,
  buissnesses
};
// const verifyExpces=
