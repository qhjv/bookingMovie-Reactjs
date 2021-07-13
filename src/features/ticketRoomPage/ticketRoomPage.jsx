/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumbs, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import $ from "jquery";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Swal from "sweetalert2";
import Footer from '../../components/footer/footer';
import Loading from "../../components/loading/loading";
import NavBar from '../../components/navbar/navBar';
import useTicketInfo from "../../hooks/useTicketInfo";
import { ticketBooked } from './bookedClient';
import TicketChooseSeats from './components/ticketChooseSeats/ticketChooseSeats';
import PayPal from './components/ticketPay/paypal';
import "./ticketRoomPage.css";



TicketRoomPage.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Chọn ghế', 'Chọn phương thức thanh toán', 'Hoàn thành'];
  }
  



function TicketRoomPage(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkPay, setCheckPay] = useState(false);
    const [timeM, setTimeM] = useState(5);
    const [timeS, setTimeS] = useState(0);
    const [temp, setTemp] = useState(0);
    const [thanhToan, setThanhToan] = useState("");

    var arrTemp = [];

    const history = useHistory();
    const dispatch = useDispatch()
    
    const {
        params: { id }
    } = useRouteMatch()

    const tickets = useSelector(state=>state.ticketroom)
    useEffect(() => {
        handleTime();
    }, [temp]);
    const {ticket,loading}= useTicketInfo(id)
    if (!ticket) {
        return null;
    }
    const steps = getSteps();
    const handleNext = async () => {
        if(tickets.bookingSeat.length >0 && activeStep!== 1 ){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setCheckPay(false)
        }else if(tickets.bookingSeat.length <= 0){
            Swal.fire({
                icon: "warning",
                title: "Chưa chọn ghế",
            });
        }else if(checkPay === false){
            Swal.fire({
                icon: "warning",
                title: "Bạn chưa thanh toán",
            });
        }else if(checkPay === true && activeStep === 1 && tickets.totalPrice>0){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            let idTicket = Math.random().toString(36).substr(2, 5);
            let infoUser = JSON.parse(localStorage.getItem("user"));
            let infoEmail = infoUser.email;
            let settenphim= (ticket.thongTinPhim?ticket.thongTinPhim:{}).tenPhim
            let setgiochieu= (ticket.thongTinPhim?ticket.thongTinPhim:{}).gioChieu
            let setngaychieu= (ticket.thongTinPhim?ticket.thongTinPhim:{}).ngayChieu
            let setrapchieu= (ticket.thongTinPhim?ticket.thongTinPhim:{}).tenCumRap
            let setsoghe= (tickets.bookingSeat?tickets.bookingSeat:[])
            let setgiatien = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tickets.totalPrice)
            let thanhtoan = thanhToan
            let infoTickets = Object.assign({}, {settenphim},{setsoghe},{setgiatien}, { setgiochieu},{infoEmail},{setngaychieu},{setngaychieu},{setrapchieu},{thanhtoan},{ idTicket });
            var count = 0;
            if (localStorage.getItem("historyBookTicket")) {
            count = JSON.parse(localStorage.getItem("historyBookTicket")).length;
            }
            if (count > 0) {
            arrTemp = JSON.parse(localStorage.getItem("historyBookTicket"));
            arrTemp.push(infoTickets);
            } else {
            arrTemp.push(infoTickets);
            }
            localStorage.setItem("historyBookTicket", JSON.stringify(arrTemp));
            try {
                const { taiKhoan } = JSON.parse(
                    localStorage.getItem("userAPI")
                  );
                let danhSachVe = [];
                  (tickets.bookingSeat?tickets.bookingSeat:[]).forEach((danhSach) => {
                    let { maGhe, giaVe } = danhSach;
                    danhSachVe.push({ maGhe, giaVe });
                });
                const action = ticketBooked({
                    maLichChieu: (ticket.thongTinPhim?ticket.thongTinPhim:{}).maLichChieu,
                    danhSachVe: danhSachVe,
                    taiKhoanNguoiDung: taiKhoan
                })
                
                const resultAction = await dispatch(action)
                const bookedTicket = unwrapResult(resultAction)
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    
    const handleClickFinish = () => {
        history.push({ pathname: "/lich-su-dat-ve" });
        $(window).scrollTop(0);
    }
    const handlePaySoon =()=>{
        Swal.fire({
            icon: "success",
            title: "Bạn đã chọn giao dịch trực tiếp tại quầy",
        });
        setCheckPay(true)
        if(thanhToan){
            Swal.fire({
                icon: "warning",
                title: "Bạn đã thanh toán trước đó",
            });
        }else{
            setThanhToan("Thanh toán tại quầy")
        }
    }
    const tranSuccess = (check) =>{
        setCheckPay(check)
        setThanhToan("Đã thanh toán")
    }
    
      const handleTime = () => {
        let tempTime = timeS;
        let time = setInterval(() => {
          tempTime = tempTime - 1;
          if (tempTime === -1) {
            setTimeM(a => a - 1);
            tempTime = 59
          }
          setTimeS(tempTime);
          if (document.getElementById("timePhut")) {
            var timeM1 = document.getElementById("timePhut").innerText;
          }
          if (Number(timeM1) === 0 && tempTime === 0) {
            clearInterval(time);
          }
          if (Number(timeM1) === 0 && tempTime === 0) {
            Swal.fire({
              title: 'Bạn có muốn tiếp tục ?',
              text: "Hết thời gian đặt ghế",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'var(--color-main1)',
              cancelButtonColor: 'var(--color-main2)',
              confirmButtonText: 'Có'
            }).then((result) => {
              if (result.isConfirmed) {
                setTimeM(5);
                setTemp(temp + 1);
              } else {
                history.push({ pathname: "/" });
                $(window).scrollTop(0);
              }
            })
          }
    
        }, 1000);
      };
    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <>
                   <TicketChooseSeats seats={ticket.danhSachGhe}></TicketChooseSeats>             
                </>
            );
          case 1:
            return (
                <div className="payTickets">
                    <div className="container ">
                        <div className="row d-flex flex-column justify-content-between align-items-center">
                                
                                <div class="payTicket-again" onClick={handlePaySoon}>
                                        Thanh toán tại quầy
                                </div>
                                <div className="payTicket payTicket-paypal ">
                                    <PayPal 
                                        price={(Math.round(tickets.totalPrice / 23000 * 100) / 100)}
                                        tranSuccess={tranSuccess}
                                    ></PayPal>
                                </div>
                                <div className="payTicket-rules">
                                    <Checkbox color="primary" disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                    Tôi đồng ý điều khoản sử dụng và vé mua không thể hoàn lại .
                                </div>
                        </div>
                    </div>
                </div>
            );
          case 2:
            return (
                <>
                    <p>
                        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br></br>
                        Hãy kiểm tra email để biết kết quả giao dịch.<br></br>
                        Chúc bạn có một buổi xem phim vui vẻ , hẹn gặp các bạn tại rạp.<br></br>
                        Bạn muốn kiểm tra lịch sử giao dịch hãy nhấn nút bên dưới.
                    </p>
                </>
            );
          default:
            return 'Unknown step';
        }
    }
    
    return (
        <div className="fullpage bookTicketMovieFull">
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
            <NavBar setUser={props.setUserState}></NavBar>
            <div className="bookTicketMoviePage">
                <div className="container">
                        <div className="detailPage--breadcrumbs">
                            <Breadcrumbs aria-label="breadcrumb" className="detailPage--breadcrumbs">
                                <Link class="breadcrumb-nameMovie" color="inherit" to="/" >
                                    Trang chủ
                                </Link>
                                
                                <Typography>Đặt vé </Typography>
                            </Breadcrumbs>
                        </div>
                    <div className="row justify-content-between">
                    <div className="bookTicketMovie--left col-md-9 col-lg-9">
                            <div className="bookTicketMovie--countdown">
                                <div className="bookTicketMovie--countdown__title">Thời gian giữ ghế</div>
                                <div className="bookTicketMovie--countdown__time">
                                    <span id="timePhut"> 0{timeM}</span>
                                    <span>&nbsp;:&nbsp;</span>
                                    <span>{timeS}</span>
                                </div>
                            </div>
                        <div className={classes.root }>
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                            <Button
                                                disabled={activeStep === 0 || activeStep === 2 }
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Quay lại' : 'Chọn lại'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={activeStep === steps.length - 1 ? handleClickFinish : handleNext }
                                            >
                                                {activeStep === steps.length - 1 ? 'Lịch sử đặt vé' : 'Xác nhận'}
                                            </Button>
                                            </div>
                                        </div>
                                        </StepContent>
                                    </Step>
                                    ))}
                                </Stepper>
                                
                            </div>
                    </div>    
                        <div className="bookTicketMovie--right col-md-3 col-lg-3">
                            <div className="bookTicketMovie--infoMovie">
                                <div className="bookTicketMovie--img bookTicketMovie--right_list">
                                    <img src={(ticket.thongTinPhim?ticket.thongTinPhim:{}).hinhAnh} alt=""/>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--nameMovie ">
                                    <div className="detailPage--info__detail-left">Tên phim :</div>
                                    <div className="detailPage--info__detail-right">{(ticket.thongTinPhim?ticket.thongTinPhim:{}).tenPhim}</div>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--time">
                                    <div className="detailPage--info__detail-left">Thời lượng :</div>
                                    <div className="detailPage--info__detail-right">110 phút</div>
                                </div>
                            </div>
                            <div className="bookTicketMovie--infoTheater">
                                <div className="bookTicketMovie--right_list bookTicketMovie--nameTheater">
                                    <div className="detailPage--info__detail-left">Rạp :</div>
                                    <div className="detailPage--info__detail-right">{(ticket.thongTinPhim?ticket.thongTinPhim:{}).tenCumRap}</div>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--address">
                                    <div className="detailPage--info__detail-left">Địa chỉ :</div>
                                    <div className="detailPage--info__detail-right">{(ticket.thongTinPhim?ticket.thongTinPhim:{}).diaChi}</div>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--right_list bookTicketMovie--room d-flex justify-content-between align-items-center">
                                    <div className="detailPage--info__detail-left">Phòng :</div>
                                    <div className="detailPage--info__detail-right">{(ticket.thongTinPhim?ticket.thongTinPhim:{}).tenRap}</div>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--timeBook">
                                    <div className="detailPage--info__detail-left">Suất chiếu :</div>
                                    <div className="detailPage--info__detail-right">{(ticket.thongTinPhim?ticket.thongTinPhim:{}).gioChieu} ngày {(ticket.thongTinPhim?ticket.thongTinPhim:{}).ngayChieu}</div>
                                </div>
                            </div>
                            <div className="bookTicketMovie--infoTicket">
                                <div className="bookTicketMovie--right_list bookTicketMovie--infoSeats d-flex justify-content-between">
                                    <div className="detailPage--info__detail-left">Ghế :</div>
                                    <div className="detailPage--info__detail-right detailPage--info__detail-seats ">
                                        {(tickets.bookingSeat?tickets.bookingSeat:[]).map((seat)=>(
                                            <div key={seat.maGhe}>
                                                {seat.tenGhe},
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bookTicketMovie--right_list bookTicketMovie--price d-flex justify-content-between align-items-center">
                                    <div className="detailPage--info__detail-left">Giá :</div>
                                    <div className="detailPage--info__detail-right detailPage--info__detail-price ">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tickets.totalPrice)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer></Footer>
            </div>
        </div>
    );
}

export default TicketRoomPage;