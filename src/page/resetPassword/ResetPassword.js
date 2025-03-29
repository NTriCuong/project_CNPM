import React, { useState } from 'react';
import './style.css'
import closeEge from '../../image/Icon/Login/closeEye.svg';
import closeLogo from '../../image/Icon/Login/closelogo.png';
import history from '../../image/Icon/Login/history.svg';
import calendar from '../../image/Icon/Login/calen.svg'
import { useDispatch, useSelector } from 'react-redux';
import {  onLogin, reset } from '../../redux/authSlice';
import { resetPassword } from '../../api/axiosClient';
import { selecDataClient } from '../../redux/Store';
import danger from '../../image/Icon/Login/danger.svg'
const ResetPassword = ({className}) => {
  const Dispath = useDispatch();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState('');
  const [showPassword2, setShowPassword2] = useState(false);
  const [isDanger,setIsDanger] = useState(false)
  const email =useSelector(selecDataClient);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === password2)
      Api()
    else
      setIsDanger(true);
  };
  //api
  const Api= async()=>{
    try {
      await resetPassword.post('/',{
        email: email,
        new_password: password,
        confirm_password: password2
      });
      alert("✈️ Đặt mật khẩu mới thành công!")
      handleClose();
      Dispath(onLogin())
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose=()=>{
    resetInputField()
  }
  const resetInputField=()=>{
    Dispath(reset())
    setPassword('');
    setPassword2('')
    setShowPassword(false)
    setShowPassword2(false)
  }
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  const handleShowPassword2=()=>{
    setShowPassword2(!showPassword2);
  }
 
  const handleLogin=()=>{
    handleClose();
    Dispath(onLogin())
  }
  return (
    <div className={className}>
    <div className="login-container">
   
      <div className="background-image"></div>
      
      
      <button className="close-button" onClick={handleClose}>
        <img src={closeLogo} alt='close'/>
      </button>
      
    
      <h1 className="welcome-title" style={{margin:'40px'}}>Chào Mừng Đến Với Nhóm 3</h1>
      
     
      <div className="login-box">
        <h2 className="login-header">Đặt lại mật khẩu</h2>
        <p className="login-subheader">Điền mật khẩu mới của bạn và xác nhận</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input 
              type={showPassword2?"text":"password"}
              placeholder="Nhập mật khẩu"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              style={{position:'relative'}}
            />
              
            {/* ege */}
            <img src={closeEge} alt="icon" style={{top:'174px', left:'358px', position:'absolute'}} 
            className={password2!==""?'icon-ege2':'none-eye'} 
            onClick={handleShowPassword2}/>
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label>Xác nhận mật khẩu</label>
            </div>
            <input 
              type={showPassword?"text":"password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{position:'relative'}}
            />
            <p className={isDanger?' danger':'danger danger-none'} >
            <img src={danger} alt='danger'/>Hãy đảm bảo bạn xác thực mật khẩu đúng</p>
            {/* ege */}
            <img src={closeEge} alt="icon" style={{top:'55%'}} className={password!==""?'icon-ege':'none-eye'} 
            onClick={handleShowPassword}/>
            
          </div>
          <hr style={{margin:'10px', height:'0.5px', border:'none',
            background: 'linear-gradient(to right, transparent, #EAF0F0, transparent)'}}/>
          <button type="submit" className="login-button">
            Xác nhận
          </button>
          
          <div className="signup-option">
            <span>Trở về đăng nhập ? </span>
            <button onClick={handleLogin}>Đăng nhập</button>
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

export default ResetPassword;
