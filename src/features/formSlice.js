import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { name: "", fId: "", createdAt: "", que: [] };

export const formSlice = createSlice({
  name: "form",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    newForm: (state, action) => {
      state.value = action.payload;
    },
  },
});

//export actions
export const { newForm } = formSlice.actions;

//export reducer
export default formSlice.reducer;
