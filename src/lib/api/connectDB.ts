import { connect } from "mongoose";

const mongoURI = process.env.MONGO_URI;
let isConnected = false;

const connectDB = async () => {
  if (!mongoURI) {
    console.log("Provide mongo URI");
    return;
  }

  if (isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    await connect(mongoURI);
    console.log("Connected to database...");
    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
