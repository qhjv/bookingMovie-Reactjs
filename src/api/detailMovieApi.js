import axiosClient from "./axiosClient";



const detailMovieApi = {

    getDetailMovie(params){
        const url = `/QuanLyRap/LayThongTinLichChieuPhim`;
        return axiosClient.get(url , { params: params } )
    },

}

export default detailMovieApi