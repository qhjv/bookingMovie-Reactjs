import axios from "axios"
import { ACCESS_TOKEN } from "../constants/constants";


const axiosClient = axios.create({
    
    baseURL: 'https://movie0706.cybersoft.edu.vn/api/',
    headers: {
      'Content-Type':'application/json',
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
    },
});



//Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default axiosClient;