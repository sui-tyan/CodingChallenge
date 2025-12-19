import type { FormSchema } from "@/types/formSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  formSchema: FormSchema[];
  schemaId: string;
}

const initialState: FormState = {
  formSchema: [],
  schemaId: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormSchema[]>) => {
      state.formSchema.push(...action.payload);
    },
    addSchemaId: (state, action: PayloadAction<string>) => {
      state.schemaId = action.payload;
    },
    deleteFormSchema: (state) => {
      state.formSchema = [];
      state.schemaId = "";
    },
  },
});

export const { addForm, addSchemaId, deleteFormSchema } = formSlice.actions;

export default formSlice.reducer;
