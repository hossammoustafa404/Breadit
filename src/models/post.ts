import { Type } from "lucide-react";
import { Schema, Types, model, models } from "mongoose";
import { json } from "node:stream/consumers";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      // required: true,
    },
    author: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    community: {
      type: Types.ObjectId,
      required: true,
      ref: "Community",
    },
  },
  { timestamps: true }
);


const Post = models?.Post || model("Post", postSchema);

export default Post;
