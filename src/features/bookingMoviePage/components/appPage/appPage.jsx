import React from 'react';
import PropTypes from 'prop-types';
import "./appPage.css"



appPage.propTypes = {
    
};

function appPage(props) {
    return (
        <div className="appView">
            <div className="container">
                <div className="row">
                    <div className="appView_left col-md-5 col-lg-5">
                        <div className="appView_imgApp">
                            <img src="./images/layoutApp.jpg" alt="" className="img" />
                            <div className="appView_imgApp-download">
                                <div className="appView_download-img">
                                    <img src="./images/logoApp.png" alt="" />
                                </div>
                                <div className="appView_download-title">
                                    <h5>QH Movie</h5>
                                    <small>Đang tải xuống ...</small>
                                </div>
                                <div className="appView_download-gif">
                                    <img src="./images/taiApp.gif" alt="" />
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
                                    <img src="./images/app-store.png" alt="" />
                                </a>
                            </div>
                            <div className="appView_store appView_store-chplay">
                                <a href="#">
                                    <img src="./images/google-play.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default appPage;