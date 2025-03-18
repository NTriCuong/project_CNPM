import { useState } from 'react';
import Menu from '../../component/menu/Menu';
import FlightSearchBox from '../../component/search/FlightSearchBox';
import FlightBookingLogin from '../flightLogin/FlightBookingLogin';
import Banner from './component/banner/Banner';
import './style.css';
import FlightRegister from '../flightRegister/FlightRegister';
import Footer from '../../component/footer/Footer';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import ConfirmOTP from '../confirm/ConfirmOTP';

function HomePage(){
    const [onLogin,setOnLogin] = useState(false);
    const [onRegister,setOnRegister]= useState(false);
    const [onForgot, setOnForgot] =useState(false);
    const [onConfirm, setOnConfirm] = useState(false)
    const handleLogin=(data)=>{
        setOnLogin(data);
    }
    const handleCloseLogin=(data)=>{
        setOnLogin(data);
    }
    //register
    const handleRegister=(data)=>{
        setOnRegister(data)
    }
    const handleCloseRegister=(data)=>{
        setOnRegister(data)
    }
    const handleCreate=(data)=>{
        if(data)setOnRegister(true)
    }
    const handleLg=(data)=>{
        if(data)setOnLogin(true)
    }
    //forgot password
    const handleForgotPw=(data)=>{
        setOnForgot(data);
        setOnLogin(false)
    }
    // confirm otp
    const handleOnConfirm=(data)=>{
        setOnConfirm(data)
        setOnForgot(false);
    }
    return <div class="constainer">
        <Menu onLogin={handleLogin} onRegister={handleRegister}/>
        <Banner/>
        <FlightSearchBox  className={"search-box"}/>
        <FlightBookingLogin className={`form-login ${onLogin?"on-login":""}`} onForgot={handleForgotPw} onLogin={handleCloseLogin} create={handleCreate}/>
        <FlightRegister className={`form-login ${onRegister?"on-login":""}`} onRegister={handleCloseRegister} login={handleLg}/>
        <ForgotPassword className={`form-login ${onForgot?"on-login":""}`} onForgot={handleForgotPw} onLogin={handleLg} onConfirm={handleOnConfirm}/>
        <ConfirmOTP className={`form-login ${onConfirm?"on-login":""}`} onConfirm={handleOnConfirm} onLogin={handleLg}/>
        {/* <Footer/> */}
    </div>
}
export default HomePage;