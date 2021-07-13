import $ from "jquery";
import React from 'react';
import { Link } from 'react-router-dom';

ListMovieDate.propTypes = {

};

function ListMovieDate({ movieDate }) {
    const tabsDate = document.querySelectorAll(".theaterMovie--time h5")
    const hours = document.querySelectorAll(".theaterMovie--hours")
    tabsDate.forEach((tab, index) => {
        tab.onclick = function () {
            hours[index].classList.add('active')
        }
    })
    const handleClickBook = () => {
        $(window).scrollTop(0);
    }
    const handleClickToggle = (index) => {
    }
    // biến BigArr có nhiệm vụ khi biến arr được chạy trong vòng for gom đủ
    // số ngày trùng nhau thì nó sẽ đẩy lên bigArr
    let bigArr = [];

    // biến tmp làm cột mốc ngày để chạy vòng for so sánh với tmp
    let tmp = movieDate[0].ngayChieuGioChieu.substring(0, 10);

    // gom các số ngày trùng nhau lại
    let arr = [];

    for (let i = 0; i < movieDate.length; i++) {
        if (movieDate[i].ngayChieuGioChieu.substring(0, 10) === tmp) {
            // so sanh giống thì push vào arr
            arr.push(movieDate[i]);
        } else {
            // sau khi phát hiện có ngày khác (vì Backend đã sắp xếp ngày) thì push các
            // ngày trùng nhau của mảng arr vào bigArr
            bigArr.push(arr);
            // reset biến arr
            arr = [];
            // sau khi reset thì tiếp tục công việc push vào mảng arr
            arr.push(movieDate[i]);
            // thay biến tmp thành biến mới để so sanh tiếp
            tmp = movieDate[i].ngayChieuGioChieu.substring(0, 10);
            // <NgayGioCollapse gio={arr} ngay={thongTinGioNgayChieus[i - 1]} />;
        }
        if (i === movieDate.length - 1) {
            // khi chạy tới cuối vòng for thì tự push các ngày còn lại trong biến arr
            // lên bigArr
            bigArr.push(arr);
        }
    }
    return (
        <>
            {(bigArr ? bigArr : []).map((mov, index) => (
                <div key={mov.ngayChieuGioChieu} className="theaterMovie--time">
                    <h5 onClick={() => handleClickToggle(index)}>
                        {new Date(mov[0].ngayChieuGioChieu).toLocaleDateString("en-GB")}
                        <i className="fas fa-angle-down" />
                    </h5>
                    <div className="theaterMovie--hours">
                        <div className="container">
                            <div className="row">
                                {mov.map((mv)=>(
                                    <Link 
                                        to={`/dat-ve/${mv?.maLichChieu}`} 
                                        key={mv?.maLichChieu}
                                        className="theaterMovie--hour col-md-4 col-lg-4"
                                        onClick={handleClickBook}
                                    >
                                        {new Date(mv.ngayChieuGioChieu).toLocaleTimeString("en-GB",{ hour: "2-digit", minute: "2-digit" })}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ListMovieDate;