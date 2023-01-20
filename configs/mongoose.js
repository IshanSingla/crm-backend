const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://nodes:Is@290403@cluster0.j2spyj7.mongodb.net/testc?retryWrites=true&w=majority`,
      {
        dbName: "main",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB is Connected with Host :${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to mongo.", error);
  }
};

module.exports = { connectDatabase };
