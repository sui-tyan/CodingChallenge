import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormSchema } from "@/types/formSchema";

export default function SelectForm({
  handleInputChange,
  items,
}: {
  handleInputChange: (field: keyof FormSchema, value: any) => void;
  items: string[];
}) {
  return (
    <>
      <Select onValueChange={(value) => handleInputChange("type", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Form Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Form Type</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item ? item[0].toUpperCase() + item.slice(1) : ""}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
