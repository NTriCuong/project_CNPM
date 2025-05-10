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
    console.log("Kết quả:", newResults);
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
  const [randomData, setRandomData] = useState([]); // Lưu trữ dữ liệu random

  // Random dữ liệu khi vừa truy cập vào trang
  useEffect(() => {
    randomizeData();
  }, []);

  // Hàm random dữ liệu
  const randomizeData = () => {
    const shuffledData = data.sort(() => Math.random() - 0.5).slice(0, 50);
    setRandomData(shuffledData);
  };
  return (
    <div style={styleContainer}>
      <h1 style={styleH1}>Final Question</h1>
      <form onSubmit={handleSubmit}>
        <ul style={styleUl}>
          {randomData.map((item, index) => (
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
