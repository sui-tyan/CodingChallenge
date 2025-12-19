export type FormSchema = {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

export type FormState = {
  formSchema: FormSchema[];
  schemaId: string;
};
