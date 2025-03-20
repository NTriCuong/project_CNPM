import { configureStore } from '@reduxjs/toolkit';
import formAuth from './Slice';

const store = configureStore({
  reducer: {
    // nơi thêm các reducer vào store
    //folder features là nơi chứa các reducer mỗi reducer là 1 state
    // counter: counterReducer, // Thêm reducer vào store
    auth: formAuth,
  },
});

export const SelecAuth = (state)=>state.auth.formStatus;
export default store;
