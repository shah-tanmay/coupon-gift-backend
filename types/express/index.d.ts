import { IUser } from "../../src/interface/user";

declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      token: string;
    }
    interface Request {
      user: IUser;
    }
  }
}
