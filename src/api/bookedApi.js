import axiosClient from "./axiosClient";



const bookedApi = {

    addBooked(data){
        const url = `/QuanLyDatVe/DatVe`;
        return axiosClient.post(url ,data )
    },

}

export default bookedApi