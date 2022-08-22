import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
  },
  reducers: {
    getUser(state) {
      state.isLoading = true;
    },
    setUser(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

export const { setUser, getUser } = userSlice.actions;

export default userSlice.reducer;
