import { Schema, Types, model, models } from "mongoose";

const commentVoteSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const CommentVote =
  models?.CommentVote || model("CommentVote", commentVoteSchema);

export default CommentVote;
