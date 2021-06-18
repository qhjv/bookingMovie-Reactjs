import React from 'react';
import PropTypes from 'prop-types';
import HomePage from '../components/homePage/homePage';
import LogOut from '../features/auth/logout/logout';
import LogIn from '../features/auth/login/login';
import { Redirect,Route, Switch } from 'react-router';
import Page404 from '../components/404page/404Page';
import BookingMoviePage from '../features/bookingMoviePage/bookingMoviePage';
import DetailMoviePage from '../features/detailMoviePage/detailMoviePage';

DieuHuongURL.propTypes = {
    
};

function DieuHuongURL(props) {
    return (
        <div className="MainBoard">
            {/* <Route exact path="/dangnhap" component={LogIn}/>
            <Route exact path="/dangky" component={LogOut}/> */}
            {/* <Route exact path="/" component={HomePage}/> */}
            {/* <Route component={Page404}/> */}
            <Switch>
              <Route exact path="/"></Route>
              <Redirect from="/dangnhap" to="/" />
              <Redirect from="/dangky" to="/"/>
              <Route path="detail" component={DetailMoviePage}></Route>
            </Switch>
        </div>
    );
}

export default DieuHuongURL;