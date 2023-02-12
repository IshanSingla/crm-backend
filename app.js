const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandler");
const { morganImpl } = require("./configs/morgan");
const { connectDatabase } = require("./configs/mongoose");
const { getIPAddress } = require("./utils/getIPAddress");

const app = express();
dotenv.config();

app
  .use(express.json())
  // .use(firebaseAuth)
  .use(morganImpl)
  .use("/", require("./routes"))
  .use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;

const text = `
************************************************************
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
