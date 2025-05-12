import axios from "axios";
// api đăng nhập
const root = 'https://api.dcwizard.net/flight_api';
// instan
export const authLogin = axios.create({
    baseURL:`${root}/auth/login`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",  // Đảm bảo gửi JSON
      },
})
// api đăng ký
export const authRegister = axios.create({
    baseURL:`${root}/auth/register`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",  // Đảm bảo gửi JSON
      },
})
export const verifyOtp = axios.create({
    baseURL:`${root}/auth/verify-otp`,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",  // Đảm bảo gửi JSON
      },
})

export const resentOtp = axios.create({
    baseURL:`${root}/auth/resent-otp`,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",  // Đảm bảo gửi JSON
      },
})
export const resetPassword = axios.create({
    baseURL:`${root}/auth/reset-password`,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",  // Đảm bảo gửi JSON
      },
})

//API SEARCH FLIGHT
export const searchFlight = axios.create({
  baseURL:`${root}/flight/search_flight`,
  timeout: 10000,
  headers:{
    "Content-Type": "application/json",
  }
})


//API GET FLIGHT
export const getFlight = axios.create({
  baseURL:`${root}/flight/search_flight_all`,
  timeout: 10000,
  headers:{
    "Content-Type": "application/json",
  }
})

// Thêm interceptor cho request
getFlight.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // thêm token vào header
    }
    return config; // trả về config đã chỉnh sửa
  },
  (error) => {
    return Promise.reject(error);
  }
);
