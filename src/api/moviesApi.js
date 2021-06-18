import { MA_NHOM } from "../constants/constants";
import axiosClient from "./axiosClient";



const moviesApi = {
    getmoviesShow(params){
        const url = `/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`;
        return axiosClient.get(url , { params: params } )
    },
    // getmovieNowShowId(id){
    //     const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP11';
    //     return axiosClient.get(url)
    // },
    
}

export default moviesApi