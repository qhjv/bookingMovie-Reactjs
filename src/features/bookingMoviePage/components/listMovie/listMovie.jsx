/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import $ from "jquery";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import moviesApi from '../../../../api/moviesApi';
import Loading from '../../../../components/loading/loading';
import { NGAY_HOM_NAY, NGAY_KET_THUC } from '../../../../constants/constants';
import TrailerMoviesView from './components/trailerMoviesView/trailerMoviesView';
import "./listMovie.css";
import { getMovie } from './listMovieSlice';

ListMovie.propTypes = {
    
};

function ListMovie(props) {
    const [movies, setMovies] = useState([])
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    
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
        (async () => {
            
            try {
                setLoading(true)
                const moviesList = await moviesApi.getmoviesShow()
                setMovies(moviesList)
                const action = getMovie(moviesList)
                dispatch(action)
                setLoading(false)
            } catch (error) {
                console.log("failed:",error)
            }
        })();
    }, [])
    const handleClickBook = () => {
        $(window).scrollTop(0);
    }
    
    return (
        <div className="renderMovies">
            {loading ? (<Loading onLoad={loading} />): (<></>)}
            <div className="renderMovies--nowShow">
                <div className="renderMovies--nowShow__title">
                    PHIM ĐANG CHIẾU
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-around align-items-center">
                    <Slider {...settings}>
                        {movies.filter((movie)=>{
                            if( NGAY_HOM_NAY <= Date.parse(movie.ngayKhoiChieu)
                            &&Date.parse(movie.ngayKhoiChieu) <= NGAY_KET_THUC
                            ){
                                return movie
                            }
                        }).slice(0,10).map((movie)=>(

                            <div key={movie.maPhim} className="d-flex align-items-center justify-content-around">
                                <div className="listMovie col-md-2 col-lg-2">
                                    <div className="listMovie--rate d-flex align-items-center justify-content-center">
                                        {movie.danhGia}/10 <i className="fas fa-star" />
                                    </div>
                                    <div className="listMovie--img d-flex align-items-center justify-content-center">
                                        <img className="listMovie--img" src={movie.hinhAnh} alt="" />
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
                                                <Link 
                                                    onClick={handleClickBook}
                                                    to={`/thong-tin-phim/${movie?.maPhim}`}
                                                    className="listMovie--booking-button d-flex justify-content-center align-items-center">
                                                    Book Now
                                                </Link>
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
                            {movies.filter((movie)=>{
                                if(  NGAY_KET_THUC < Date.parse(movie.ngayKhoiChieu) ){
                                    return movie
                                }
                            }).slice(0,7).map((movie)=>(

                                <div key={movie.maPhim} className="d-flex align-items-center justify-content-around">
                                    <div className="listMovie col-md-2 col-lg-2">
                                        <div className="listMovie--rate d-flex align-items-center justify-content-center">
                                            {movie.danhGia}/10 <i className="fas fa-star" />
                                        </div>
                                        <div className="listMovie--img d-flex align-items-center justify-content-center">
                                            <img className="listMovie--img" src={movie.hinhAnh} alt="" />
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
                                                    <Link 
                                                        onClick={handleClickBook}
                                                        to={`/thong-tin-phim/${movie?.maPhim}`}
                                                        className="listMovie--booking-button d-flex justify-content-center align-items-center">
                                                        Book Now
                                                    </Link>
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