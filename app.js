const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { errorHandler } = require("./middleware/errorHandler");
const { firebaseAuth } = require("./middleware/firebaseAuth");
const { morganImpl } = require("./configs/morgan");
const { connectDatabase } = require("./configs/mongoose");
const { getIPAddress } = require("./utils/getIPAddress");

const app = express();
dotenv.config();

app
  .use(express.json())
  // .use(helmet())
  .use(firebaseAuth)
  .use(morganImpl)
  .use("/", require("./routes"))
  .use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

// // heroku awake way
// setInterval(() => {
//   http.get("");
// }, 300000); // every 5 minutes (300000)
const text = `************************************************************
                  Listening on port: ${PORT}
                  http://localhost:${PORT}
                  http://${getIPAddress()}:${PORT}
************************************************************`;
connectDatabase()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(text);
    });
  })
  .catch((err) => {
    console.log("Error at Connecting Database ", err);
  });
