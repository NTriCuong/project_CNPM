import { createSlice } from "@reduxjs/toolkit";
import { id } from "date-fns/locale";

export const dataClientDisplay = createSlice({
    name:'data client display',
    initialState:{
        id:0,
        email:'',
        name:'',
    },
    reducers:{
        setDataClientDisplay:(state,actions)=>{
            state.email=actions.payload
        },
        
    }
})
export const {setDataClientDisplay} = dataClientDisplay.actions
export default dataClientDisplay.reducer;
