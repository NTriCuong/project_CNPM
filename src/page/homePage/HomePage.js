import { useState } from 'react';
import Menu from '../../component/menu/Menu';
import FlightSearchBox from '../../component/search/FlightSearchBox';
import FlightBookingLogin from '../flightLogin/FlightBookingLogin';
import Banner from './component/banner/Banner';
import './style.css';
import FlightRegister from '../flightRegister/FlightRegister';
import Footer from '../../component/footer/Footer';

function HomePage(){
    const [onLogin,setOnLogin] = useState(false);
    const [onRegister,setOnRegister]= useState(false);
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
    return <div class="constainer">
        <Menu onLogin={handleLogin} onRegister={handleRegister}/>
        <Banner/>
        {/* <FlightSearchBox  className={"search-box"}/> */}
        <FlightBookingLogin className={`form-login ${onLogin?"on-login":""}`} onLogin={handleCloseLogin} create={handleCreate}/>
        <FlightRegister className={`form-login ${onRegister?"on-login":""}`} onRegister={handleCloseRegister} login={handleLg}/>
        <Footer/>
    </div>
}
export default HomePage;