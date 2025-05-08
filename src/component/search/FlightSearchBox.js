import React, { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import "./style.css";
import iconswap from "../../image/Icon/HomePage/iconswap.svg";
import icon1chieu from "../../image/Icon/HomePage/icon1chieu.svg";
import icon2chieu from "../../image/Icon/HomePage/icon2chieu.svg";
import SearchItem from "./component/searchItem/SearchItem";
import InputSelect from "./component/inputSelect/InputSelect";
import vietnam from "../../image/national/vietnam.svg";
import DatePickerCustom from "./component/datefield/DatePickerCustom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchData } from "../../redux/Store";
import SelectConsumer from "./component/selectConsumer/SelectConsumer";
import { searchFlight } from "../../api/axiosClient";
import { format, parse } from "date-fns";
import { setFlightData } from "../../redux/searchFlightSlice";
import { useNavigate } from 'react-router-dom';



function FlightSearchBox({ className }) {
  const navigate = useNavigate()
  const Dispath = useDispatch(); // dẩy dữa liệu lên
  const [tickerType, setTickerType] = useState(true);
  // trạng thái người dùng đang nhấn vào field chọn điểm đến và điểm đi hay chưa
  const [statusDP, setStatusDP] = useState(false);
  const [statusArP, setStatusArP] = useState(false);
  const [statusConsumer, setStatusConsumer] = useState(false);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  // dữ liệu điểm khởi hành
  const SelectorSearchData = useSelector(selectSearchData);
  const [weekdayText2, setWeekdayText2] = useState("");

  useEffect(() => {
    setStatusDP(false);
    setStatusArP(false);
    setStatusConsumer(false);
  }, [SelectorSearchData]);

  useEffect(() => {
    const date2 = parse(SelectorSearchData.arrivalDate, "dd-MM-yyyy", new Date());
    const weekdayNumber2 = date2.getDay();
    const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    setWeekdayText2(weekdays[weekdayNumber2]);
  }, [SelectorSearchData.arrivalDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Api();
  };
  const data = {
    recentSearches: {
      img: vietnam,
      city: "Hà Nội",
      codeCity: "HAN",
      airport: "Sân Bay Quốc Tế Nội Bài",
      national: "Viet Nam",
    },
    popular: [
      {
        img: vietnam,
        city: "Hà Nội",
        codeCity: "HAN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national: "Viet Nam",
      },
      {
        img: vietnam,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national: "Viet Nam",
      },
      {
        img: vietnam,
        city: "Hà Nội",
        codeCity: "HAN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national: "Viet Nam",
      },
      {
        img: vietnam,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national: "Viet Nam",
      },
      {
        img: vietnam,
        city: "Hà Nội",
        codeCity: "HAN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national: "Viet Nam",
      },
      {
        img: vietnam,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national: "Viet Nam",
      },
    ],
  };
  //GOI API
  const Api = async () => {
    // console.log("SelectorSearchData.departureDate", SelectorSearchData.departureDate);
    // console.log("SelectorSearchData.arrivalDate", format(SelectorSearchData.departureDate, 'yyyy-MM-dd'));
    try {
      const response = await searchFlight.post("/", {
        departure_airport_code: SelectorSearchData.departureLocation.codeCity,
        arrival_airport_code: SelectorSearchData.arrivalLocation.codeCity,
        departure_time: format(SelectorSearchData.departureDate, 'yyyy-MM-dd'),
        ticket_classes: SelectorSearchData.ticketClasses,
        number_adults: SelectorSearchData.numberAdults,
        number_children: SelectorSearchData.numberChildren,
        number_infants: SelectorSearchData.numberInfants,
      });
      console.log("API response:", response.data);
      Dispath(setFlightData(response.data));// ép kiểu an toàn));
      navigate("/booking");
    } catch (error) {
      console.log("LOI", error);
    }
  };

  // click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu click không nằm trong vùng departure
      if (
        departureRef.current &&
        !departureRef.current.contains(event.target)
      ) {
        setStatusDP(false);
      }
      // Nếu click không nằm trong vùng arrival
      if (arrivalRef.current && !arrivalRef.current.contains(event.target)) {
        setStatusArP(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePoint = () => {
    setStatusDP(!statusDP);
  };
  const handleArP = () => {
    setStatusArP(!statusArP);
  };
  const handleConsumer = () => {
    setStatusConsumer(!statusConsumer);
  };

// Thứ trong lịch bay đi
const date = parse(SelectorSearchData.departureDate, "dd-MM-yyyy", new Date());
// Lấy thứ (0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy)
const weekdayNumber = date.getDay();
const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const weekdayText = weekdays[weekdayNumber];

  return (
    <div className="home-container">
      <div className={`searchBox ${className}`}>
        <form className="flight-search" onSubmit={handleSubmit}>
          <div className="top">
            <Button
              text={
                <>
                  <img src={icon1chieu} alt="icon" className="icon" />
                  <pre style={{ fontFamily: "inherit" }}> Một Chiều</pre>
                </>
              }
              className={
                tickerType === true ? "top-item top-item-click" : "top-item"
              }
              onClick={() => setTickerType(true)}
              type="button"
            />
            <Button
              text={
                <>
                  <img src={icon2chieu} alt="icon" className="icon" />
                  <pre style={{ fontFamily: "inherit" }}> Khứ Hồi</pre>
                </>
              }
              className={
                tickerType === false ? "top-item top-item-click" : "top-item"
              }
              onClick={() => setTickerType(false)}
              type="button"
            />
          </div>
          <div className="bottom">
            <div className="left-field">
              <SearchItem
                onClick={handlePoint}
                className="field"
                textTop="Điểm Khởi Hành"
                textCenter={
                  <div >
                    {" "}
                    {SelectorSearchData.departureLocation.city}
                  </div>
                }
                textBottom={
                  <div ref={departureRef} style={{ position: "relative" }}>
                    <span
                      style={{
                        color: "#233A60",
                        fontWeight: "bold",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      [{SelectorSearchData.departureLocation.codeCity}]
                    </span>
                    {SelectorSearchData.departureLocation.airport}
                    <InputSelect
                      className={`bottom-left-r ${
                        statusDP ? "input-select" : "select-none"
                      }`}
                      data={data}
                      flag={true}
                    />
                  </div>
                }
              />
              <SearchItem
                onClick={handleArP}
                className="field"
                textTop="Điểm đến"
                textCenter={
                  <div >
                    {" "}
                    {SelectorSearchData.arrivalLocation.city}
                  </div>
                }
                textBottom={
                  <div ref={arrivalRef} style={{ position: "relative" }}>
                    <span
                      style={{
                        color: "#233A60",
                        fontWeight: "bold",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      [{SelectorSearchData.arrivalLocation.codeCity}]
                    </span>
                    {SelectorSearchData.arrivalLocation.airport}
                    <InputSelect
                      className={`bottom-left-r ${
                        statusArP ? "input-select" : "select-none"
                      }`}
                      data={data}
                      flag={false}
                    />
                  </div>
                }
              />
              <div />
              <img className="icon-swap" src={iconswap} />
            </div>
            <div className="right-field">
              <SearchItem
                className="field"
                textTop="Ngày đi"
                textCenter={<DatePickerCustom flag={true} />}
                textBottom={weekdayText}
              />
              <SearchItem
                className="field"
                textTop="Ngày về"
                textCenter={<DatePickerCustom flag={false} />}
                textBottom={weekdayText2} 
              />
              <SearchItem
                className="field"
                textTop="Hành Khách"
                textCenter={
                  <div className="select-consummer">
                    <div
                      onClick={handleConsumer}
                      style={{ fontSize: "13px", padding: "2px" }}
                    >
                      {SelectorSearchData.numberAdults +
                        SelectorSearchData.numberChildren +
                        SelectorSearchData.numberInfants}{" "}
                      Hành Khách
                    </div>
                    <SelectConsumer
                      on={handleConsumer}
                      className={
                        statusConsumer
                          ? "select-consummer-show"
                          : "select-consummer-none"
                      }
                    />
                  </div>
                }
                textBottom={SelectorSearchData.ticketClasses}
              />
            </div>
            <Button
              text="Tìm Chuyến Bay"
              type="submit"
              className="bottom-item"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlightSearchBox;
