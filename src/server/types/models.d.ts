import { ObjectId } from "mongodb";

// User Model
interface UserModel {
  _id: ObjectId;
  name: string;
  email: string;
  username: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}
