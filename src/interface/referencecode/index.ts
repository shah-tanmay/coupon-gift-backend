import { Schema } from "mongoose";

export interface IReferenceCode {
  code: string;
  userId: Schema.Types.ObjectId;
  used: boolean;
}
