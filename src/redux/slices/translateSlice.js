import { createSlice } from "@reduxjs/toolkit";
import { translatetext } from "../actions/translateActions";

const initialState = {
  isloading: false,
  iserror: false,
  answer: '',
};
const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(translatetext.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(translatetext.rejected, (state) => {
      state.isloading = false;
      state.iserror = true;
    });
    builder.addCase(translatetext.fulfilled, (state, action) => {
      state.isloading = false;
      state.iserror = false;
      state.answer = action.payload;
    });
  },
});

export default translateSlice.reducer;