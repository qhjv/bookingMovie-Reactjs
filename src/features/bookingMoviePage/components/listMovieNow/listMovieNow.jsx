import React,{ useState ,useRef} from 'react';
import PropTypes from 'prop-types';
import "./listMovieNow.css"
import logo2 from '../../../../assets/images/logo2.png'
import movie from '../../../../assets/images/movie4.jpg'
import { useSelector } from 'react-redux';
import $ from "jquery";
ListMovieNow.propTypes = {
    
};

function ListMovieNow(props) {
    const [clickBonus,setClickBonus]=useState(false)
    const listMovieNow = useSelector(state=>state.movielistNow)
    const [search, setSearch] = useState('');
    const typingTimeOutRef =  useRef(null)
    const array = []

    if(clickBonus == false && search =="" ){
            listMovieNow.slice(0,15).filter((movie)=>{
                if(document.querySelector(".pageViewer--bonus") !== null && document.querySelector(".pageViewer--button__all i") !==null){
                    document.querySelector(".pageViewer--bonus").textContent="Xem thêm"
                    document.querySelector(".pageViewer--button__all i").classList.remove("bonusI")
                    document.querySelector(".pageViewer--bonus").classList.remove("hidden")
                    document.querySelector(".pageViewer--button__all i").classList.remove("hidden")
                }

                return array.push(movie)
            })
    }else if(clickBonus ==true && search ==""  ){
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
    console.log(array)

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
    return (
        <div className="pageViewer">
        <div className="container d-flex justify-content-between flex-column align-items-center">
          <div className="pageViewer--content d-flex justify-content-between flex-column align-items-center">
            <div className="pageViewer--content_-logo"><img src={logo2} /></div>
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
              {(array ? array :[]).filter((movie)=>{
                  return movie.tenPhim.toLowerCase().includes(search.toLowerCase())

              }).map((movie)=>(

                <div key={movie.maPhim} className="pageViewer--movies col-md-3 col-lg-3">
                    <div className="pageViewer--movie--full">
                        <div className="pageViewer--listMovie__img">
                        <img src={movie.hinhAnh} />
                        </div>
                        <div className="pageViewer--movieContent--full">
                        <div className="pageViewer--listMovie__name">{movie.tenPhim} </div>
                        <div className="pageViewer--listMovie__rate ">{movie.danhGia}/10 rating</div>
                        <div className="pageViewer--listMovie__button listMovie--booking-button d-flex justify-content-center align-items-center">Book Now</div>
                        </div>
                    </div>
                </div>
              ))}
            
          </div>
          <div className="pageViewer--button">
            <div className="pageViewer--button__all"
                onClick={handleViewAll}
            >
                <div className="pageViewer--bonus">
                Xem Thêm

                </div>
                <i className="fas fa-long-arrow-alt-right" />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ListMovieNow;