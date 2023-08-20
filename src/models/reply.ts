import { Schema, Types, model, models } from "mongoose";

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: Types.ObjectId,
      required: true,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Reply = models?.Reply || model("Reply", replySchema);

export default Reply;
