import { createSlice } from "@reduxjs/toolkit";

const ticketRoom = createSlice({
    name:'ticketRoom',
    initialState:{
        bookingSeat:[],
        totalPrice:0,
        totalPriceSeat:0,
        totalPriceCombo:0
    },
    reducers:{
        getSeats:(state,action)=>{

            const newBookingSeat = [...state.bookingSeat];
            if (action.payload.daDat) return { ...state };
            const index = newBookingSeat.findIndex((bookedSeat) => {
                return bookedSeat.maGhe === action.payload.maGhe;
            });
            if (index !== -1) {
                newBookingSeat.splice(index, 1);
            } else {
                newBookingSeat.push(action.payload);
            }
            state.bookingSeat = newBookingSeat;
            const totalSeat = state.bookingSeat.reduce((total, cur, index) => {
                return (total += cur.giaVe);
            }, 0);
            state.totalPriceSeat = totalSeat;
            state.totalPrice = state.totalPriceCombo + state.totalPriceSeat;
        },
        clearSeats:(state,action)=>{
            state.bookingSeat=action.payload.bookingSeat;
            state.totalPrice=action.payload.totalPrice;
            state.totalPriceSeat=action.payload.totalPriceSeat;
            state.totalPriceCombo=action.payload.totalPriceCombo
            return state
        }
    }
})
const {reducer,actions} = ticketRoom
export const {getSeats,clearSeats}=actions
export default reducer;


