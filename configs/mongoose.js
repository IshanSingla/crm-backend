const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = mongoose.connect(
      `mongodb+srv://nodes:Is@290403@cluster0.j2spyj7.mongodb.net/testc?retryWrites=true&w=majority`,
      {
        dbName: "main",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`MongoDB is Connected with Host :${connection.host}`);
    });
    connection.on("disconnected", () => {
      console.log(`MongoDB is disconnected from Host :${connection.host}`);
    });
  } catch (error) {
    console.log("Error connecting to mongo.", error);
  }
};

module.exports = { connectDatabase };
