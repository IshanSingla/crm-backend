const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
// const { morganImpl } = require("./configs/morgan");
const { connectDatabase } = require("./configs/mongoose");
const { getIPAddress } = require("./utils/getIPAddress");
const app = express();
dotenv.config();

connectDatabase();

app
  .use(express.json())
  .use(cors())
  // .use(firebaseAuth)
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
