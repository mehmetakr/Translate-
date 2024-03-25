import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isloading: false,
  iserror: false,
};

 const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
