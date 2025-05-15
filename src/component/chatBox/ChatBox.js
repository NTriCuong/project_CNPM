import "./style.css";
import chatbot from "../../image/Icon/HomePage/chatbot.png";
import { IoMicCircle } from "react-icons/io5";
import sent from "../../image/Icon/HomePage/sent.svg";
import { useEffect, useRef, useState } from "react";
import { sentMessage } from "../../api/axiosClient";

function ChatBox() {
    const [isComposing, setIsComposing] = useState(false);
  const [statusChatBox, setStatusChatBox] = useState(false);
  const [massage, setMassage] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [massage]);

  const handleChange = (event) => {
    setMsgInput(event.target.value);
  };
  const handleSent = () => {
    Api();
  };
  //api sent
  const Api = async () => {
    try {
      // Add user message
      setMassage((prev) => [...prev, { sender: "user", msg: msgInput }]);
      const res = await sentMessage.post("/", {
        sender: "user",
        message: msgInput,
      });

      // Lấy dữ liệu phản hồi từ backend
      const botReply = res.data?.[0]?.text;
      setMsgInput("");
      // Nếu có phản hồi thì đợi 1 giây rồi hiển thị
      if (botReply) {
        setTimeout(() => {
          setMassage((prev) => [...prev, { sender: "bot", msg: botReply }]);
        }, 1000);
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  const handleBot = () => {
    setStatusChatBox(!statusChatBox);
  };
  return (
    <>
      <div className={statusChatBox ? "chatbox" : "chatbox-none"}>
        <div className="title">
          {" "}
          <img src={chatbot} alt="chat bot" /> Chat với chúng tôi
        </div>
        <div className="center">
          {massage.map((item) => {
            return (
              <div
                key={item.key}
                className={item.sender === "bot" ? "" : "msg-right"}
              >
                <div className="massage">{item.msg}</div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
        <div className="bottom">
          <input
            placeholder="Nhập nội dung"
            onChange={handleChange}
            value={msgInput}
            onCompositionStart={() => setIsComposing(true)} // đang gõ dấu
            onCompositionEnd={() => setIsComposing(false)} // gõ dấu xong
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isComposing) {
                e.preventDefault(); // tránh hành vi mặc định
                handleSent();
              }
            }}
          />
          <div>
            <IoMicCircle className="mic" />
            <img src={sent} alt="sent" className="sent" onClick={handleSent} />
          </div>
        </div>
      </div>
      <div
        className={statusChatBox ? "bot" : "bot bot-hover"}
        onClick={handleBot}
      >
        <img src={chatbot} alt="chat bot" />
      </div>
      <div className="title-bot">Chat với chúng tôi</div>
    </>
  );
}
export default ChatBox;
