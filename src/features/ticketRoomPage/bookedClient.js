import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookedApi from "../../api/bookedApi";


export const ticketBooked = createAsyncThunk(
    'booked/ticketBooked',
    async (payload) => {
        const data = await bookedApi.addBooked(payload)
        return data
    }
  )
const bookedSlice = createSlice({
    name:'booked',
    initialState:{
        current:{},
    },
    reducers:{},
    extraReducers:{
        [ticketBooked.fulfilled]:(state,action)=>{
            state.current = action.payload
            console.log(state.current)
        }
    }
})
const {reducer} = bookedSlice
export default reducer;