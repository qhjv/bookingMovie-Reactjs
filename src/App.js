import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import './assets/css/reponsive.css';
import Page404 from './components/404page/404Page';
import HomePage from './components/homePage/homePage';
import Loading from './components/loading/loading';
import ScrollTop from './components/scrollTop/scrollTop';
import LogIn from './features/auth/login/login';
import LogOut from './features/auth/logout/logout';
import BookingMoviePage from './features/bookingMoviePage/bookingMoviePage';
import DetailMoviePage from './features/detailMoviePage/detailMoviePage';
import HistoryBookTicket from './features/historyBookTicket/historyBookTicket';
import TicketRoomPage from './features/ticketRoomPage/ticketRoomPage';
import "./scroll";
function App() {
  const [user, setUser] = useState('');
  const userStore = useSelector(state=>state.user)
  const [loading,setLoading]=useState(false)


  const userState=()=>{
    const data= localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data):null
    setUser(us)
  }
  useEffect(() => {
    
    userState()
  }, [userStore])

  return (
    <div className="App">
      {loading ? (<Loading  onLoad={loading} />): (<></>)}
        {user !==null ? (
          <>
            <ScrollTop></ScrollTop>
            <Switch>
              <Route exact path="/">
                <BookingMoviePage setUserState={()=>setUser(null)}></BookingMoviePage>
              </Route>
              <Redirect from="/dangnhap" to="/" />
              <Redirect from="/dangky" to="/"/>
              <Route path="/thong-tin-phim/:id">
                <DetailMoviePage setUserState={()=>setUser(null)} ></DetailMoviePage>
              </Route>
              <Route path="/dat-ve/:id">
                <TicketRoomPage setUserState={()=>setUser(null)} ></TicketRoomPage>
              </Route>
              <Route path="/lich-su-dat-ve">
                <HistoryBookTicket setUserState={()=>setUser(null)} ></HistoryBookTicket>
              </Route>
              <Route path="*" component={Page404}/>
            </Switch>
          </>
        ):(
          <>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/dangnhap" component={LogIn}/>
              <Route exact path="/dangky" component={LogOut}/>
              <Route path="*" component={Page404}/>
            </Switch>
          </>
        )}
    </div>
  );
}

export default App;
