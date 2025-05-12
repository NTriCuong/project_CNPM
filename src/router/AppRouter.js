import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../page/homePage/HomePage';
import FlightBookingPage from'../page/bookingPage/FlightBookingPage';
import FinalQuestion from "../page/finalQuestion/FinalQuestion";
import FlightBookingLogin from "../page/flightLogin/FlightBookingLogin";
import FlightRegister from "../page/flightRegister/FlightRegister";
import ForgotPassword from "../page/forgotPassword/ForgotPassword";
import ConfirmOTP from "../page/confirm/ConfirmOTP";
import ResetPassword from "../page/resetPassword/ResetPassword";
import AdminPage from "../page/adminPage/AdminPage";
import Form from "../page/adminPage/component/Form";
function AppRouter() {
  // auth/auth.js
 const isAuthenticated = () => {
  // Kiểm tra cả trong sessionStorage và localStorage để chắc chắn
  return sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== '';
};
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin-login" replace />;
};
          console.log(isAuthenticated());
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/booking" element={<FlightBookingPage />} />
        <Route path="/final-question" element={<FinalQuestion/>} />

        <Route path="/admin" element={
           <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
        }  />
        <Route path="/admin/form" element={<Form/>} />
        {/* các trang đăng nhập đăng xuất */}
        <Route path="/admin-login" element={<FlightBookingLogin/>} />
        <Route path="/admin-register" element={<FlightRegister/>} />
        
        <Route path="/admin-forgotpassword" element={<ForgotPassword/>} />
        <Route path="/admin-confirmotp" element={<ConfirmOTP/>} />
        <Route path="/admin-resetpassword" element={<ResetPassword/>} />

        <Route path="*" element= {<Navigate to={isAuthenticated() ? '/admin' : '/login'} replace /> }/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
