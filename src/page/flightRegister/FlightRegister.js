import React, {  useState } from 'react';
import './style.css'; 
import closeEge from '../../image/Icon/Login/closeEye.svg'
import closeLogo from '../../image/Icon/Login/closelogo.png';
import checkBox from '../../image/Icon/Login/checkbox & Radio.svg';
import checkBoxTrue from '../../image/Icon/Login/checkbox & RadioTrue.svg';
import { useDispatch } from 'react-redux';
import { onConfirmOTP, onLogin, reset } from '../../redux/authSlice';
import { authRegister } from '../../api/axiosClient';
import { setDataClient } from '../../redux/dataClientSlice';
const FlightRegister = ({className}) => {
  const Dispath = useDispatch();
  // dữ liệu form
  const [name,setName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
// checkbox
const [radioBnt,setRadioBnt] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    Api();
    
  };
  const handleClose=()=>{
    Dispath(reset());
    resetInputField();
  }
  const resetInputField=()=>{
    setName('');
    setNumberPhone('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setRadioBnt(false);
  }
  const handleShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  //checkbox
  const handleCheckBox=()=>{
    setRadioBnt(!radioBnt);
  }
  const handleLogin=()=>{
    handleClose()
    Dispath(onLogin());
  }
  //call api
  const Api = async()=>{
    try{
      const response = await authRegister.post('/',{
        email:email,
        password:password})
        console.log("successful!",response) // dang ky thanh cong
        Dispath(setDataClient(email))
        Dispath(onConfirmOTP());// hien form nhap otp
    } catch (error) {
      console.log("check api register error ",error.response.data.detail)// mesage call api loi
    }
  }
  
  return (
    <div className={className}>
    <div className="login-container">
   
      <div className="background-image"></div>
      
      
      <button className="close-button" onClick={handleClose}>
        <img src={closeLogo} alt='close'/>
      </button>
      
    
      <h1 className="welcome-title" style={{margin:'10px'}}>Chào Mừng Đến Với Nhóm 3</h1>
      
     
      <div className="login-box">
        <h2 className="login-header">Tạo Tài Khoản</h2>
        <p className="login-subheader">Điền đầy đủ thông tin để đăng ký</p>
        
        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label>Họ Và Tên</label>
            <input 
              type="text" 
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Địa Chỉ Email</label>
            <input 
              type="email" 
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group" style={{position:'relative'}}>
            <label>Số Điện Thoại</label>
            <div style={{color:'#EAF0F0',position:'absolute',bottom:'10px',left:'10px'}}>+84</div>
            <input 
              style={{paddingLeft:'50px' }}
              type="tel" 
              pattern="[0-9]{10}" // chỉ cho phép nhập đúng 10 chữ số
              placeholder="Nhập số điện thoại"
              value={numberPhone}
              onChange={(e) => setNumberPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label>Mật Khẩu</label>
            </div>
            <input 
              type={showPassword?"text":"password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{position:'relative'}}
            />
            {/* ege */}
            <img src={closeEge} alt="icon" className={password!==""?'icon-ege':'none-eye'} onClick={handleShowPassword}/>
          </div>
          <p style={{fontSize:'12px',margin:'0 0 0 20px',position:'relative'}}>

            <img src={radioBnt?checkBoxTrue:checkBox} alt=''
            onClick={handleCheckBox} 
            style={radioBnt?{position:'absolute',bottom:'-20px',left:'-33px',cursor:'pointer'}:
            {position:'absolute',bottom:'0px',left:'-23px',cursor:'pointer'}}/>

          Tôi chấp nhận <u style={{fontSize:'12px',color:'#FE9792'}} 
          >Điều khoản</u> & <u style={{fontSize:'12px',color:'#FE9792'}}>Điều kiện</u></p>

          <hr style={{margin:'10px', height:'0.5px', border:'none',
            background: 'linear-gradient(to right, transparent, #EAF0F0, transparent)'}}/>
          <button type="submit" className="login-button">
            Tạo Tài Khoản
          </button>

          <div className="signup-option">
            <span>Đã có tài khoản?</span>
            <button onClick={handleLogin}>Đăng Nhập</button>
          </div>
        </form>
      </div>
      
    </div>
    </div>
  );
};

export default FlightRegister;
