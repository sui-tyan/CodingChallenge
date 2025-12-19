import FormSchema from "../models/formSchema.js";

const addFormSchema = async (req, res) => {
  try {
    const formData = req.body;

    const newFormSchema = new FormSchema({ fields: formData });
    await newFormSchema.save();

    res.status(201).json({ schemaId: newFormSchema._id });
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

    await FormSchema.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: `Form schema with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addFormSchema, getFormSchema, deleteFormSchema };
