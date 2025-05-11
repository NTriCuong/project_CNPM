import { useDispatch } from 'react-redux';
import Button from '../button/Button';
import './style.css';
import { onLogin, onRegister } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Menu({ className }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleHome = () => { navigate('/'); closeMenu(); };
    const handleFlight = () => { navigate('/booking'); closeMenu(); };
    // const handleMyFlight = () => { console.log('Bạn đã nhấn vào Chuyến Bay Của Tôi'); closeMenu(); };
    // const handleMore = () => { console.log('Bạn đã nhấn vào more'); closeMenu(); };

    const menuItems = [
        { label: "Trang Chủ", key: "home", onClick: handleHome },
        { label: "Chuyến Bay", key: "flights", onClick: handleFlight },
        // { label: "Chuyến Bay Của Tôi", key: "my-flights", onClick: handleMyFlight },
        // { label: "More", key: "more", onClick: handleMore }
    ];

    const menuButton = [
        {
            button: <Button text="Đăng Nhập" onClick={() => { dispatch(onLogin()); closeMenu(); }} className='btn-login' />,
            key: "dn"
        },
        {
            button: <Button text="Đăng Ký" onClick={() => { dispatch(onRegister()); closeMenu(); }} className='btn-signup' />,
            key: "dy"
        }
    ];

    return (
        <header>
            {/* Hamburger menu - chỉ hiện trên mobile */}
            <button className="menu-toggle" onClick={toggleMenu}>☰</button>

            {/* Desktop menu */}
            <div className={`menu ${className}`}>
                <div className="left">
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.key} className="menu-item" onClick={item.onClick}>{item.label}</li>
                        ))}
                    </ul>
                </div>
                <div className="right">
                    {/* <ul>
                        {menuButton.map(item => (
                            <li key={item.key} className="menu-item">{item.button}</li>
                        ))}
                    </ul> */}
                </div>
            </div>

            {/* Fullscreen dropdown menu for mobile */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.key} onClick={item.onClick}>{item.label}</li>
                    ))}
                    {menuButton.map(item => (
                        <li key={item.key}>{item.button}</li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Menu;