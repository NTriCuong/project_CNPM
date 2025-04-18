import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // css mặc định của date picker
import "./style.css";
import vi from "date-fns/locale/vi"; // tiếng Việt
import { format } from "date-fns";
import iconCalender from"../../../../image/Icon/HomePage/calendarIcon.svg"
const DatePickerCustom = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  registerLocale("vi", vi); // đăng ký locale
  return (
    <div className="date-picker-customy">
        <img src={iconCalender} alt="calender"/>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd-MM-yyyy"
        placeholderText={format(new Date(), "dd-MM-yyyy")}
        locale="vi"
        onKeyDown={(e) => e.preventDefault()}x
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default DatePickerCustom;
