import React, { useEffect, useState } from "react";
import "./DateSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchData, selectSearchFlight } from "../../../../redux/Store";
import { setDataDisplay } from "../../../../redux/dataDisplay";

const generateNextDays = (numDays, startDate = new Date()) => {
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

  for (let i = 0; i < numDays; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    nextDate.setHours(0, 0, 0, 0); // Reset giờ tránh lỗi timezone

    const dayName = daysOfWeek[nextDate.getDay()];
    const isoDate = `${nextDate.getFullYear()}-${String(
      nextDate.getMonth() + 1
    ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;

    const displayDate = nextDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }); // dd-MM

    result.push({
      day: dayName,
      date: isoDate,
      displayDate,
    });
  }

  return result;
};

const getDateFromString = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(+year, +month - 1, +day);
  date.setHours(0, 0, 0, 0); // Reset giờ về 00:00:00
  return date;
};

const DateSelector = () => {
  const searchData = useSelector(selectSearchFlight);
  const searchDataState = useSelector(selectSearchData);
  const dispatch = useDispatch();

  // Ngày bắt đầu (startDate) lấy từ Redux hoặc ngày hôm nay
  const startDate = searchDataState?.departureDate
    ? getDateFromString(searchDataState.departureDate)
    : (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      })();

  const dates = generateNextDays(5, startDate);

  const [selectedDate, setSelectedDate] = useState(dates[0].date);

  useEffect(() => {
    // Cập nhật lại selectedDate khi ngày trong redux thay đổi
    setSelectedDate(dates[0].date);
  }, [startDate.toISOString()]);

  const getDateOnly = (dateStrOrDate) => {
    const d = new Date(dateStrOrDate);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!Array.isArray(searchData)) return;

    const filteredFlights = searchData.filter((flight) => {
      const flightDate = getDateOnly(flight.departure_time);
      return flightDate === selectedDate;
    });

    dispatch(setDataDisplay(filteredFlights));
  }, [selectedDate, searchData, dispatch]);
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
