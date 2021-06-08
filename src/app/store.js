import { configureStore } from "@reduxjs/toolkit";
import userLoginReducter from '../features/auth/login/loginSlice'
import emailHomeReducter from '../components/homePage/homePageSlice' 
import movieListNowReducter from '../features/bookingMoviePage/components/listMovie/movieNowSlice' 
import movieListSoonReducter from '../features/bookingMoviePage/components/listMovie/movieSoonSlice' 

const rootReducer ={
    user:userLoginReducter,
    emailfromhome:emailHomeReducter,
    movielistNow:movieListNowReducter,
    movielistSoon:movieListSoonReducter,
}
const store = configureStore({
    reducer:rootReducer,
})
export default store