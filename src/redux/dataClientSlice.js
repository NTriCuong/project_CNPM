import { createSlice } from "@reduxjs/toolkit";

export const dataClient = createSlice({
    name:'data client',
    initialState:{
        email:'',
    },
    reducers:{
        setDataClient:(state,actions)=>{
            state.email=actions.payload
        },
        
    }
})
export const {setDataClient} = dataClient.actions
export default dataClient.reducer;
