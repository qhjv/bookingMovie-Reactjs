import React,{useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import "./ticketRoomPage.css"
import NavBar from '../../components/navbar/navBar';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import TicketChooseSeats from './components/ticketChooseSeats/ticketChooseSeats';
import useTicketInfo from "../../hooks/useTicketInfo"
import Loading from "../../components/loading/loading"
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import clearSeats from './ticketRoomSlice'

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
    const [gia,setGia] = useState("0")
    const [check,setCheck] = useState(true)
    const dispatch = useDispatch()


    const {
        params: { id }
    } = useRouteMatch()

    const tickets = useSelector(state=>state.ticketroom)

    const {ticket,loading}= useTicketInfo(id)
    // useEffect(() => {
    //     const action = clearSeats({
    //         bookingSeat:[],
    //         totalPrice:0,
    //         totalPriceSeat:0,
    //         totalPriceCombo:0
    //     })
    //     dispatch(action)
    // }, [ticket])
    if (!ticket) {
        return null;
    }
    const steps = getSteps();
    
    const handleNext = () => {
        if(tickets.bookingSeat.length >0 ){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
            Swal.fire({
                icon: "warning",
                title: "Chưa chọn ghế",
            });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    
    const handleClickFinish = () => {
        console.log("hihi")
    }
   

    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <>
                   <TicketChooseSeats seats={ticket.danhSachGhe}></TicketChooseSeats>             
                </>
            );
          case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
          case 2:
            return `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`;
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
                                <Link class="breadcrumb-nameMovie" color="inherit" to="/" >
                                    Phim
                                </Link>
                                <Typography>Đặt vé </Typography>
                            </Breadcrumbs>
                        </div>
                    <div className="row justify-content-between">
                    <div className="bookTicketMovie--left col-md-9 col-lg-9">
                    
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
                                                disabled={activeStep === 0}
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
                                    <img src={(ticket.thongTinPhim?ticket.thongTinPhim:{}).hinhAnh} />
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
            
        </div>
    );
}

export default TicketRoomPage;