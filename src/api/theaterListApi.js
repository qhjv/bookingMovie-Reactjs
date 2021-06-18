import axiosClient from "./axiosClient";



const theaterListApi = {

    getTheaterList(params){
        const url = `/QuanLyRap/LayThongTinCumRapTheoHeThong`;
        return axiosClient.get(url , { params: params } )
    },

}

export default theaterListApi