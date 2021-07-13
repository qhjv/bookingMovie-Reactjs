/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumbs, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgPng from "../../../src/assets/images/noBookTicket.png";
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navBar';
import "./historyBookTicket.css";

HistoryBookTicket.propTypes = {
    
};

function HistoryBookTicket(props) {
    const [infoHistory,setInfoHistory] = useState([])
    useEffect(() => {
        if (localStorage.getItem("historyBookTicket")) {
            let infoTemp = JSON.parse(localStorage.getItem("historyBookTicket"));
            let infoUser = JSON.parse(localStorage.getItem("user"));
            let infoBookTicketsAll = infoTemp.filter((item) => {
              return infoUser.email === item.infoEmail;
            })
            setInfoHistory(infoBookTicketsAll)
        }
    }, [localStorage.getItem("historyBookTicket")])
    if(infoHistory.length === 0){
        return(
            <div class="fullpage bookTicketMovieFull">
                <NavBar setUser={props.setUserState}></NavBar>
                <div className="historyBookTicket">
                    <div className="container">
                    <div className="detailPage--breadcrumbs">
                                <Breadcrumbs aria-label="breadcrumb" className="detailPage--breadcrumbs">
                                    <Link class="breadcrumb-nameMovie" color="inherit" to="/" >
                                        Trang chủ
                                    </Link>
                                    
                                    <Typography>Lịch sử đặt vé </Typography>
                                </Breadcrumbs>
                            </div>
                        <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã vé</th>
                                    <th scope="col">Tên phim</th>
                                    <th scope="col">Lịch chiếu</th>
                                    <th scope="col">Rạp</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Thanh toán</th>
                                    </tr>
                                </thead>
                            </table>
                                <div className="noTicket">
                                            <div className="noTicket_div">
                                                <img src={imgPng} alt=""></img>
                                                <h3>Chưa có vé đặt</h3>
                                            </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer></Footer>
                </div>
            </div>
        )
    }else{

        return (
            <div class="fullpage bookTicketMovieFull">
                <NavBar setUser={props.setUserState}></NavBar>
                <div className="historyBookTicket">
                    <div className="container">
                    <div className="detailPage--breadcrumbs">
                                <Breadcrumbs aria-label="breadcrumb" className="detailPage--breadcrumbs">
                                    <Link class="breadcrumb-nameMovie" color="inherit" to="/" >
                                        Trang chủ
                                    </Link>
                                    
                                    <Typography>Lịch sử đặt vé </Typography>
                                </Breadcrumbs>
                            </div>
                        <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã vé</th>
                                    <th scope="col">Tên phim</th>
                                    <th scope="col">Lịch chiếu</th>
                                    <th scope="col">Rạp</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Thanh toán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(infoHistory?infoHistory:[]).map((info,index)=>(
    
                                        <tr key={info.idTicket}>
                                            <th scope="row">{index+1}</th>
                                            <td>{info.idTicket}</td>
                                            <td>{info.settenphim}</td>
                                            <td>{info.setgiochieu} ngày {info.setngaychieu}</td>
                                            <td>{info.setrapchieu}</td>
                                            <td>{info.setgiatien}</td>
                                            <td>{info.thanhtoan}</td>
                                        </tr>
                                    
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

export default HistoryBookTicket;