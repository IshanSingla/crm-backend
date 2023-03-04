const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    const con = mongoose.connect(process.env.MONGO_URI, {
      dbName: "main",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      mongoose.set("useFindAndModify", false);
      console.log(`MongoDB is Connected with Host ${connection.host}`);
    });
    connection.on("disconnected", () => {
      console.log(`MongoDB is disconnected from Host :${connection.host}`);
    });
  } catch (error) {
    console.log("Error connecting to mongo.", error);
  }
};
mongodb();
module.exports = mongodb;
