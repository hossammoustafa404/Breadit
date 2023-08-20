import { Schema, Types, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = models?.Comment || model("Comment", commentSchema);

export default Comment;
