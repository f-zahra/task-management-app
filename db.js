require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection URI (replace with your MongoDB URI)

function connectToDatabase() {
  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  }
}

module.exports = connectToDatabase;
