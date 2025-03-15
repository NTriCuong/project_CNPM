import axios from "axios";
// api đăng nhập
const authInstance = axios.create({
    baseURL:'',
    timeout: 5000
})