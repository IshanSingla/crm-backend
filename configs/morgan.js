const morgan = require("morgan");
const fs = require("fs");

morgan.token("id", (req) => req.id);

const logFormat =
  ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms";
var accessLogStream = fs.createWriteStream("access.log", { flags: "a" });
const morganImpl = morgan(logFormat);

module.exports = {
  morganImpl,
};
