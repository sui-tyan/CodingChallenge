import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: "create-form",
  },
  reducers: {
    changeRenderedPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changeRenderedPage } = pageSlice.actions;

export default pageSlice.reducer;
