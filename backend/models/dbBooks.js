const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    pages: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("books", booksSchema);

module.exports = Books;
