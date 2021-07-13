/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import DetailBookDate from './components/detailBookDate/detailBookDate';
import DetailBookHour from './components/detailBookHour/detailBookHour';
import "./detailBookMovie.css";

DetailBookMovie.propTypes = {
    
};

function DetailBookMovie({hethongrapchieu}) {
    const [getTheater,setGetTheater] = useState("")
    const [cumRap,setCumRap] = useState([])
    const [lichChieu,setLichChieu] = useState([])
    const [lichChon,setLichChon] = useState("")
    const [indexNgay,setIndexNgay] = useState([])

    const handleChooseTheater = (event) => {
        setGetTheater(event.target.value)
    }
    useEffect(() => {
        (hethongrapchieu?hethongrapchieu:[])
        .filter((cumrap)=>{
            if(getTheater){

                return cumrap.maHeThongRap === getTheater
            }else{
                return cumrap.maHeThongRap === hethongrapchieu[0].maHeThongRap
            }
        })
        .map((cumrap)=>{
            
            setLichChieu(cumrap?cumrap:cumrap[0].maHeThongRap)
            setCumRap(cumrap.cumRapChieu?cumrap.cumRapChieu:cumrap[0].cumRapChieu)
            const ngayChieu = cumrap.cumRapChieu.map((cum) => {
                return cum.lichChieuPhim.filter((cum,index)=>{
                    if(lichChon){

                        return new Date(cum.ngayChieuGioChieu).toLocaleDateString("en-US") === lichChon
                    }else{
                        return new Date(cum.ngayChieuGioChieu).toLocaleDateString("en-US") ===
                        new Date(hethongrapchieu[0].cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu).toLocaleDateString("en-US")
                    }
                    
                })
            })
            setIndexNgay(ngayChieu)
            return cumrap
            
        })
    }, [hethongrapchieu,getTheater,lichChon])
    
    const handleChooseDate = (date) => {
        console.log(date)
        setLichChon(date)
    }
    return (
        <div className="detailPage--book detailPage--book__left col-md-6 col-lg-6">
            <div className="detailPage--book__theater">
                <div className="detailPage--info-title">Chọn rạp</div>
                <div className="detailPage--book__theater-select">
                    <select className="form-select" aria-label="Default select example"
                            onChange={handleChooseTheater}
                        >
                            {(hethongrapchieu?hethongrapchieu:[]).map((theater,index)=>(
                                <option key={theater.maHeThongRap} value={theater.maHeThongRap}
                                >
                                    {theater.tenHeThongRap}
                                </option>
                                
                            ))}
                    </select>
                    <i className="fas fa-chevron-down" />
                </div>
            </div>
            <DetailBookDate lich={lichChieu} hethongrapchieu={hethongrapchieu} handleChoose={handleChooseDate} ></DetailBookDate>
            <div className="detailPage--book__theaterOut">
                <div className="detailPage--info-title">Chọn lịch chiếu</div>
                    <div className="detailPage--book__theaters">
                        {(cumRap?cumRap:[]).map((cum,indexRap)=>{
                            return indexNgay?.map((gio,index)=>{
                                if(indexNgay[index].length>0){

                                    if(index===indexRap){
                                        return(
                                            
                                            <div key={cum.maCumRap} className="detailPage--book__theater">
                                                        <div className="detailPage--book__nameTheater">
                                                            {cumRap[indexRap].tenCumRap}
                                                        </div>
                                                        <div className="detailPage--book__addressTheater">
                                                            {cumRap[indexRap].tenCumRap}
                                                        </div>
                                                        <DetailBookHour gioChieu={indexNgay[indexRap]}></DetailBookHour>
                                            </div>
                                        )
                                    }
                                }
                            })
                        })}
                            
                        
                </div>
            </div>
        </div>
    );
}

export default DetailBookMovie;