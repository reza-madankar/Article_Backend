import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  return await book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json(error));
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return await Book.findById(bookId)
    .populate("author")
    .populate("tags")
    .select("-__v")
    .then((book) =>
      book
        ? res.status(200).json({ book })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await Book.find()
    .populate("author")
    .populate("tags")
    .select("-__v")
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return await Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body);

        return book
          .save()
          .then((book) => res.status(200).json({ book }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const addTagtoBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;

  return await Book.findByIdAndUpdate(bookId, {
    $push: { tags: req.params.tagId },
  })
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json(error));
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return await Book.findByIdAndDelete(bookId)
    .then((book) =>
      book
        ? res.status(200).json({ message: "deleted." })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const deleteTagfromBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  const tagId = req.params.tagId;

  return await Book.updateMany(
    { _id: { $nin: bookId } },
    { $pull: { tags: tagId } }
  )
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json(error));
};

export default {
  createBook,
  addTagtoBook,
  deleteTagfromBook,
  readBook,
  readAllBooks,
  updateBook,
  deleteBook,
};
