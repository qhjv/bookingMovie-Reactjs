import { createSlice } from "@reduxjs/toolkit";

const userLogin = createSlice({
    name:'userlogin',
    initialState:{},
    reducers:{
        userStore:(state,action)=>{
            state=action.payload
            return state
    },
    }
})
const {reducer,actions} = userLogin
export const {userStore}=actions
export default reducer;