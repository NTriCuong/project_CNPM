import { createSlice } from "@reduxjs/toolkit";

export const stOtp = createSlice({
    name:'status confirm OTP',
    initialState:{
        flag: true //true la vao trang chu, false la mo form nhap lai mat khau
    },
    reducers:{
        setStOtp:(state,actions)=>{
            state.flag=actions.payload
        },
    }
})
export const {setStOtp} = stOtp.actions
export default stOtp.reducer;
