// redux/flightSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataDisplay = createSlice({
  name: "dataDisplay",
  initialState: {
    data: [],
  },
  reducers: {
    setDataDisplay: (state, action) => {
      state.data = action.payload
    },
  }
});

export const { setDataDisplay} = dataDisplay.actions;
export default dataDisplay.reducer;
