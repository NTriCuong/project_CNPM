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
            button: <Button text="Đăng Nhập" onClick={handleLogin}/>,
            key:"dn"
        },{
            button: <Button text="Đăng Ký" onClick={handleRegister}/>,
            key:"dy"
        }
    ]
    return <header >
        <div class="menu" className={className}>
            <div class="left">
                <ul>
                {menuItems.map((item)=>{
                    return <li key={item.key} class="menu-item">{item.label}</li>
                })}
                </ul>
            </div>
            <div class="right">
                <ul>
                {menuButton.map(item=>{
                        return <li key={item.key} class="menu-item">{item.button}</li>
                    })}
                </ul>
            </div>
        </div>
    </header>
}
export default Menu;