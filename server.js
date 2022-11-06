const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

const { HOST_DB } = process.env;
async function main() {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
main();
