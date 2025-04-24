import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const searchDataClice = createSlice({
  name: "data_search",
  initialState: {
    data: {
      departureLocation: {
        city: "Hà Nội",
        codeCity: "HAN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      }, // bắt đầu
      arrivalLocation: {
        city: "TP Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
      }, //điểm đến
      departureDate: format(new Date(), "dd-MM-yyyy"), // ngày đi
      arrivalDate:format(new Date(), "dd-MM-yyyy"), //ngay ve
      ticketClasses: "Economy", //hạng vé Premium Economy, Business
      numberAdults: 1, // số khách người lớn
      numberChildren: 0, // só khách trẻ em
      numberInfants: 0, // số trẻ sơ sinh
    },
  },
  reducers: {
    updateDepartureLocation: (state, actions) => {
      state.data.departureLocation = actions.payload;
    },
    updateArrivalLocation: (state, actions) => {
      state.data.arrivalLocation = actions.payload;
    },
    updateDepartureDate: (state, actions) => {
      state.data.departureDate = actions.payload;
    },
    updateArrivalDate:(state, actions) => {
        state.data.arrivalDate = actions.payload;
      },
    updateTicketClasses: (state, actions) => {
      state.data.ticketClasses = actions.payload;
    },
    updateNumberAdults: (state, actions) => {
      state.data.numberAdults = actions.payload;
    },
    updateNumberChildren: (state, actions) => {
      state.data.numberChildren = actions.payload;
    },
    updateNumberInfants: (state, actions) => {
      state.data.numberInfants = actions.payload;
    },
  },
});
export const {
  updateDepartureLocation,
  updateArrivalLocation,
  updateDepartureDate,
  updateTicketClasses,
  updateNumberAdults,
  updateNumberChildren,
  updateNumberInfants,
  updateArrivalDate
} = searchDataClice.actions;
export default searchDataClice.reducer;
