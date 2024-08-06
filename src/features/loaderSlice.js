import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    loaderState: (state, action) => {
      state.value = action.payload;
    },
  },
});

//export actions
export const { loaderState } = loaderSlice.actions;

//export reducer
export default loaderSlice.reducer;
