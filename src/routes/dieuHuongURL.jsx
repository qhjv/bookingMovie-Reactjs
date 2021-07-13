import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
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