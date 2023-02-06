import { IUser } from "../../interface/user";
import User from "../../models/user";

export const createUser = async (user: IUser): Promise<IUser> => {
  return await new User(user).save();
};

export const findUserByCredentials = async (
  email: string,
  password: string
): Promise<IUser> => {
  return await User.findByCredentials(email, password);
};
