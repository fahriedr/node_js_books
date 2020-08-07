const express = require("express");
const router = express.Router();
const db = require("../models/dbUser");

//READ ALL
router.get("/", (req, res, next) => {
  try {
    db.query("SELECT * FROM user", (err, rows) => {
      if (err) {
        throw err;
      } else {
        if (!rows) res.json("Database Empty");
        res.json(rows);
      }
    });
  } catch (error) {
    next(error);
  }
});

//READ ONE
router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM user WHERE id = " + id, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    next(error);
  }
});

//CREATE
router.post("/create", (req, res, next) => {
  try {
    var id = Math.random();
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;

    const value = {
      name: name,
      phone: phone,
      address: address,
    };

    db.query("INSERT INTO user SET ?", value, (err, result) => {
      if (err) throw err;
      res.json("User added");
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE ONE
router.post("/update/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;

    const value = {
      name: name,
      phone: phone,
      address: address,
    };
    db.query("UPDATE user set ? WHERE id = " + id, value, (err, results) => {
      if (err) {
        throw err;
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    next(error);
  }
});

//DELETE ONE
router.get("/delete/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM user WHERE id = " + id;
    db.query(sql, (err, result) => {
      if (!sql) {
        res.json("Data not found");
      } else {
        res.json("User deleted");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
