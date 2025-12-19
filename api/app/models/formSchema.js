import mongoose from "mongoose";

const formFieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
    options: { type: [String] },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    fields: { type: [formFieldSchema], required: true },
  },
  { timestamps: true }
);

const FormSchema = mongoose.model("FormSchema", formSchema);

export default FormSchema;
