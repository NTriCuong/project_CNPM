import React, { useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // css mặc định của date picker
import "./style.css";
import vi from "date-fns/locale/vi"; // tiếng Việt
import { format } from "date-fns";
import iconCalender from"../../../../image/Icon/HomePage/calendarIcon.svg"
import { useDispatch } from "react-redux";
import { updateArrivalDate, updateDepartureDate } from "../../../../redux/searchDataClice";
const DatePickerCustom = ({flag}) => {//true ngay di false ngay ve
  const [selectedDate, setSelectedDate] = useState(new Date());
  const Dispath = useDispatch();
  const datePickerRef = useRef(); // 👈 ref để truy cập input của DatePicker

  const openDatePicker = () => {
    datePickerRef.current.setFocus(); // hoặc dùng .input.click() nếu không được
  };
  useEffect(()=>{
    if(flag)//ngay di
      Dispath(updateDepartureDate(selectedDate))
    else  
      Dispath(updateArrivalDate(selectedDate))
  },[selectedDate])
  registerLocale("vi", vi); // đăng ký locale
  return (
    <div className="date-picker-customy">
        <img src={iconCalender} alt="calender" onClick={openDatePicker}/>
      <DatePicker
        ref={datePickerRef}
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
