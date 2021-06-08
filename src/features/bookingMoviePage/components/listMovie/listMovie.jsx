import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import "./listMovie.css"
import movieImg1 from "../../../../assets/images/movie4.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moviesApi from '../../../../api/moviesApi';
import TrailerMoviesView from './components/trailerMoviesView/trailerMoviesView';
import { useDispatch } from 'react-redux';
import { getMovieNow } from './movieNowSlice';
import { getMovieSoon } from './movieSoonSlice';


ListMovie.propTypes = {
    
};

function ListMovie(props) {
    const [moviesNow, setMoviesNow] = useState([])
    const [moviesSoon, setMoviesSoon] = useState([])
    const dispatch = useDispatch()
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
      
    useEffect(() => {
        const fetchMovies = async () => {
            const moviesListNow = await moviesApi.getmoviesNowShow()
            const moviesListSoon = await moviesApi.getmoviesComeSoon()
            setMoviesNow(moviesListNow)
            setMoviesSoon(moviesListSoon)
            const action1 = getMovieNow(moviesListNow)
            dispatch(action1)
            const action2 = getMovieSoon(moviesListSoon)
            dispatch(action2)
        }
        fetchMovies()
    }, [])
    
    return (
        <div className="renderMovies">
            <div className="renderMovies--nowShow">
                <div className="renderMovies--nowShow__title">
                    PHIM ĐANG CHIẾU
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-around align-items-center">
                    <Slider {...settings}>
                        {moviesNow.slice(0,10).map((movie)=>(

                            <div key={movie.maPhim} className="d-flex align-items-center justify-content-around">
                                <div className="listMovie col-md-2 col-lg-2">
                                    <div className="listMovie--rate d-flex align-items-center justify-content-center">
                                        {movie.danhGia}/10 <i className="fas fa-star" />
                                    </div>
                                    <div className="listMovie--img d-flex align-items-center justify-content-center">
                                        <img className="listMovie--img" src={movie.hinhAnh} />
                                    </div>
                                    <div className="listMovie--action">
                                        <div className="listmovie--name ">
                                            <h4>Tên phim:</h4>
                                            {movie.tenPhim}
                                        </div>
                                        <div className="listMovie--button">
                                            <div className="listMovie--trailer">
                                                <TrailerMoviesView trailer={movie.trailer}></TrailerMoviesView>
                                            </div>
                                            <div className="listMovie--booking">
                                                <div className="listMovie--booking-button d-flex justify-content-center align-items-center">
                                                    Book Now
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                        
                    </Slider>
                        

                    </div>
                </div>
            </div>
            <div className="renderzmovie--comeSoon"/><div>
            <div className="renderMovies--nowShow__title">
                    PHIM SẮP CHIẾU
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-around align-items-center">
                        <Slider {...settings}>
                            {moviesSoon.slice(15,25).map((movie)=>(

                                <div key={movie.maPhim} className="d-flex align-items-center justify-content-around">
                                    <div className="listMovie col-md-2 col-lg-2">
                                        <div className="listMovie--rate d-flex align-items-center justify-content-center">
                                            {movie.danhGia}/10 <i className="fas fa-star" />
                                        </div>
                                        <div className="listMovie--img d-flex align-items-center justify-content-center">
                                            <img className="listMovie--img" src={movie.hinhAnh} />
                                        </div>
                                        <div className="listMovie--action">
                                            <div className="listmovie--name ">
                                                <h4>Tên phim:</h4>
                                                {movie.tenPhim}
                                            </div>
                                            <div className="listMovie--button">
                                                <div className="listMovie--trailer">
                                                    <TrailerMoviesView trailer={movie.trailer}></TrailerMoviesView>
                                                </div>
                                                <div className="listMovie--booking">
                                                    <div className="listMovie--booking-button d-flex justify-content-center align-items-center">
                                                        Book Now
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </Slider>
                    </div>
                </div>
            </div>
            </div>
        
    );
}

export default ListMovie;