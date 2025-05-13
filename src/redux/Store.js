import { configureStore } from '@reduxjs/toolkit';
import  dataClient  from './dataClientSlice';
import  stOtp  from './stOtpSlice';
import  statusClient  from './statusClient';
import searchDataClice from './searchDataClice';
import flightSearchSlice from './searchFlightSlice';
import dataDisplay from './dataDisplay';
import { dataClientDisplay } from './dataClientDisplay';

const store = configureStore({
  reducer: {
    // nơi thêm các reducer vào store
    //folder features là nơi chứa các reducer mỗi reducer là 1 state
    // counter: counterReducer, // Thêm reducer vào store
    client: dataClient,
    statusOtp:stOtp,
    statusClient:statusClient,
    searchDataClice:searchDataClice,
    searchFlight: flightSearchSlice,
    dataClientDisplay:dataClientDisplay,
    dataDisplay: dataDisplay 
  }
});

export const selecDataClient = (state)=>state.client?.email||''
export const selecStatusOtp = (state)=>state.statusOtp.flag
export const selecStatusClient = (state)=>state.statusClient?.status || ''
export const selectSearchData = (state)=>state.searchDataClice.data;
export const selectSearchFlight = (state)=>state.searchFlight.data || [];
export const selectDataClientDisplay = (state) => state.dataClientDisplay;
export const selectDataDisplay = (state) => state.dataDisplay.data;
export default store;
