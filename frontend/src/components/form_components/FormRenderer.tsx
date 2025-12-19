import type { FormSchema } from "@/types/formSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function FormRenderer({
  formSchema,
}: {
  formSchema: FormSchema[];
}) {
  return (
    <div>
      {formSchema.map((field) => (
        <div key={field.id}>
          <Label className="m-1" htmlFor={field.label}>
            {field.label}
          </Label>
          {field.type === "radio" ? (
            <RadioGroup
              defaultValue={field.options ? field.options[0] : ""}
              className="flex flex-col"
            >
              {field.options?.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              type={field.type}
              placeholder={field.placeholder}
              name={field.label}
              id={field.label}
            />
          )}
        </div>
      ))}
    </div>
  );
}
