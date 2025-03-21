import axios from "axios";
// api đăng nhập
const root = 'http://api.dcwizard.net/flight_api';
// instan
export const authLogin = axios.create({
    baseURL:`${root}/auth/login/`,
    timeout: 5000
})
// api đăng ký

export const authRegister = axios.create({
    baseURL:`${root}/auth/login/`,
    timeout: 5000
})