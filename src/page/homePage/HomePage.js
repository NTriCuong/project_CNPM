import Menu from '../../component/menu/Menu';
import FlightSearchBox from '../../component/search/FlightSearchBox';
import FlightBookingLogin from '../flightLogin/FlightBookingLogin';
import Banner from './component/banner/Banner';
import './style.css';
import FlightRegister from '../flightRegister/FlightRegister';
import Footer from '../../component/footer/Footer';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import ConfirmOTP from '../confirm/ConfirmOTP';
import { useDispatch, useSelector } from 'react-redux';
import  {  SelecAuth } from '../../redux/Store';
import ResetPassword from '../resetPassword/ResetPassword';
import { upload } from '@testing-library/user-event/dist/upload';
import { data } from 'react-router-dom';
import { useState } from 'react';

function HomePage(){
    const auth = useSelector(SelecAuth);
    
    return <div class="constainer">
        <Menu />
        <Banner/>
        <FlightSearchBox  className={"search-box"}/>
        <FlightBookingLogin className={`form-login ${auth === 'auth-login'?"on-login":""}`} />
        <FlightRegister className={`form-login ${auth==='auth-register'?"on-login":""}`} />
        <ForgotPassword className={`form-login ${auth==='auth-forgotpassword'?"on-login":""}`} />
        <ConfirmOTP className={`form-login ${auth==='auth-confirmotp'?"on-login":""}`} />
        <ResetPassword className={`form-login ${auth==='auth-resetpassword'?"on-login":""}`} />
        <Footer/>
    </div>
}
export default HomePage;