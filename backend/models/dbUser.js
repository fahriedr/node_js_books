const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_js",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connect to Mysql Success");
});

module.exports = con;
