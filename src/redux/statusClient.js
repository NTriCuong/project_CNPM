import { createSlice } from "@reduxjs/toolkit";

export const statusClient = createSlice({
    name:'data client',
    initialState:{
        status: false
    },
    reducers:{
        setStatusClient:(state,actions)=>{
            state.email=actions.payload
        },
        
    }
})
export const {setstatusClient} = statusClient.actions
export default statusClient.reducer;
