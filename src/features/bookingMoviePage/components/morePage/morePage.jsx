import React from 'react';
import imgSale2 from "../../../../assets/images/voucher1.jpg";
import imgSale1 from "../../../../assets/images/voucher2.jpg";
import imgSale3 from "../../../../assets/images/voucher3.jpg";
import "./morePage.css";
import SlideSale from './slideSale';


MorePage.propTypes = {
    
};
const collection = [
    { src: imgSale1, caption: " one" },
    { src: imgSale2, caption: " two" },
    { src: imgSale3, caption: " three" },
];
  
function MorePage(props) {
    return (
        <div className="fullpage bookTicketMovieFull">
            <div className="morePage">
                <div className="container">
                    <div className="morePage_header">
                        <h3>Khuyến mãi &amp; Tin tức</h3>
                    </div>
                    <div className="row">
                        <div className="morePage_sale">
                            <div className="morePage_sale-img col-md-12 col-lg-12">
                                <SlideSale
                                    input={collection}
                                    ratio={`3:2`}
                                    mode={`automatic`}
                                    timeout={`7000`}
                                />
                            </div>
                        </div>
                        <div className="morePage_news">
                            <div className="morePage_new morePage_news-1 col-md-4 col-lg-4">
                                <div className="morePage_title">
                                    Marvel quyết tạo khác biệt cho phim Spider man  và dựa trên các nhân vật trong những ấn phẩm của Marvel Comics
                                </div>
                            </div>
                            <div className="morePage_new morePage_news-2 col-md-4 col-lg-4">
                                <div className="morePage_title">
                                    Marvel được "tẩy trắng" nhân vật : Có phải là tiêu chuẩn kép?
                                </div>
                            </div>
                            <div className="morePage_new morePage_news-3 col-md-4 col-lg-4">
                                <div className="morePage_title">
                                    Dù đã qua đời, Paul Walker vẫn đang được cân nhắc để xuất hiện lại trong Fast &amp; Furious
                                </div>
                            </div>
                        </div>
                        <div className="pageViewer--button">
                            <div className="pageViewer--button__all pageViewer--button__all2">
                            
                                <div className="pageViewer--bonus pageViewer--bonus2">
                                    Xem Thêm
                                </div>
                                <i className="fas fa-long-arrow-alt-right"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
      </div>
    );
}

export default MorePage;