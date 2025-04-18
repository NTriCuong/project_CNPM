import { configureStore } from '@reduxjs/toolkit';
import formAuth from './authSlice';
import  dataClient  from './dataClientSlice';
import  stOtp  from './stOtpSlice';
import  statusClient  from './statusClient';
import searchDataClice from './searchDataClice';

const store = configureStore({
  reducer: {
    // nơi thêm các reducer vào store
    //folder features là nơi chứa các reducer mỗi reducer là 1 state
    // counter: counterReducer, // Thêm reducer vào store
    auth: formAuth,
    client: dataClient,
    statusOtp:stOtp,
    statusClient:statusClient,
    searchDataClice:searchDataClice
  }
});
  
export const SelecAuth = (state)=>state.auth.formStatus;
export const selecDataClient = (state)=>state.client?.email||''
export const selecStatusOtp = (state)=>state.statusOtp.flag
export const selecStatusClient = (state)=>state.statusClient?.status || ''
export const selectSearchData = (state)=>state.searchDataClice.data;
export default store;
