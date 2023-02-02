import express, { Request, Response, Router } from "express";
import { IUser } from "../../interface/user";
import User from "../../schema/user";

export const userRouter: Router = express.Router();

//Check if user exsits or not in DB.
userRouter.get("/user/:phonenumber", async (req: Request, res: Response) => {
  const phoneNumber: string = req.params.phonenumber;
  try {
    const user = await User.findOne({ phoneNumber });
    res.status(200).send(!!user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create User in our db.

userRouter.get("/user", async (req: Request, res: Response) => {
  const reqUser: IUser = req.body;
  try {
    const user = await new User(reqUser).save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
