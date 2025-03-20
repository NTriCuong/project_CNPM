import { createSlice } from "@reduxjs/toolkit";

// nơi chứa các couter slice mỗi slice là 1 state
const formAuth = createSlice({
    name:'status form auth',// trạng thái các form liên quan đến tài khoảng ngừoi dùng 
    initialState: {
        formStatus: '', // Chuyển thành object với thuộc tính formStatus
    },
    reducers:{// cac hàm xử lý state giống như set state
        onLogin:(state)=>{
            state.formStatus='auth-login';
        },
        onRegister:(state)=>{
            state.formStatus='auth-register';
        },
        onForgotPassword:(state)=>{
            state.formStatus='auth-forgotpassword';
        },
        onConfirmOTP:(state)=>{
            state.formStatus='auth-confirmotp';
        },
        onResetpassword:(state)=>{
            state.formStatus='auth-resetpassword'
        },
        reset:(state)=>{
            state.formStatus=''
        }
    }
})
// auth
export const {onLogin,onRegister,onForgotPassword,onConfirmOTP,onResetpassword,reset} = formAuth.actions;
export default formAuth.reducer;