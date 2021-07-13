/* eslint-disable array-callback-return */
import $ from "jquery";
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo2 from '../../../../assets/images/logo2.png';
import { NGAY_HOM_NAY, NGAY_KET_THUC } from '../../../../constants/constants';
import "./listMovieNow.css";



ListMovieNow.propTypes = {
    
};

function ListMovieNow(props) {
    const [clickBonus,setClickBonus]=useState(false)
    const listMovieNow = useSelector(state=>state.movielist)
    const [search, setSearch] = useState('');
    const typingTimeOutRef =  useRef(null)
    const array = []



    if(clickBonus === false && search === "" ){
            listMovieNow.slice(0,29).filter((movie)=>{
                if(document.querySelector(".pageViewer--bonus") !== null && document.querySelector(".pageViewer--button__all i") !==null){
                    document.querySelector(".pageViewer--bonus").textContent="Xem thêm"
                    document.querySelector(".pageViewer--button__all i").classList.remove("bonusI")
                    document.querySelector(".pageViewer--bonus").classList.remove("hidden")
                    document.querySelector(".pageViewer--button__all i").classList.remove("hidden")
                }
                return  array.push(movie)

            })
    }else if(clickBonus === true && search === ""  ){
            listMovieNow.filter((movie)=>{
                if(document.querySelector(".pageViewer--bonus") !== null && document.querySelector(".pageViewer--button__all i") !==null){
                    document.querySelector(".pageViewer--bonus").textContent="Ẩn bớt"
                    document.querySelector(".pageViewer--button__all i").classList.add("bonusI")
                    document.querySelector(".pageViewer--bonus").classList.remove("hidden")
                    document.querySelector(".pageViewer--button__all i").classList.remove("hidden")
                }
                return array.push(movie)
            })
    }
    else if( search !=="" ){
        listMovieNow.filter((movie)=>{
            if(document.querySelector(".pageViewer--bonus") !== null && document.querySelector(".pageViewer--button__all i") !==null){
                document.querySelector(".pageViewer--bonus").classList.add("hidden")
                document.querySelector(".pageViewer--button__all i").classList.add("hidden")
            }
            return array.push(movie)
        })
}

    const handleViewAll = () =>{
        setClickBonus(!clickBonus)
    }
    const handleChangeSearch=(event)=>{
        if(typingTimeOutRef.current){
          clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current=setTimeout(()=>{
            const nameSearch =event.target.value
            setSearch(nameSearch)
        },500)
    }
    const handleClickBook = () => {
        $(window).scrollTop(0);
    }
    // const chuyendoiURL = (str) =>
    //     {
    //         // Chuyển hết sang chữ thường
    //         str = str.toLowerCase();     
        
    //         // xóa dấu
    //         str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    //         str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    //         str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    //         str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    //         str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    //         str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    //         str = str.replace(/(đ)/g, 'd');
        
    //         // Xóa ký tự đặc biệt
    //         str = str.replace(/([^0-9a-z-\s])/g, '');
        
    //         // Xóa khoảng trắng thay bằng ký tự -
    //         str = str.replace(/(\s+)/g, '-');
        
    //         // xóa phần dự - ở đầu
    //         str = str.replace(/^-+/g, '');
        
    //         // xóa phần dư - ở cuối
    //         str = str.replace(/-+$/g, '');
        
    //         // return
    //         return str;
    //     }
    return (
        <div className="pageViewer">
        <div className="container d-flex justify-content-between flex-column align-items-center">
          <div className="pageViewer--content d-flex justify-content-between flex-column align-items-center">
            <div className="pageViewer--content_-logo"><img src={logo2} alt="" /></div>
            <div className="pageViewer--content__heading">PHIM ĐANG CHIẾU</div>
            <div className="pageViewer--content__name" />
            <div className="pageViewer--search">
                <input className="pageViewer--search__input" 
                    type="text" placeholder="Search"
                    onChange={handleChangeSearch}
                />
            </div>
          </div>
          <div className="row pageViewer--listMovieNow">
              {(array ? array :[]).filter((movie) => {
                    if( NGAY_HOM_NAY <= Date.parse(movie.ngayKhoiChieu)
                        &&Date.parse(movie.ngayKhoiChieu) <= NGAY_KET_THUC
                        &&search === ""
                    ){
                        return movie
                    }
                    else if(search!==""){
                        return movie.tenPhim.toLowerCase().includes(search.toLowerCase()) 
                        && NGAY_HOM_NAY <= Date.parse(movie.ngayKhoiChieu)
                        && Date.parse(movie.ngayKhoiChieu) <= NGAY_KET_THUC
                    }
              }).map((movie)=>{
                  if(movie){
                      return(
                        <div key={movie.maPhim} className="pageViewer--movies col-md-3 col-lg-3">
                            <div className="pageViewer--movie--full">
                                <div className="pageViewer--listMovie__img">
                                <img src={movie.hinhAnh} alt="" />
                                </div>
                                <div className="pageViewer--movieContent--full">
                                <div className="pageViewer--listMovie__name">{movie.tenPhim} </div>
                                <div className="pageViewer--listMovie__rate ">{movie.danhGia}/10 rating</div>
                                <Link onClick={handleClickBook}
                                    to={`/thong-tin-phim/${movie?.maPhim}`}
                                    className="pageViewer--listMovie__button listMovie--booking-button d-flex justify-content-center align-items-center"
                                >
                                        Book Now
                                </Link>
                                </div>
                            </div>
                        </div>
                      )
                }else if(!movie){
                      return(
                        <div className="pageViewer--movies col-md-3 col-lg-3">
                            hihi
                        </div>
                      )
                  }
              })}
            
          </div>
            <div className="pageViewer--button">
                    <div className="pageViewer--button__all"
                        onClick={handleViewAll}
                    >
                        <div className="pageViewer--bonus">
                            Xem Thêm
                        </div>
                        <i className="fas fa-long-arrow-alt-right"/>
                    </div>
            </div>
        </div>
      </div>
    );
}

export default ListMovieNow;