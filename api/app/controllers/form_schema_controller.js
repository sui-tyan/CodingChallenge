import FormSchema from "../models/formSchema.js";
import mongoose from "mongoose";

const addFormSchema = async (req, res) => {
  try {
    const formData = req.body;

    if (!Array.isArray(formData) || formData.length === 0) {
      return res.status(400).json({ message: "Invalid form schema data" });
    }

    const newFormSchema = new FormSchema({ fields: formData });
    const savedSchema = await newFormSchema.save();

    res.status(201).json({ schemaId: savedSchema._id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFormSchema = async (req, res) => {
  try {
    const formSchema = await FormSchema.findOne().sort({ createdAt: -1 });

    if (!formSchema) {
      return res.status(404).json({ message: "No form schema found" });
    }

    res.status(200).json(formSchema);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFormSchema = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid form schema ID" });
    }

    const result = await FormSchema.findByIdAndDelete(id);

    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Form schema not found" });
    }

    res
      .status(200)
      .json({ message: `Form schema with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addFormSchema, getFormSchema, deleteFormSchema };
