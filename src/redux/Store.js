import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    // nơi thêm các reducer vào store
    //folder features là nơi chứa các reducer mỗi reducer là 1 state
    // counter: counterReducer, // Thêm reducer vào store
  },
});

export default store;
