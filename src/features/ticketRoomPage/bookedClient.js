import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookedApi from "../../api/bookedApi";


export const ticketBooked = createAsyncThunk(
    'booked/ticketBooked',
    async (payload) => {
        const data = await bookedApi.addBooked(payload)
        return data.bookedTicket
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
        }
    }
})
const {reducer} = bookedSlice
export default reducer;