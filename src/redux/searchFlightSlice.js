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
    },
    appendFlightData : (state, action) => {
      state.data.push(action.payload)
    }
  }
});

export const { setFlightData,appendFlightData } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
