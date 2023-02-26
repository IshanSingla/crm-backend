const verifyBuissness = (req, res, next) => {
  const { buissnessid } = req.params;
  const { mongodbUser } = req.user;
  const buissness = mongodbUser.buissness.filter(
    (buissness) => buissness == buissnessid
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
