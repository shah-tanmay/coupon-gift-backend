import { Request, Response, Router } from "express";
import { IUser } from "../../interface/user";
import auth from "../../middleware/auth";
import { createUser, findUserByCredentials } from "../../services/users";

const userRouter: Router = Router();

//Sign up and create new User.
userRouter.post("/signup", async (req: Request, res: Response) => {
  const user: IUser = await createUser(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/me", auth, async (req: Request, res: Response) => {
  return res.status(200).send(req.user);
});

//update profile of a user.
userRouter.patch(
  "/complete-profile",
  auth,
  async (req: Request, res: Response) => {
    const _id = req.user._id;
    const updates: Array<keyof IUser> = Object.keys(req.body) as Array<
      keyof IUser
    >;
    try {
      updates.forEach((update) => (req.user.update = req.body[update]));
      await req.user.save();
      console.log(req.user);
      res.status(200).send({ user: req.user });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//user login
userRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

//user logout
userRouter.post("/logout", auth, async (req: Request, res: Response) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "Logout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default userRouter;
