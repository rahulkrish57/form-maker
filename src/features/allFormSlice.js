import { createSlice } from "@reduxjs/toolkit";

export const allFormSlice = createSlice({
  name: "allForm",
  initialState: {
    value: [],
  },
  reducers: {
    addToForm: (state, action) => {
      state.value = action.payload;
    },
  },
});

//export actions
export const { addToForm } = allFormSlice.actions;

//export reducer
export default allFormSlice.reducer;
