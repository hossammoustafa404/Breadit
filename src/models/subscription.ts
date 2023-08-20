import { Schema, Types, model, models } from "mongoose";

const subscriptionSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    subreddit: {
      type: Types.ObjectId,
      required: true,
      ref: "subreddit",
    },
  },
  { timestamps: true }
);

const Subscription =
  models?.Subscription || model("Subscription", subscriptionSchema);

export default Subscription;
