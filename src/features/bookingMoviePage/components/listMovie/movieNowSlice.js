import { createSlice } from "@reduxjs/toolkit";

const movieListNow = createSlice({
    name:'listMovieNow',
    initialState:[],
    reducers:{
        getMovieNow:(state,action)=>{
            state=action.payload
            return state
        },
      
    }
})
const {reducer,actions} = movieListNow
export const {getMovieNow}=actions
export default reducer;


