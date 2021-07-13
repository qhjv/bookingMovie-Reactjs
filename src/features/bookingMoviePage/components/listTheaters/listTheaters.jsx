import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import theatersApi from '../../../../api/theatersApi';
import Loading from '../../../../components/loading/loading';
import ListMovieFromTheater from './components/listMovieFromTheater/listMovieFromTheater';
import ListTheaterName from './components/listTheaterName/listTheaterName';
import './listTheaters.css';


ListTheaters.propTypes = {
    
};

function ListTheaters(props) {
    const [loading,setLoading]=useState(false)
    const [listTheater,setListTheater] = useState([])
    const [maRap,setMaRap]= useState("")
    const [getAndress,setGetAndress] = useState('')




    useEffect(() => {
        const fetchTheaters = async () => {
            const theaterList = await theatersApi.getTheaters()
            setListTheater(theaterList)
        }
        fetchTheaters()
    }, [])
    const tabsMenu = document.querySelectorAll(".theater")
    tabsMenu.forEach((tab,index) => {
        tab.onclick= function(){
            $(".theaters .active").removeClass('active')
            this.classList.add('active')
        }
    })
    const handleClickChooseTheaters = (maHeThongRap,index) => {
        setMaRap(maHeThongRap)
        const tabsMenu = document.querySelectorAll(".theater")
        $(".theaters .active").removeClass('active')
        tabsMenu[index].classList.add('active')
    
    }
    const handleClickChooseTheater = (event) => {
        setGetAndress(event.target.value)
    }
    useEffect(() => {
        setGetAndress("")
    }, [maRap])
    return (
        <>
            <div className="bookTheater-div_title">CHỌN RẠP</div>
            <div className="container">
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
                <div className="theaters row">
                    {(listTheater?listTheater:[]).map((theater,index)=>(
                        <div key={theater.maHeThongRap} className={ index === 0  ? "theater col-md-2 active col-lg-2": "theater col-md-2 col-lg-2"}
                            onClick={()=>handleClickChooseTheaters(theater.maHeThongRap,index)}    
                        >
                            <img src={theater.logo} alt=""/>
                        </div>
                    ))}
                </div>
                <ListTheaterName maRap={maRap} getAndress={getAndress} chooseTheater={handleClickChooseTheater} ></ListTheaterName>
                <ListMovieFromTheater maRap={maRap} getAndress={getAndress}></ListMovieFromTheater>
            </div>
        </>
    );
}

export default ListTheaters;