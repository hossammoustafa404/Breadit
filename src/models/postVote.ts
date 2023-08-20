import { Schema, Types, model, models } from "mongoose";

const postVoteSchema = new Schema(
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
    post: {
      type: Types.ObjectId,
      required: true,
      ref: "post",
    },
  },
  { timestamps: true }
);

const PostVote = models?.PostVote || model("PostVote", postVoteSchema);

export default PostVote;
