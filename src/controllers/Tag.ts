import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Tag from "../models/Tag";

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  const tag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    title,
  });

  return await tag
    .save()
    .then((tag) => res.status(201).json({ tag }))
    .catch((error) => res.status(500).json(error));
};

const readTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.tagId;

  return await Tag.findById(tagId)
    .populate("book")
    .select("-__v")
    .then((tag) =>
      tag
        ? res.status(200).json({ tag })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllTagByBookId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await Tag.find({ books: { $in: [req.params.bookId] } })
    .populate("book")
    .select("-__v")
    .then((tags) => res.status(200).json({ tags }))
    .catch((error) => res.status(500).json({ error }));
};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.tagId;

  return await Tag.findById(tagId)
    .then((tag) => {
      if (tag) {
        tag.set(req.body);

        return tag
          .save()
          .then((tag) => res.status(200).json({ tag }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = req.params.tagId;

  return await Tag.findByIdAndDelete(tagId)
    .then((tag) =>
      tag
        ? res.status(200).json({ message: "deleted." })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createTag, readTag, readAllTagByBookId, updateTag, deleteTag };
