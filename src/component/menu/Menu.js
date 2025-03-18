import Button from '../button/Button';
import './style.css';

function Menu({className,onLogin, onRegister}){
    const handleLogin=()=>{
        onLogin(true);
    }
    const handleRegister=()=>{
        onRegister(true);
    }
    const menuItems = [
        { label: "Trang Chủ", key: "home" }, 
        { label: "Chuyến Bay", key: "flights" }, 
        { label: "Chuyến Bay Của Tôi", key: "my-flights" }, 
        { label: "More", key: "more" }
    ];
    const menuButton =[
        {
            button: <Button text="Đăng Nhập" onClick={handleLogin} className='btn-login'/>,
            key:"dn"
        },{
            button: <Button text="Đăng Ký" onClick={handleRegister} className='btn-signup'/>,
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