import React, { useEffect, useState } from "react";
import data from "./data.json";

const FinalQuestion = () => {
  const [answers, setAnswers] = useState({}); // Lưu trữ câu trả lời của người dùng
  const [showTheory, setShowTheory] = useState(false); // Lưu trữ trạng thái hiển thị lý thuyết
  const [results, setResults] = useState([
    {
      question: null,
      userAnswer: null, // Nếu người dùng chưa chọn, hiển thị "Chưa trả lời"
      correctAnswer: null,
      isCorrect: null,
    },
  ]); // Lưu trữ kết quả so sánh

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value, // Lưu câu trả lời theo chỉ số câu hỏi
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // So sánh đáp án và lưu kết quả vào một biến tạm thời
    const newResults = data.map((item, index) => {
      const userAnswer = answers[index]; // Đáp án người dùng đã chọn
      const correctAnswer = item.answer; // Đáp án đúng từ file data.json
      return {
        question: item.question,
        userAnswer: userAnswer || null, // Nếu người dùng chưa chọn, hiển thị "Chưa trả lời"
        correctAnswer,
        isCorrect: userAnswer === correctAnswer, // Kiểm tra đúng/sai
      };
    });

    // Cập nhật state results
    setResults(newResults);
    setShowTheory(true);
    // In ra kết quả ngay lập tức
    //chuyển về đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng cuộn mượt
    });
  };

  const styleContainer = {
    width: "70%",
    margin: "0 auto",
  };
  const styleH1 = {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "2em",
    marginBottom: "20px",
  };
  const styleUl = {
    listStyle: "none",
    padding: 0,
  };
  const displayTheory = {
    display: "block",
    marginTop: "10px",
    fontSize: "0.9em",
    color: "#555",
  };
  const noneTheory = {
    display: "none",
  };
  const styleSubmit = {
    marginTop: "20px",
    marginBottom: "100px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  // In ra kết quả so sánh
  const resuilttrue = {
    display: "none",
  };
  const resuiltfalse = {
    color: "red",
    display: "block",
  };
  const styleRandom ={
    margin:'10px',
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }
  const [dataDisplay, setDataDisplay] = useState([]); // Lưu trữ dữ liệu random
  const dataDB = data
  // Random dữ liệu khi vừa truy cập vào trang
  useEffect(() => {
    randomizeData();
  }, []);

  // Hàm random dữ liệu
 const randomizeData = () => {
  // Bước 1: Tạo bản sao để không thay đổi mảng gốc
  const shuffled = [...dataDB];

  // Bước 2: Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Bước 3: Chọn 50 phần tử đầu (không trùng vì mảng gốc đã unique)
  const uniqueResults = shuffled.slice(0, 50);
  
  setDataDisplay(uniqueResults);
};
  const handleRandom = ()=>{
    randomizeData();
  }
  // Kiểm tra và khởi tạo giá trị 'index-question' trong localStorage nếu chưa có
  useEffect(() => {
    const index = localStorage.getItem('index-question');
    if (index === null) {
      localStorage.setItem('index-question', 0);
    }
  }, []);

  // Lấy giá trị index từ localStorage (nếu có)
  // Lấy giá trị index từ localStorage (nếu có)
  const index = parseInt(localStorage.getItem('index-question'), 10) || 0;
  // Hàm lấy 50 câu hỏi liên tiếp từ vị trí index trong data
  const handleSequentially = () => {
    const next50 = dataDB.slice(index, index + 50);
    setDataDisplay(next50);
    if(index + 50 >= dataDB.length)
      localStorage.setItem('index-question', 0);
    else
      localStorage.setItem('index-question', index + 50);
  };
  return (
    <div style={styleContainer}>
      <h1 style={styleH1}>Final Question</h1>
      <button onClick={handleRandom} style={styleRandom} >Random</button>
      <button onClick={handleSequentially} style={styleRandom}>Theo Thứ Tự</button>

      <form onSubmit={handleSubmit}>
        <ul style={styleUl}>
          {dataDisplay.map((item, index) => (
            <li key={index}>
              <br />
              <strong>{item.question}</strong>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="A"
                    onChange={() => handleAnswerChange(index, "A")}
                  />{" "}
                  A. {item.a}
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="B"
                    onChange={() => handleAnswerChange(index, "B")}
                  />{" "}
                  B. {item.b}
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="C"
                    onChange={() => handleAnswerChange(index, "C")}
                  />{" "}
                  C. {item.c}
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value="D"
                    onChange={() => handleAnswerChange(index, "D")}
                  />{" "}
                  D. {item.d}
                </label>
                <br />
                {showTheory && results[index] && (
                  <strong
                    style={
                      results[index].isCorrect ? resuilttrue : resuiltfalse
                    }
                  >
                    Đáp án đúng {item.answer}
                  </strong>
                )}
                <strong style={showTheory ? displayTheory : noneTheory}>
                 <p style={{fontWeight:"bold",color:"black",fontSize:"16px"}}> Cơ sở lý thuyết: </p>{item.theory}
                </strong>
              </div>
            </li>
          ))}
        </ul>
        <button style={styleSubmit} type="submit">
          gửi câu trả lời
        </button>
      </form>
    </div>
  );
};

export default FinalQuestion;
