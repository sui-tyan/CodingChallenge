import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slice/formSlice";
import pageReducer from "../slice/pageSlice";

export default configureStore({
  reducer: {
    form: formReducer,
    page: pageReducer,
  },
});
