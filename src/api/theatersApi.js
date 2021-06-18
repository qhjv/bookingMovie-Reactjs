import axiosClient from "./axiosClient";



const theatersApi = {
    getTheaters(params){
        const url = '/QuanLyRap/LayThongTinLichChieuHeThongRap';
        return axiosClient.get(url , { params: params } )
    },
    // getTheater(params){
    //     const url = `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`;
    //     return axiosClient.get(url , { params: params } )
    // },
    // getmovieNowShowId(id){
    //     const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP11';
    //     return axiosClient.get(url)
    // },
    
}

export default theatersApi