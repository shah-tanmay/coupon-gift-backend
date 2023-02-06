import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import User from "../../models/user";

interface JwtPayLoad {
  _id: Schema.Types.ObjectId;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) throw new Error("No appropriate header");
    const decoded = jwt.verify(token, "secret") as JwtPayLoad;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

export default auth;
