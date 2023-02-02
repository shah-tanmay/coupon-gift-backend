import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL: string = process.env.DB_URL as string;

const connectDB: () => Promise<void> = async () => {
  connect(DB_URL, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Db connected");
    }
  });
};

export default connectDB;
