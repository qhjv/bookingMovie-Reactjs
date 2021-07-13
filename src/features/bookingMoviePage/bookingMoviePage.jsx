import $ from 'jquery';
import React from 'react';
import img1 from '../../../src/assets/images/tap2.png';
import Contact from '../../components/contact/contact';
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navBar';
import './bookingMoviePage.css';
import AppPage from './components/appPage/appPage';
import ListMovie from './components/listMovie/listMovie';
import ListMovieNow from './components/listMovieNow/listMovieNow';
import ListTheaters from './components/listTheaters/listTheaters';
import MorePage from './components/morePage/morePage';
import SlideHome from './components/slideHome/slideHome';


BookingMoviePage.propTypes = {
    
};

function BookingMoviePage(props) {
    
    $(window).on("scroll",function(){
        if($(this).scrollTop() >600){
            $(".bookTheater").addClass("hien")
        }else if($(this).scrollTop() < 600){
            $(".bookTheater").removeClass("hien")
        }
    })
    const handleClickBookTheater = () => {
        if($(".bookTheater-div") !== null && $(".bookTheater-overlay") !==null){
            $(".bookTheater-div").addClass("bookTheaterdichuyen")
            $(".bookTheater-overlay").addClass("overlaydichuyen")
        }
    }
    const handleCloseBookTheater = () => {
        if($(".bookTheater-div") !== null && $(".bookTheater-overlay") !==null){
            $(".bookTheater-div").removeClass("bookTheaterdichuyen")
            $(".bookTheater-overlay").removeClass("overlaydichuyen")
        }

    }

    return (
        <div className="fullpage">
            <div className="fullslide">
                <NavBar setUser={props.setUserState}></NavBar>
                <SlideHome></SlideHome>
            </div>
            <ListMovie></ListMovie>
            <ListMovieNow></ListMovieNow>
            <MorePage></MorePage>
            <AppPage></AppPage>
            <div className="footer">
                <Contact></Contact>
                <Footer></Footer>
            </div>
            <div className="bookTheater">
                <div className="bookTheater--navbar"
                    onClick={handleClickBookTheater}
                >
                    <div className="bookTheater--navbar__text">
                        CỤM RẠP
                    </div>
                    <div className="bookTheater--navbar__tap">
                        <img src={img1} alt="" />
                    </div>
                </div>
            </div>
            <div className="bookTheater-div">
                <div className="bookTheater-div_close"
                    onClick={handleCloseBookTheater}
                >
                    <i className="far fa-times-circle" />
                </div>
                <div className="bookTheater-div_full">

                    <ListTheaters></ListTheaters>
                </div>
            </div>
            <div class="bookTheater-overlay"
                onClick={handleCloseBookTheater}
            >
            </div>
        </div>
        
    );
}

export default BookingMoviePage;