// redux/flightSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: {
    data: [],
  },
  reducers: {
    setFlightData: (state, action) => {
      state.data = action.payload

      }}
});

export const { setFlightData } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
