import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CallbackWithoutResultAndOptionalError, model, Schema } from "mongoose";
import {
  BranchName,
  IUser,
  ProgrammeName,
  UserModel,
} from "../../interface/user";

const userSchema = new Schema<IUser, UserModel>({
  parentsName: {
    type: String,
    trim: true,
  },
  parentsEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  branchName: {
    type: String,
    enum: BranchName,
  },
  programmeName: {
    type: String,
    enum: ProgrammeName,
  },
  childsName: {
    type: String,
    trim: true,
  },
  phoneNumberVerified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function (this: IUser) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  user.tokens = user.tokens!.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function (this: IUser) {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Your account does not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

userSchema.pre(
  "save",
  async function (this: IUser, next: CallbackWithoutResultAndOptionalError) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  }
);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
