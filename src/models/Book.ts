import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  tags: string[];
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBookModel>("Book", BookSchema);
