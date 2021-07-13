import { Breadcrumbs, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import imgCast from "../../../src/assets/images/anh34.jpg";
import Footer from '../../components/footer/footer';
import Loading from '../../components/loading/loading';
import NavBar from '../../components/navbar/navBar';
import useMovieDetail from '../../hooks/useMovieDetail';
import DetailBookMovie from './detailBookMovie/detailBookMovie';
import './detailMoviePage.css';

DetailMoviePage.propTypes = {
    
};

function DetailMoviePage(props) {
    const {
        params: { id }
    } = useRouteMatch()
    const {movie,loading}= useMovieDetail(id)
    return (
        <div className="fullpage fullpage-detailPage">
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
                <NavBar setUser={props.setUserState}></NavBar>
                <div className="detailPage">
                    <div className="container">
                        <div className="detailPage--breadcrumbs">
                            <Breadcrumbs aria-label="breadcrumb" className="detailPage--breadcrumbs">
                                <Link class="breadcrumb-nameMovie" color="inherit" to="/" >
                                    Trang chủ
                                </Link>
                                <Typography>Phim {movie.tenPhim}</Typography>
                            </Breadcrumbs>
                        </div>
                        <div className="detailPage--first row">
                            <div className="detailPage--first__img col-md-4 col-lg-4">
                                <img src={movie.hinhAnh} alt="" />
                            </div>
                            <div className="detailPage--first__trailer col-md-8 col-lg-8">
                                <iframe width="100%" height="100%" src={movie.trailer} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                        </div>
                        <div className="detailPage--info row">
                        <div className="col-md-6 col-lg-6 d-flex justify-content-between flex-column">
                            <div className="detailPage--info__content">
                                <div className="detailPage--info-title">Nội dung</div>
                                <div className="detailPage--info__content-p">
                                    <p>{movie.moTa}</p>
                                </div>
                            </div>
                            <div className="detailPage--info__casts">
                                <div className="detailPage--info-title">Diễn viên</div>
                                <div className="detailPage--info__cast">
                                    <div className="detailPage--info__cast-img">
                                        <img src={imgCast} alt="" />
                                    </div>
                                    <div className="detailPage--info__cast-name">Quang Huy</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="detailPage--info__details">
                                <div className="detailPage--info-title">Chi tiết</div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Đạo diễn</div>
                                    <div className="detailPage--info__detail-right">Michal Cồ</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Quốc gia</div>
                                    <div className="detailPage--info__detail-right">Việt Nam</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Thể loại</div>
                                    <div className="detailPage--info__detail-right">Hành động-hài hước-tâm lý</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Khởi chiếu</div>
                                    <div className="detailPage--info__detail-right">{new Date(movie.ngayKhoiChieu).toLocaleDateString("en-GB")}</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Thời lượng</div>
                                    <div className="detailPage--info__detail-right">110 phút</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Độ tuổi</div>
                                    <div className="detailPage--info__detail-right">18+</div>
                                </div>
                                <div className="detailPage--info__detail">
                                    <div className="detailPage--info__detail-left">Đánh giá</div>
                                    <div className="detailPage--info__detail-right">{movie.danhGia}/10</div>
                                </div>
                            </div>
                            
                        </div>
                        <DetailBookMovie hethongrapchieu={movie.heThongRapChieu}></DetailBookMovie>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer></Footer>
            </div>
      </div>
    );
}

export default DetailMoviePage;