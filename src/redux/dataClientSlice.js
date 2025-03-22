import { createSlice } from "@reduxjs/toolkit";

export const dataClient = createSlice({
    name:'data client',
    initialState:{
        email:''
    },
    reducers:{
        setDataClient:(state,actions)=>{
            state.email=actions.payload
        },
        resetDataClient:(state)=>{
            state.email=''
        }
    }
})
export const {setDataClient, resetDataClient} = dataClient.actions
export default dataClient.reducer;
