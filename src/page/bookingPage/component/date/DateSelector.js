import React, { useEffect, useState } from "react";
import "./DateSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchFlight } from "../../../../redux/Store";
import { setDataDisplay } from "../../../../redux/dataDisplay";

const generateNextDays = (numDays) => {
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const result = [];
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayName = daysOfWeek[nextDate.getDay()];
    const isoDate = nextDate.toISOString().split("T")[0]; // "yyyy-MM-dd"
    const displayDate = nextDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }); // "dd-MM" để hiển thị

    result.push({
      day: dayName,
      date: isoDate, // dùng để lọc
      displayDate: displayDate, // dùng để hiển thị
    });
  }

  return result;
};

const DateSelector = () => {
  const dates = generateNextDays(5);
  const searchData = useSelector(selectSearchFlight);
  const [selectedDate, setSelectedDate] = useState(dates[0].date); // chọn mặc định là hôm nay
  const Dispath = useDispatch();
  const getDateOnly = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // Chỉ lấy phần ngày "yyyy-MM-dd"
  };

  useEffect(() => {
    if (!Array.isArray(searchData)) return;

    if (!selectedDate || isNaN(new Date(selectedDate))) {
      console.warn("selectedDate bị sai định dạng:", selectedDate);
      return;
    }

    const filteredFlights = searchData.filter((flight) => {
      const flightDateStr = getDateOnly(flight.departure_time); // Đảm bảo flight.departure_time có định dạng "yyyy-MM-dd"

      // Chỉ so sánh phần ngày của flight và selectedDate (không có giờ)
      return flightDateStr === selectedDate;
    });

    console.log("Filtered flights:", filteredFlights);
    Dispath(setDataDisplay(filteredFlights));
  }, [selectedDate]);

  return (
    <div className="date-selector">
      {dates.map((item) => (
        <div
          key={item.date}
          className={`date-item ${
            selectedDate === item.date ? "selected" : ""
          }`}
          onClick={() => setSelectedDate(item.date)}
        >
          <div className="day">{item.day}</div>
          <div className="date">{item.displayDate}</div>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
