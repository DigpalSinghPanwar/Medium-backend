const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const db = process.env.DATABASE_URL;

mongoose.connect(db).then(() => console.log("database connected succesful"));

const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log("welcome to medium clone in node app");
});
