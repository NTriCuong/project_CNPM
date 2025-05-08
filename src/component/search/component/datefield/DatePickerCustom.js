import React, { useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // css mặc định của date picker
import "./style.css";
import vi from "date-fns/locale/vi"; // tiếng Việt
import { format, parse } from "date-fns";
import iconCalender from "../../../../image/Icon/HomePage/calendarIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  updateArrivalDate,
  updateDepartureDate,
} from "../../../../redux/searchDataClice";
import { selectSearchData } from "../../../../redux/Store";
const DatePickerCustom = ({ flag }) => {
  //true ngay di false ngay ve
  const selectDatasearch = useSelector(selectSearchData);
  const [selectedDate, setSelectedDate] = useState(() => {
    const dateString = flag
      ? selectDatasearch.departureDate
      : selectDatasearch.arrivalDate;
  
    // Sử dụng parse để chuyển đổi chuỗi thành Date object
    return parse(dateString, "dd-MM-yyyy", new Date());
  });
  const Dispath = useDispatch();
  const datePickerRef = useRef(); // ref để truy cập input của DatePicker

  const openDatePicker = () => {
    datePickerRef.current.setFocus(); // hoặc dùng .input.click() nếu không được
  };
  useEffect(() => {
    if (flag)
      //ngay di
      Dispath(updateDepartureDate(format(new Date(selectedDate), "dd-MM-yyyy")));
    else Dispath(updateArrivalDate(format(new Date(selectedDate), "dd-MM-yyyy")));
  }, [selectedDate]);
  registerLocale("vi", vi); // đăng ký locale
  return (
    <div className="date-picker-customy">
      <img src={iconCalender} alt="calender" onClick={openDatePicker} />
      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          const formattedDate = format(date, "dd-MM-yyyy");
          if (flag) {
            Dispath(updateDepartureDate(formattedDate));
          } else {
            Dispath(updateArrivalDate(formattedDate));
          }
        }}
        dateFormat="dd-MM-yyyy"
        locale="vi"
        onKeyDown={(e) => e.preventDefault()}
        x
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default DatePickerCustom;
