import $ from "jquery";
import React from 'react';
import { Link } from 'react-router-dom';

DetailBookHour.propTypes = {
    
};

function DetailBookHour({gioChieu}) {
    const handleClickBook = () => {
        $(window).scrollTop(0);
    }
    return (
        <div className="detailPage--book__times d-flex align-items-center ">
            {gioChieu.map((gio,index)=>(

                <Link 
                    to={`/dat-ve/${gio?.maLichChieu}`} 
                    key={gio.maLichChieu}
                    className="detailPage--book__time col-md-3 col-lg-3"
                    onClick={handleClickBook}
                >
                    {new Date(gio.ngayChieuGioChieu).toLocaleTimeString("en-GB",{ hour: "2-digit", minute: "2-digit" })}
                </Link>
            ))}
        </div>
    );
}

export default DetailBookHour;