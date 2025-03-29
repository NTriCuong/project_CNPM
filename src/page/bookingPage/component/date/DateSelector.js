import React, { useState } from "react";
import "./DateSelector.css";

const DateSelector = () => {
  const dates = [
    { day: "Thứ 7", date: "08/03" },
    { day: "Chủ nhật", date: "09/03" },
    { day: "Thứ 2", date: "10/03" },
    { day: "Thứ 3", date: "11/03" },
    { day: "Thứ 4", date: "12/03" },
    { day: "Thứ 5", date: "13/03" },
    { day: "Thứ 6", date: "14/03" },
  ];

  const [selectedDate, setSelectedDate] = useState("09/03");

  return (
    <div className="date-selector">
      {dates.map((item) => (
        <div
          key={item.date}
          className={`date-item ${selectedDate === item.date ? "selected" : ""}`}
          onClick={() => setSelectedDate(item.date)}
        >
          <div className="day">{item.day}</div>
          <div className="date">{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
