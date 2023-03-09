// Entry point of the application
require("dotenv").config();

// Importing the required modules
const express = require("express");
const csurf = require("csurf");
const cors = require("cors");
const app = express();

// Importing the required files
const { errorHandler } = require("./middleware/errorHandler");
const { getIPAddress } = require("./utils/getIPAddress");

// Connecting to the database
require("./configs/mongoose")();

app
  .disable("x-powered-by")
  .use(express.json())
  // .use(express.urlencoded({ extended: true }))
  .use(cors())
  // .use(csurf())

  .use(require("./configs/morgan"))
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
