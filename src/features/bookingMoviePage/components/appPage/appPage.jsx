/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import applestore from "../../../../assets/images/app-store.png";
import chplay from "../../../../assets/images/google-play.png";
import layoutApp from "../../../../assets/images/layoutApp.jpg";
import logoApp from "../../../../assets/images/logoApp.png";
import taiApp from "../../../../assets/images/taiApp.gif";
import "./appPage.css";


AppPage.propTypes = {
    
};

function AppPage(props) {
    return (
        <div className="appView">
            <div className="container">
                <div className="row">
                    <div className="appView_left col-md-5 col-lg-5">
                        <div className="appView_imgApp">
                            <img src={layoutApp} alt="" className="img" />
                            <div className="appView_imgApp-download">
                                <div className="appView_download-img">
                                    <img src={logoApp} alt="" />
                                </div>
                                <div className="appView_download-title">
                                    <h5>QH Movie</h5>
                                    <small>Đang tải xuống ...</small>
                                </div>
                                <div className="appView_download-gif">
                                    <img src={taiApp} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="appView_right col-md-7 col-lg-7">
                        <div className="appView_content">
                            Tải App về điện thoại của bạn để có trải nghiệm dễ dàng hơn .
                        </div>
                        <div className="appView_small">
                            Ứng dụng đặt vé xem phim hàng đầu Việt Nam , với giao diện dễ nhìn , đơn giản giúp khách hàng dễ dàng thao tác .Vui lòng tải ứng dụng để có được trải nghiệm tốt nhất
                        </div>
                        <div className="appView_stores">
                            <div className="appView_store appView_store-applestore">
                                <a href="#">
                                    <img src={applestore} alt="" />
                                </a>
                            </div>
                            <div className="appView_store appView_store-chplay">
                                <a href="#">
                                    <img src={chplay} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default AppPage;