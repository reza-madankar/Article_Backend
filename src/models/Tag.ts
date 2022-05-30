import mongoose, { Document, Schema } from "mongoose";

export interface ITag {
  title: string;
}

export interface ITagModel extends ITag, Document {}

const TagSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITagModel>("Tag", TagSchema);
