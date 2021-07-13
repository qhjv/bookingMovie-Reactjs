/* eslint-disable array-callback-return */
import $ from "jquery";
import React from 'react';


DetailBookDate.propTypes = {
    
};

function DetailBookDate(props) {
    const {lich} = props


    const handleDate = (value) =>{
        if(value === 0){
            return "Chủ nhật"
        }else if(value === 1){
            return "Thứ hai"
        }else if(value === 2){
            return "Thứ ba"
        }
        else if(value === 3){
            return "Thứ tư"
        }
        else if(value === 4){
            return "Thứ năm"
        }
        else if(value === 5){
            return "Thứ sáu"
        }
        else if(value === 6){
            return "Thứ bảy"
        }
    }
    const tabsMenu = document.querySelectorAll(".detailPage--book__date")
    tabsMenu.forEach((tab,index) => {
        tab.onclick= function(){
            $(".detailPage--book__dates .active").removeClass('active')
            this.classList.add('active')
            const offset = $( ".detailPage--book__dates .active" ).offset()
            document.getElementById('detailPage--book__dates').scrollLeft  += offset.left-350
        }
    })
       
    const set = new Set();
        (lich.cumRapChieu?lich.cumRapChieu:[]).map((lichChieu) => {
            lichChieu.lichChieuPhim.map((lichChieu)=>{

                return set.add(new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString("en-US"));

            })
    });
    const listDayShow = [...set];
    const handleChooseDate =(lich,index)=>{
        props.handleChoose(lich?lich:"")
        const tabsMenu = document.querySelectorAll(".detailPage--book__date")
        $(".detailPage--book__dates .active").removeClass('active')
        tabsMenu[index].classList.add('active')
    }
    
    return (
        <div className="detailPage--book__fullDate">
                <div className="detailPage--info-title">Chọn ngày</div>
                <div className="container">
                    <div className="detailPage--book__dates row d-flex align-items-center " id="detailPage--book__dates">
                        {(listDayShow?listDayShow:[]).map((lich,index)=>(
                            <div className={index===0?
                                "detailPage--book__date col-md-3 col-lg-3 active"
                                :"detailPage--book__date col-md-3 col-lg-3"}
                                onClick={()=>handleChooseDate(lich,index)}
                            >
                                <div className="detailPage--book__date-th">{handleDate(new Date(lich).getDay())}</div>
                                <div className="detailPage--book__date-day">{new Date(lich).getDate()}</div>
                                <div className="detailPage--book__date-month">Tháng {new Date(lich).getMonth()+1}</div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
    );
}

export default DetailBookDate;