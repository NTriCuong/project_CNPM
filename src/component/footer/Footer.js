// Footer.jsx
import React from 'react';
import fb from '../../image/Icon/Footer/fb.png'
import tt from '../../image/Icon/Footer/twitter.png'
import zl from '../../image/Icon/Footer/zalo.png'
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo">
            <span className="logo-text">LIFT</span>
          </div>
          <p className="description">
            Xin chào, chúng tôi là Nhóm 3. Mục tiêu của chúng tôi là chuyên hóa những tiến trình liên quan tới việc tối ưu sự trải nghiệm của người dùng, từ đó cải thiện khách hàng và đối ngũ của họ.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon facebook"><img src={fb} alt="facebook"/></a>
            <a href="#" className="social-icon twitter"><img src={tt} alt="twitter"/></a>
            <a href="#" className="social-icon zalo"><img src={zl} alt="zalo"/></a>
          </div>
        </div>
        
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Về Nhóm 3</h3>
            <a href="#">Giới thiệu nhóm</a>
            <a href="#">Tin tức</a>
            <a href="#">Nhà đầu tư</a>
          </div>
          
          <div className="footer-column">
            <h3>Hỗ trợ</h3>
            <a href="#">FAQ</a>
            <a href="#">Chăm Sóc Khách Hàng</a>
            <a href="#">Chính Sách Bảo Vệ</a>
          </div>
          
          <div className="footer-column-feedback">
            <h3>Phản hồi</h3>
            <div className="contact-form">
              <input type="email" placeholder="Email address" className="email-input" />
              <button className="submit-button">→</button>
            </div>
            <p className="contact-description">
              Xin chào, chúng tôi là Nhóm 3. Mục tiêu của chúng tôi là một nghề và cải thiện niềm mong đợi của nghiệm số hiệu cho Nam trạch của bạn.
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;