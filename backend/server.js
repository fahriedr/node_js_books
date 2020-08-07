const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const mysql = require("./models/dbUser");

const books = require("./routes/books");
const user = require("./routes/user");

const port = process.env.PORT || 5000;
const uri = "mongodb://localhost:5000:27017/books";

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

app.use(bodyParser.json());
app.use("/book", books);
app.use("/user", user);

connection.once("open", () => {
  console.log("Connect to MongoDB");
});

app.listen(port, () => {
  console.log("Connect to port : 5000");
});
