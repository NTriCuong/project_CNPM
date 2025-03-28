import React, { useState } from 'react';
import './FlightBookingLogin.css'; 
import closeEge from '../../image/Icon/Login/closeEye.svg';
import closeLogo from '../../image/Icon/Login/closelogo.png';
import history from '../../image/Icon/Login/history.svg';
import calendar from '../../image/Icon/Login/calen.svg'
import danger from '../../image/Icon/Login/danger.svg'
import { useDispatch } from 'react-redux';
import { onConfirmOTP, onForgotPassword, onRegister, reset } from '../../redux/authSlice';
import { authLogin, resentOtp } from '../../api/axiosClient';
import { setDataClient } from '../../redux/dataClientSlice';
import { setStOtp } from '../../redux/stOtpSlice';
const FlightBookingLogin = ({className}) => {
  const Dispath = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // danger
  const [isDanger, setIsDanger] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    Api();
  };
  const handleClose=()=>{
    Dispath(reset());
    resetInputField();
  }
  const resetInputField = ()=>{
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setIsDanger(false);
  }
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  const handleCreate=()=>{
    Dispath(onRegister());
    resetInputField()
  }
  const handleForgot=()=>{
    Dispath(onForgotPassword());
    resetInputField()
  }
  // API
  const Api = async()=>{
    try {
        await authLogin.post('/',{
        email:email,
        password:password})
        alert("✈️ Đăng nhập thành công!");
        handleClose()
    } catch (error) {
      if(error.status === 401)// sai mật khẩu
        setIsDanger(true);
      else if (error.status === 403){//email chưa dược xác thực
        Dispath(setDataClient(email));
        ApiResent();// gui otp vao tk và yêu cầu sang cònirmOTP để xác thực
        Dispath(onConfirmOTP());
      }else
      alert('kiem tra lai mang!')
    }
    
  }
  const ApiResent = async()=>{
      try {
        await resentOtp.post('/',{email:email})
        Dispath(setStOtp(true))
      } catch (error) {
        alert('Không thể gửi OTP!')
      }
    }
  return (
    <div className={className}>
    <div className="login-container">
   
      <div className="background-image"></div>
      
      
      <button className="close-button" onClick={handleClose}>
        <img src={closeLogo} alt='close'/>
      </button>
      <h1 className="welcome-title" style={{margin:'20px'}}>Chào Mừng Đến Với Nhóm 3</h1>
      <div className="login-box">
        <h2 className="login-header">Đăng Nhập</h2>
        <p className="login-subheader">Điền địa chỉ email và mật khẩu để đăng nhập</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Địa Chỉ Email</label>
            <input 
              type="email" 
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className={isDanger?' danger':'danger danger-none'} ><img src={danger} alt='danger'/>vui lòng nhập địa chỉ email hợp lệ</p>
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label>Mật Khẩu</label>
              <a className="forgot-password" onClick={handleForgot}>Quên mật khẩu?</a>
            </div>
            <input 
              type={showPassword?"text":"password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{position:'relative'}}
            />
            <p className={isDanger?' danger':'danger danger-none'}><img src={danger} alt='danger'/>vui lòng nhập password hợp lệ</p>
            {/* ege */}
            <img src={closeEge} alt="icon" style={{top:'55%'}} className={password!==""?'icon-ege':'none-eye'} 
            onClick={handleShowPassword}/>
            
          </div>
          <hr style={{margin:'10px', height:'0.5px', border:'none',
            background: 'linear-gradient(to right, transparent, #EAF0F0, transparent)'}}/>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
          
          <div className="signup-option">
            <span>Chưa có tài khoản? </span>
            <button onClick={handleCreate}>Tạo tài khoản</button>
          </div>
        </form>
      </div>
      
     
      <div className="footer-info">
        <div className="flight-options">
            
              <div style={{color:'#EAF0F0', display:'inline-block',fontSize:'12px',
                marginLeft:'0px' ,width:'170px', position:'relative',textAlign:'end'}}>
              <img src={calendar} alt='calendar' style={{width:'20px', position:'absolute',left:'18px',top:'-1px'}}/>
                Xem/Hủy Chuyến Bay</div>

            <hr style={{margin:'10px', width:'2px', height:'30px', border:'none',
            background: 'linear-gradient(to bottom, transparent, #EAF0F0, transparent)'}}/>
            <div style={{color:'#EAF0F0',position:'relative',width:'170px',marginLeft:'22px',fontSize:'12px'}}>
            <img src={history} alt='history' style={{width:'20px', position:'absolute',left:'-23px',top:'-1px'}}/>
              Kiểm Tra Lịch sử Chuyến Bay</div>
        </div>
        
            <hr style={{margin:'10px', height:'2px', border:'none',
            background: 'linear-gradient(to right, transparent, #EAF0F0, transparent)'}}/>
        <p className="company-description" style={{color:'#EAF0F0'}}>
         Chúng tôi là một công ty dịch vụ đặt vé chuyến bay đang phát triển, cung cấp các ưu đãi và giảm giá tốt nhất.
         <br />
         Chúng tôi cung cấp dịch vụ cho khách hàng, với chất lượng và hỗ trợ đặt biệt.
        </p>
      </div>
    </div>
    </div>
  );
};

export default FlightBookingLogin;
