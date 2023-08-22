import { Schema, model, models, Types } from "mongoose";
import Subscription from "./subscription";
import User from "./user";

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    superAdmin: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

communitySchema.virtual("subscriptions", {
  ref: Subscription,
  localField: "_id",
  foreignField: "community",
});

const Community = models?.Community || model("Community", communitySchema);

export default Community;
