import React, { useState } from "react";
import "./DateSelector.css";

const generateNextDays = (numDays) => {
  const daysOfWeek = [
    "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
  ];
  
  const result = [];
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayName = daysOfWeek[nextDate.getDay()];
    const dateStr = nextDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit"
    });

    result.push({
      day: dayName,
      date: dateStr,
    });
  }

  return result;
};

const DateSelector = () => {
  const dates = generateNextDays(5);
  const [selectedDate, setSelectedDate] = useState(dates[0].date); // chọn mặc định là hôm nay

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
