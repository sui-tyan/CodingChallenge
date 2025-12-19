import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormSchema } from "@/types/formSchema";
import SelectForm from "./SelectForm";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface FormAddFieldProps {
  fieldData: FormSchema;
  onChange: (updatedField: FormSchema) => void;
  onRemove: () => void;
}

export default function FormAddField({
  fieldData,
  onChange,
  onRemove,
}: FormAddFieldProps) {
  const handleInputChange = (field: keyof FormSchema, value: any) => {
    onChange({ ...fieldData, [field]: value });
  };

  return (
    <>
      <div className="border p-2.5 max-w-3/4 rounded-lg mb-4 mx-auto">
        <div className="flex flex-col">
          <Badge
            variant={"destructive"}
            className="mb-2 cursor-pointer self-end"
            onClick={onRemove}
          >
            <X />
          </Badge>
          <Input
            type="text"
            name="label"
            placeholder="Form Name"
            className="mb-2.5 w-full"
            onChange={(e) => handleInputChange("label", e.target.value)}
          />
          <Input
            type="text"
            name="placeholder"
            placeholder="Placeholder Text"
            className="mb-2.5 w-full"
            onChange={(e) => handleInputChange("placeholder", e.target.value)}
          />
          <SelectForm
            handleInputChange={handleInputChange}
            items={["text", "number", "radio", "file"]}
          />
          <div className="flex items-center gap-3 m-2">
            <Checkbox
              id="required"
              checked={fieldData.required}
              onCheckedChange={(checked) =>
                handleInputChange("required", checked)
              }
            />
            <Label htmlFor="required">Required</Label>
          </div>
          {fieldData.type === "radio" && (
            <div className="mt-2.5">
              <Label htmlFor="options">Options (comma separated)</Label>
              <Input
                type="text"
                name="options"
                placeholder="Option1, Option2, Option3"
                className="mt-1.5 w-full"
                onChange={(e) =>
                  handleInputChange(
                    "options",
                    e.target.value.split(", ").map((opt) => opt.trim())
                  )
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
