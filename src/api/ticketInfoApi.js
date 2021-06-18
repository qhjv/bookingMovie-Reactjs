import axiosClient from "./axiosClient";



const ticketInfoApi = {

    getTicketInfo(params){
        const url = `/QuanLyDatVe/LayDanhSachPhongVe`;
        return axiosClient.get(url , { params: params } )
    },

}

export default ticketInfoApi