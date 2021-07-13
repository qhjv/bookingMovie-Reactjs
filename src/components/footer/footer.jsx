import React from 'react';
import logo from "../../assets/images/logo.png"
import "./footer.css"
Footer.propTypes = {
    
};

function Footer(props) {
    return (
        
            <div className="container">
                <div className="row">
                    <div className="footer_tops d-flex justify-content-around ">
                        <div className="footer_top col-lg-3 col-md-3">
                            <div className="footer_top-content">Điều khoản sử dụng</div>
                                <ul className="footer_top-ul">
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Điều khoản chung</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Điều khoản sử dụng</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Chính sách thanh toán</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Câu hỏi thường gặp</a>
                                    </li>
                                </ul>
                        </div>
                        <div className="footer_top col-lg-3 col-md-3">
                            <div className="footer_top-content">Danh mục</div>
                                <ul className="footer_top-ul">
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Phim</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Phim đang chiếu</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Tin tức</a>
                                    </li>
                                    <li className="footer_top-li">
                                        <a className="footer_top-a" href>Ứng dụng</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer_top col-lg-3 col-md-3">
                                <div className="footer_top-content">Đối tác</div>
                                <div className="footer_top-partners">
                                <div className="footer_top-partner visa" />
                                <div className="footer_top-partner jcb" />
                                <div className="footer_top-partner ghn" />
                                <div className="footer_top-partner ninja" />
                                <div className="footer_top-partner airPay" />
                                <div className="footer_top-partner shoppePay" />
                            </div>
                        </div>
                        <div className="footer_top footer_top-end col-lg-3 col-md-3">
                            <div className="footer_top-logo">
                                <img src={logo} alt="" />
                            </div>
                            <div className="footer_top-socials">
                                <div className="footer_top-social">
                                    <i className="fab fa-facebook-f" />
                                </div>
                                <div className="footer_top-social">
                                    <i className="fab fa-instagram" />
                                </div>
                                <div className="footer_top-social">
                                    <i className="fab fa-snapchat-ghost" />
                                </div>
                                <div className="footer_top-social">
                                    <i className="fab fa-twitter" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_bottom d-flex justify-content-between align-items-center">
                        <div className="footer_bottom-download">
                            <i className="fab fa-apple" />
                            <i className="fab fa-google-play" />
                        </div>
                        <p className="footer_bottom-copyright">Copyright © <a href="http://qh-jv.ml/">JV</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
    );
}

export default Footer;