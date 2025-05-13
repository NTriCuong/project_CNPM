// redux/flightSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isSearch = createSlice({
  name: "is search",
  initialState: {
    data: false,
  },
  reducers: {
    setIsSearch: (state, action) => {
      state.data = action.payload
    },
  }
});

export const { setIsSearch} = isSearch.actions;
export default isSearch.reducer;
