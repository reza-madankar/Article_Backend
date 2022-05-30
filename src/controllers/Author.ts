import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";
import { encodeMessage } from "../assistant/Helper";
import { createToken } from "../middleware/ValidateToken";

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const user = await Author.findOne({ email: email });

  if (user) {
    return res
      .status(409)
      .send({ message: "This email is already taken. Try another one." });
  }

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: await encodeMessage(password),
  });

  return await author
    .save()
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json(error));
};

const loginAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  return await Author.findOne({
    email: username,
    password: encodeMessage(password),
  })
    .then(async (author) => {
      if (author) {
        res
          .setHeader("Token", await createToken(author._id))
          .status(200)
          .json({ author });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return await Author.findById(authorId)
    .then((author) =>
      author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json({ error }));
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.authorId;

  return await Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);

        return author
          .save()
          .then((author) => res.status(200).json({ author }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.authorId;

  return await Author.findByIdAndDelete(authorId)
    .then((author) =>
      author
        ? res.status(200).json({ message: "deleted." })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createAuthor,
  readAuthor,
  readAllAuthors,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
};
