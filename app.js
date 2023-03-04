// Entry point of the application
require("dotenv").config();

// Importing the required modules
const express = require("express");
const cors = require("cors");
const app = express();

// Importing the required files
// const { morganImpl } = require("./configs/morgan");
const { errorHandler } = require("./middleware/errorHandler");
const { getIPAddress } = require("./utils/getIPAddress");

// Connecting to the database
require("./configs/mongoose");
require("./configs/redis");

app
  .use(express.json())
  .use(cors())
  // .use(morganImpl)
  .use("/", require("./routes"))
  .use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`
  ************************************************************
                    Listening on port: ${PORT}
                    http://localhost:${PORT}
                    http://${getIPAddress()}:${PORT}
  ************************************************************`);
});
