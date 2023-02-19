const verifyBuissness = (req, res, next) => {
  const { buissnessid } = req.params;
  const { mongodbUser } = req.user;
  const buissness = mongodbUser.buissnessExpense.filter(
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
module.exports = {
  verifyBuissness,
};
// const verifyExpces=
