import { configureStore } from "@reduxjs/toolkit";
import userLoginReducter from '../features/auth/login/loginSlice'
import emailHomeReducter from '../components/homePage/homePageSlice' 
import movieListReducter from '../features/bookingMoviePage/components/listMovie/listMovieSlice' 
import ticketRoomReducter from '../features/ticketRoomPage/ticketRoomSlice'

const rootReducer ={
    user:userLoginReducter,
    emailfromhome:emailHomeReducter,
    movielist:movieListReducter,
    ticketroom:ticketRoomReducter
}
const store = configureStore({
    reducer:rootReducer,
})
export default store