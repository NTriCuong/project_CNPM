// redux/flightSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: {
    data: [],
  },
  reducers: {
    setFlightData: (state, action) => {
      console.log("flightData :", action.payload);
      state.data = action.payload
      console.log("state :", state.data);

      }}
});

export const { setFlightData } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
