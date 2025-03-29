import './style.css'
import chatbot from'../../image/Icon/HomePage/chatbot.png'
import { IoMicCircle } from "react-icons/io5";
import sent from '../../image/Icon/HomePage/sent.svg'
import { useState } from 'react';

function ChatBox(){
    const [statusChatBox, setStatusChatBox] = useState(false);
    const [massage,setMassage] = useState([
        { sender:'bot', msg:'Hello, May I help you!', key:1 },
        { sender:'user', msg:'tôi muốn tìm 1 chuyến bay từ hà nội đến thành phố Bacelona',key:2 },
        { sender:'bot', msg:'tôi có thể giúp bạn.....',key:3 },
        { sender:'user', msg:'bạn có thể gửi link được không', key:4 },
        { sender:'user', msg:'tôi muốn tìm 1 chuyến bay từ hà nội đến thành phố Bacelona',key:6 },
        { sender:'bot', msg:'tôi có thể giúp bạn.....',key:7 },
        { sender:'user', msg:'bạn có thể gửi link được không', key:8 }
    ])
    const handleSent=()=>{

    }
    const handleBot=()=>{
        setStatusChatBox(!statusChatBox)
    }
    return (<>
    <div className={statusChatBox?'chatbox':'chatbox-none'}>
        <div className='title'> <img src={chatbot} alt='chat bot'/> Chat với chúng tôi</div>
        
        <div className='center'> 
            {massage.map(item=>{
               return <div key={item.key}className={item.sender==='bot'?'':'msg-right'}  > <div className='massage' >{item.msg}</div></div>
            })}
        </div>
        <div className='bottom'>
            <input placeholder='Nhập nội dung'/>
            <div>
                <IoMicCircle  className='mic'/>
                <img src={sent} alt='sent' className='sent' onClick={handleSent}/>
            </div>
        </div>
    </div>
    <div className={statusChatBox?'bot':'bot bot-hover'} onClick={handleBot}>
        <img src={chatbot}/>
    </div>
    <div className='title-bot'>Chat với chúng tôi</div>
    </>)
}
export default ChatBox;