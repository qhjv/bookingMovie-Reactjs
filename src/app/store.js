import { configureStore } from "@reduxjs/toolkit";
import userLoginReducter from '../features/auth/login/loginSlice'
import userApiReducter from '../features/auth/userSlice'
import emailHomeReducter from '../components/homePage/homePageSlice' 
import movieListReducter from '../features/bookingMoviePage/components/listMovie/listMovieSlice' 
import bookedReducter from "../features/ticketRoomPage/bookedClient"
import ticketRoomReducter from '../features/ticketRoomPage/ticketRoomSlice'

const rootReducer ={
    user:userLoginReducter,
    userAddApi:userApiReducter,
    bookedTicket:bookedReducter,
    emailfromhome:emailHomeReducter,
    movielist:movieListReducter,
    ticketroom:ticketRoomReducter
}
const store = configureStore({
    reducer:rootReducer,
})
export default store