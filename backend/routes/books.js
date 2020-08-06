const express = require("express");
const router = express.Router();
const Books = require("../models/dbBooks");

//GET ALL BOOKS
router.get("/", async (req, res, next) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

//GET ONE BOOK
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Books.findById(id);
    if (!book) {
      res.json("Book not found");
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

//CREATE A BOOK
router.post("/create", async (req, res, next) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const pages = Number(req.body.pages);
    const year = Number(req.body.year);
    const book = await new Books({
      title,
      author,
      pages,
      year,
    });
    book.save();
    res.json("Book added");
  } catch (error) {
    next(error);
  }
});

//UPDATE A BOOK
router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Books.findById(id);
    if (!book) {
      res.json("Book not found");
    }
    const title = req.body.title;
    const author = req.body.author;
    const pages = Number(req.body.pages);
    const year = Number(req.body.year);
    const values = {
      title,
      author,
      pages,
      year,
    };
    await Books.findByIdAndUpdate(id, values);
    res.json("Book has been updated");
  } catch (error) {
    next(error);
  }
});

//DELETE A BOOK
router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Books.findByIdAndDelete(id);
    if (!book) res.json("Book not found");
    res.json("Book has been deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
