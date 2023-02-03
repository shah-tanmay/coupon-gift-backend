import mongoose, { Schema } from "mongoose";
import { IReferenceCode } from "../../interface/referencecode";

const referenceCodeSchema = new Schema<IReferenceCode>({
  code: {
    type: String,
    required: true,
  },
});

const ReferenceCode = mongoose.model("ReferenceCode", referenceCodeSchema);

export default ReferenceCode;
