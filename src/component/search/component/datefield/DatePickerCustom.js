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
   if (datePickerRef.current && datePickerRef.current.input) {
    datePickerRef.current.input.click();
  }
  };
  useEffect(() => {
    const dateString = flag
      ? selectDatasearch.departureDate
      : selectDatasearch.arrivalDate;

    const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
    setSelectedDate(parsedDate);
  }, [selectDatasearch.departureDate, selectDatasearch.arrivalDate]);

  registerLocale("vi", vi); // đăng ký locale

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{
        fontSize: "12px",
        backgroundColor: "#fff",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {value || "Chọn ngày"}
    </div>
  ));

  return (
    <div className="date-picker-customy">
      <img src={iconCalender} alt="calender" onClick={openDatePicker} />
      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date) => {
          const formattedDate = format(date, "dd-MM-yyyy");

          if (!flag) {
            // Đang chọn ngày về → kiểm tra nếu nhỏ hơn ngày đi thì báo lỗi
            const departure = parse(
              selectDatasearch.departureDate,
              "dd-MM-yyyy",
              new Date()
            );
            if (date < departure) {
              alert("Ngày về không được nhỏ hơn ngày đi.");
              return;
            }
          }

          setSelectedDate(date);

          if (flag) {
            Dispath(updateDepartureDate(formattedDate));
          } else {
            Dispath(updateArrivalDate(formattedDate));
          }
        }}
        dateFormat="dd-MM-yyyy"
        locale="vi"
        onKeyDown={(e) => e.preventDefault()}
        customInput={<CustomInput />}
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default DatePickerCustom;
