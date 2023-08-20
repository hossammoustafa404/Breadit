import { Schema, model, models, Types } from "mongoose";

const subredditSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subreddit = models?.Subreddit || model("Subreddit", subredditSchema);

export default Subreddit;
