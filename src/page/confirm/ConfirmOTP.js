import React, { useState } from 'react';
import closeLogo from '../../image/Icon/Login/closelogo.png';
import history from '../../image/Icon/Login/history.svg';
import calendar from '../../image/Icon/Login/calen.svg'
const ConfirmOTP = ({className}) => {
  const [otp, setOtp] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    handleOnLogin();
    setOtp('');
  };
  const handleClose=()=>{
    setOtp('');
  }
  
  const handleOnLogin=()=>{
    handleClose();
  }
  return (
    <div className={className}>
    <div className="login-container">
   
      <div className="background-image"></div>
      
      
      <button className="close-button" onClick={handleClose}>
        <img src={closeLogo} alt='close'/>
      </button>
      
    
      <h1 className="welcome-title">Chào Mừng Đến Với Nhóm 3</h1>
      
     
      <div className="login-box">
        <h2 className="login-header">Xác thực OTP</h2>
        <p className="login-subheader">Nhập OTP mà chúng tôi đã gửi đến email của bạn</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Mã OTP</label>
            <input 
              type="text" 
              placeholder="Nhập OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          
          <hr style={{margin:'10px', height:'0.5px', border:'none',
            background: 'linear-gradient(to right, transparent, #EAF0F0, transparent)'}}/>
          <button type="submit" className="login-button">
            Xác nhận
          </button>
          
          <div className="signup-option">
            <span>Trở về đăng nhập? </span>
            <button onClick={handleOnLogin}>Đăng nhập</button>
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

export default ConfirmOTP;
