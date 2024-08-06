import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import loaderReducer from "../features/loaderSlice";
import allFormReducer from "../features/allFormSlice";
export default configureStore({
  reducer: {
    form: formReducer,
    loader: loaderReducer,
    allForm: allFormReducer,
  },
});
