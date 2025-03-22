import { useDispatch } from 'react-redux';
import Button from '../button/Button';
import './style.css';
import { onLogin, onRegister } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Menu({className}){
    const Dispath = useDispatch();
    const Navigate = useNavigate();

    const handleHome=()=>{
        Navigate('/');
    }
   
    const handleFlight=()=>{
        console.log('ban da nhan vao Chuyến Bay');
    }
    const handleMyFlight=()=>{
        console.log('ban da nhan vao Chuyến Bay Của Tôi');
        
    }
    const handleMore=()=>{
        console.log('ban da nhan vao more');
        
    }
    const menuItems = [
        { label: "Trang Chủ", key: "home", onClick:handleHome}, 
        { label: "Chuyến Bay", key: "flights",onClick:handleFlight }, 
        { label: "Chuyến Bay Của Tôi", key: "my-flights",onClick:handleMyFlight }, 
        { label: "More", key: "more",onClick:handleMore }
    ];
    const menuButton =[
        {
            button: <Button text="Đăng Nhập" onClick={()=>Dispath(onLogin())} className='btn-login'/>,
            key:"dn"
        },{
            button: <Button text="Đăng Ký" onClick={()=>Dispath(onRegister())} className='btn-signup'/>,
            key:"dy"
        }
    ]
    return <header >
        <div className={`menu ${className}`}>
            <div className="left">
                <ul>
                {menuItems.map((item)=>{
                    return <li key={item.key} className="menu-item" onClick={item.onClick}>{item.label}</li>
                })}
                </ul>
            </div>
            <div className="right">
                <ul>
                {menuButton.map(item=>{
                        return <li key={item.key} className="menu-item">{item.button}</li>
                    })}
                </ul>
            </div>
        </div>
    </header>
}
export default Menu;