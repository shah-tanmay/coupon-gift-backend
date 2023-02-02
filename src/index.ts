import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db/mongoose";
import { userRouter } from "./routers/user";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
