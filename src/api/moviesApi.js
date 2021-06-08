import axiosClient from "./axiosClient";



const moviesApi = {
    getmoviesNowShow(params){
        const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP11';
        return axiosClient.get(url , { params: params } )
    },
    // getmovieNowShowId(id){
    //     const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP11';
    //     return axiosClient.get(url)
    // },
    getmoviesComeSoon(params){
        const url = '/QuanLyPhim/LayDanhSachPhim?maNhom=GP02';
        return axiosClient.get(url,{ params })
    }
}

export default moviesApi