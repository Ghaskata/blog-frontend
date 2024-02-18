import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    addChannel: (state, action) => {
      console.log("addChannel >>> ", action);
    },
  },
  extraReducers: (bilder) => {},
});

export const { addChannel } = userSlice.actions;
export default userSlice.reducer;
