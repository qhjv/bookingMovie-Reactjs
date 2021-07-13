/* eslint-disable react-hooks/exhaustive-deps */
import $ from "jquery";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Screen from "../../../../assets/images/screen.png";
import { clearSeats, getSeats } from '../../ticketRoomSlice';

TicketChooseSeats.propTypes = {
    
};

function TicketChooseSeats(props) {
    const {seats} =props
    const dispatch = useDispatch()
    const tabsSeat = document.querySelectorAll(".bookTicketMovie--seat")
    tabsSeat.forEach((tab, index) => {
        tab.onclick = function () {
            this.classList.toggle('active')
        }
    })
    const handleChooseSeat = (seat) => {
        $(".bookTicketMovie--seat").add("active")
        const action = getSeats(seat)
        dispatch(action)
    }
    useEffect(() => {
        
        const action = clearSeats({
            bookingSeat:[],
            totalPrice:0,
           totalPriceSeat:0,
           totalPriceCombo:0
        })
        dispatch(action)
    }, [seats])
    return (
        <>
                            <div className="bookTicketMovie--screen">
                                <img src={Screen} alt="" />
                            </div>
                            <div className="bookTicketMovie--seats row">
                                {(seats?seats:[]).map((seat,index)=>(
                                    <div key={seat.maGhe} 
                                        className={`
                                            bookTicketMovie--seat col-md-1 col-lg-1
                                            ${seat.loaiGhe === "Vip" ? "vip":""}
                                            ${seat.daDat === true ? "sold":""}
                                            `
                                        } 
                                        onClick={()=>{handleChooseSeat(seat)}}
                                    >
                                        <i className="fas fa-couch" />
                                    </div>

                                ))}
                            </div>
                            <div className="bookTicketMovie--tutorials row">
                                <div className="bookTicketMovie--tutorial bookTicketMovie--tutorial-normal col-md-3 col-lg-3">
                                    <i className="fas fa-couch" /> 
                                    <div className="bookTicketMovie--tutorial__text">
                                    Ghế Trống
                                    </div>
                                </div>
                                <div className="bookTicketMovie--tutorial bookTicketMovie--tutorial-vip col-md-3 col-lg-3">
                                    <i className="fas fa-couch" /> 
                                    <div className="bookTicketMovie--tutorial__text">
                                    Ghế Vip 
                                    </div>
                                </div>
                                <div className="bookTicketMovie--tutorial bookTicketMovie--tutorial-active col-md-3 col-lg-3">
                                    <i className="fas fa-couch" /> 
                                    <div className="bookTicketMovie--tutorial__text">
                                    Ghế Đang Chọn 
                                    </div>
                                </div>
                                <div className="bookTicketMovie--tutorial bookTicketMovie--tutorial-sold col-md-3 col-lg-3">
                                    <i className="fas fa-couch" /> 
                                    <div className="bookTicketMovie--tutorial__text">
                                    Ghế Có Người Chọn 
                                    </div>
                                </div>
                            </div> 
        </>
    );
}

export default TicketChooseSeats;