import { createSlice } from "@reduxjs/toolkit";

const movieListSoon = createSlice({
    name:'listMovieSoon',
    initialState:[],
    reducers:{
        
        getMovieSoon:(state,action)=>{
            state=action.payload
            return state
        },
    }
})
const {reducer,actions} = movieListSoon
export const {getMovieSoon}=actions
export default reducer;