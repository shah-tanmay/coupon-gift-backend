import { Document, Model } from "mongoose";

export enum BranchName {
  branchOne = "Branch 1",
  branchTwo = "Branch 2",
}

export enum ProgrammeName {
  programmeOne = "Programme 1",
  programmeTwo = "Programme 2",
}

export interface Token {
  token: string;
}

export interface IUser extends Document {
  parentsName?: string;
  parentsEmail: string;
  password: string;
  phoneNumber: string;
  branchName?: BranchName;
  programmeName?: ProgrammeName;
  childsName?: string;
  tokens?: Token[];
  phoneNumberVerified: boolean;
  generateAuthToken(): Promise<IUser>;
}

export interface UserModel extends Model<IUser, {}> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}
