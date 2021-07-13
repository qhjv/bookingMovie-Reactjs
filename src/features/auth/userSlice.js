import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";


export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        const data = await userApi.addUser(payload)
        console.log(data)
        return data
    }
  )
const userSlice = createSlice({
    name:'userApi',
    initialState:{
        current:{},
    },
    reducers:{},
    extraReducers:{
        [register.fulfilled]:(state,action)=>{
            state.current = action.payload
        }
    }
})
const {reducer} = userSlice
export default reducer;