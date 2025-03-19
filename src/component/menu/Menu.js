import { useDispatch } from 'react-redux';
import Button from '../button/Button';
import './style.css';
import { onLogin, onRegister } from '../../redux/counterSlice';

function Menu({className}){
    const Dispath = useDispatch();
   
    const menuItems = [
        { label: "Trang Chủ", key: "home" }, 
        { label: "Chuyến Bay", key: "flights" }, 
        { label: "Chuyến Bay Của Tôi", key: "my-flights" }, 
        { label: "More", key: "more" }
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
                    return <li key={item.key} className="menu-item">{item.label}</li>
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