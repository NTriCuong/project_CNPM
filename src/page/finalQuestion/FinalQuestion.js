import React, { useEffect, useState } from "react";
import data2 from "./data2.json"; //  bạn đã có file data2.json
import chuong4 from "./dataChuong4.json"; // Giả sử bạn đã có file data.json
import chuong5 from "./dataChuong5.json";
import chuong6 from "./dataChuong6.json";
import chuong7 from "./dataChuong7.json";
import chuong8 from "./dataChuong8.json";

const FinalQuestion = () => {
  const [valueSelect, setValueSelect] = useState(""); 
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
  const styleRandom = {
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };
  const [dataDisplay, setDataDisplay] = useState([]); // Lưu trữ dữ liệu random
  const dataDB = [...chuong4, ...chuong5, ...chuong6, ...chuong7, ...chuong8]; //spread gép mảng
  // Random dữ liệu khi vừa truy cập vào trang
  

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
    const uniqueResults = shuffled.slice(0, 30);
    setDataDisplay(uniqueResults);
  };
  const handleRandom = () => {
    setAnswers({});
    setShowTheory(false);
    setResults([
      {
        question: null,
        userAnswer: null, // Nếu người dùng chưa chọn, hiển thị "Chưa trả lời"
        correctAnswer: null,
        isCorrect: null,
      },
    ]);
    randomizeData();
  };

  const handleSequentially = (e) => {
    setValueSelect(e.target.value);
  };
  // Hàm xử lý khi người dùng gửi câu trả lờis
  useEffect(() => {
  console.log("Giá trị mới của valueSelect là:", valueSelect);

  // Cập nhật dữ liệu tương ứng
  switch (valueSelect) {
    case "chuong4":
      setDataDisplay(chuong4);
      break;
    case "chuong5":
      setDataDisplay(chuong5);
      break;
    case "chuong6":
      setDataDisplay(chuong6);
      break;
    case "chuong7":
      setDataDisplay(chuong7);
      break;
    case "chuong8":
      setDataDisplay(chuong8);
      break;
    default:
      setDataDisplay([]);
  }

  // Reset trạng thái khi chọn chương mới
  setAnswers({});
  setShowTheory(false);
  setResults([
    {
      question: null,
      userAnswer: null,
      correctAnswer: null,
      isCorrect: null,
    },
  ]);
}, [valueSelect]); // ✅ Chạy lại mỗi khi valueSelect thay đổi


const handleSubmit = (e) => {
    e.preventDefault();
    // So sánh đáp án và lưu kết quả vào một biến tạm thời
    const da = dataDisplay;
    console.log(da);
    console.log(answers);

    const newResults = da.map((item, index) => {
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
  //data2
  const handleData2 = () => {
    setAnswers({});
    setShowTheory(false);
    setResults([
      {
        question: null,
        userAnswer: null, // Nếu người dùng chưa chọn, hiển thị "Chưa trả lời"
        correctAnswer: null,
        isCorrect: null,
      },
    ]);
    setDataDisplay(data2);
  };

  useEffect(() => {
    randomizeData();
  }, []);
  return (
    <div style={styleContainer}>
      <h1 style={styleH1}>Final Question</h1>
      <form>
        <select
          style={{ padding: "5px 20px", margin: "10px" }}
          onChange={handleSequentially}
          value={valueSelect}
        >
          <option value="">--chương--</option>
          <option value="chuong4">Chương 4</option>
          <option value="chuong5">Chương 5</option>
          <option value="chuong6">Chương 6</option>
          <option value="chuong7">Chương 7</option>
          <option value="chuong8">Chương 8</option>
        </select>
      </form>

      <button onClick={handleRandom} style={styleRandom}>
        Random
      </button>

      <button onClick={handleData2} style={styleRandom}>
        Ôn giữa kì tham khảo các lớp khác
      </button>

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
                    checked={answers[index] === "A"}
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
                    checked={answers[index] === "B"}
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
                    checked={answers[index] === "C"}
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
                    checked={answers[index] === "D"}
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
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                  >
                    {" "}
                    Cơ sở lý thuyết:{" "}
                  </p>
                  {item.theory}
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
