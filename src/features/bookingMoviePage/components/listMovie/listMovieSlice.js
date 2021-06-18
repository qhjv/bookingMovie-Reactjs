import { createSlice } from "@reduxjs/toolkit";

const movieList = createSlice({
    name:'listMovieNow',
    initialState:[],
    reducers:{
        getMovie:(state,action)=>{
            state=action.payload
            return state
        },
      
    }
})
const {reducer,actions} = movieList
export const {getMovie}=actions
export default reducer;


