import { Schema, Types, model, models } from "mongoose";

const replyVoteSchema = new Schema(
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
    reply: {
      type: Types.ObjectId,
      required: true,
      ref: "reply",
    },
  },
  { timestamps: true }
);

const ReplyVote = models?.ReplyVote || model("ReplyVote", replyVoteSchema);

export default ReplyVote;
