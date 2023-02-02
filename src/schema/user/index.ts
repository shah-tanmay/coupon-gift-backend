import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUser } from "../../interface/user";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate(value: string) {
      if (!value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
        throw new Error("Enter Valid Phone Number");
      }
    },
  },
  address: {
    type: String,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    enum: ["Branch 1", "Branch 2"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
