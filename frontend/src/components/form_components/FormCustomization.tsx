import { useState } from "react";
import { Button } from "../ui/button";
import FormAddField from "@/components/form_components/FormAddField";
import type { FormSchema } from "@/types/formSchema";
import { useDispatch } from "react-redux";
import { addForm, addSchemaId } from "@/slice/formSlice";
import { useApi } from "@/hooks/useApi";
import { toast } from "sonner";

export default function FormCustomization() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<FormSchema[]>([]);

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { id: Date.now(), type: "", label: "", required: false },
    ]);
  };

  const handleFieldChange = (id: number, updatedField: FormSchema) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? updatedField : field))
    );
  };

  const handleRemoveField = (id: number) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleSubmit = () => {
    dispatch(addForm(formFields));
    useApi
      .post("/forms/submit-schema", formFields)
      .then((response) => {
        dispatch(addSchemaId(response.data.schemaId));
        toast.success("Form schema submitted successfully!");
      })
      .catch((error) => {
        console.log("Error submitting form schema:", error);
        toast.error("Failed to submit form schema. Please try again.");
      });
  };

  return (
    <>
      {formFields.map((field) => (
        <FormAddField
          key={field.id}
          fieldData={field}
          onChange={(updatedField) => handleFieldChange(field.id, updatedField)}
          onRemove={() => handleRemoveField(field.id)}
        />
      ))}

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={handleAddField}
        >
          Add Field
        </Button>
        <Button className="cursor-pointer" onClick={handleSubmit}>
          Submit Form Schema
        </Button>
      </div>
    </>
  );
}
