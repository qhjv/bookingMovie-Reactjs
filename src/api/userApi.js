import axiosClient from "./axiosClient";



const userApi = {

    addUser(data){
        const url = `/QuanLyNguoiDung/DangKy`;
        return axiosClient.post(url ,data )
    },

}

export default userApi