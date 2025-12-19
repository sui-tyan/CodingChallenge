import { useState } from "react";
import { Button } from "../ui/button";
import FormAddField from "@/components/form_components/FormAddField";
import type { FormSchema } from "@/types/formSchema";
import { useDispatch } from "react-redux";
import { addForm, addSchemaId } from "@/slice/formSlice";
import { useApi } from "@/hooks/useApi";

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

  const handleSubmit = () => {
    dispatch(addForm(formFields));
    useApi
      .post("/forms/submit-schema", formFields)
      .then((response) => {
        dispatch(addForm(formFields));
        dispatch(addSchemaId(response.data));
      })
      .catch((error) => {
        console.log("Error submitting form schema:", error);
      });
  };

  return (
    <>
      {formFields.map((field) => (
        <FormAddField
          key={field.id}
          fieldData={field}
          onChange={(updatedField) => handleFieldChange(field.id, updatedField)}
        />
      ))}

      <Button className="mt-4 w-full" onClick={handleAddField}>
        Add Form Field
      </Button>
      <Button className="mt-4 w-full" color="primary" onClick={handleSubmit}>
        Submit Form Schema
      </Button>
    </>
  );
}
