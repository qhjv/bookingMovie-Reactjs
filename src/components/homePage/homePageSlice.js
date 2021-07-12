import { createSlice } from "@reduxjs/toolkit";

const emailHome = createSlice({
    name:'emailhome',
    initialState:"",
    reducers:{
        emailGet:(state,action)=>{
            state=action.payload
            return state
    },
    }
})
const {reducer,actions} = emailHome
export const {emailGet}=actions
export default reducer;