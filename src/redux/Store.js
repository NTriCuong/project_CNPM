import { configureStore } from '@reduxjs/toolkit';
import formAuth from './authSlice';
import  dataClient  from './dataClientSlice';

const store = configureStore({
  reducer: {
    // nơi thêm các reducer vào store
    //folder features là nơi chứa các reducer mỗi reducer là 1 state
    // counter: counterReducer, // Thêm reducer vào store
    auth: formAuth,
    client: dataClient
  },
});

export const SelecAuth = (state)=>state.auth.formStatus;
export const selecDataClient = (state)=>state.client?.email||''
export default store;
