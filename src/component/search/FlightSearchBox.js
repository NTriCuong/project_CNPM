import React, { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import "./style.css";
import iconswap from "../../image/Icon/HomePage/iconswap.svg";
import icon1chieu from "../../image/Icon/HomePage/icon1chieu.svg";
import icon2chieu from "../../image/Icon/HomePage/icon2chieu.svg";
import SearchItem from "./component/searchItem/SearchItem";
import InputSelect from "./component/inputSelect/InputSelect";
import vietnam from "../../image/national/vietnam.svg";
import thailand from "../../image/national/thailand.svg";
import malaysia from "../../image/national/malaysia.png";
import laos from "../../image/national/laos.png";
import indonesia from "../../image/national/indonesia.png";
import philippines from "../../image/national/philippines.png";
import cambodia from "../../image/national/cambodia.png";
import myanmar from "../../image/national/myanmar.png";
import brunei from "../../image/national/brunei.png";
import DatePickerCustom from "./component/datefield/DatePickerCustom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchData } from "../../redux/Store";
import SelectConsumer from "./component/selectConsumer/SelectConsumer";
import { searchFlight } from "../../api/axiosClient";
import { format, parse } from "date-fns";
import { appendFlightData, setFlightData } from "../../redux/searchFlightSlice";
import { useNavigate } from "react-router-dom";
import { setDataDisplay } from "../../redux/dataDisplay";
import { setIsSearch } from "../../redux/isSearch";

function FlightSearchBox({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tickerType, setTickerType] = useState(true);
  const [statusDP, setStatusDP] = useState(false);
  const [statusArP, setStatusArP] = useState(false);
  const [statusConsumer, setStatusConsumer] = useState(false);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const SelectorSearchData = useSelector(selectSearchData);
  const [weekdayText2, setWeekdayText2] = useState("");
  const inputSelectDepartureRef = useRef(null);
  const inputSelectArrivalRef = useRef(null);

  // Xử lý ngày thứ
  useEffect(() => {
    const date2 = parse(
      SelectorSearchData.arrivalDate,
      "dd-MM-yyyy",
      new Date()
    );
    const weekdayNumber2 = date2.getDay();
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    setWeekdayText2(weekdays[weekdayNumber2]);
  }, [SelectorSearchData.arrivalDate]);

  // Xử lý click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (departureRef.current && !departureRef.current.contains(event.target)) &&
        (inputSelectDepartureRef.current && !inputSelectDepartureRef.current.contains(event.target))
      ) {
        setStatusDP(false);
      }
      
      if (
        (arrivalRef.current && !arrivalRef.current.contains(event.target)) &&
        (inputSelectArrivalRef.current && !inputSelectArrivalRef.current.contains(event.target))
      ) {
        setStatusArP(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setIsSearch(true));
    
    const today = new Date();
    const departureDate = parse(
      SelectorSearchData.departureDate,
      "dd-MM-yyyy",
      new Date()
    );
    const arrivalDate = parse(
      SelectorSearchData.arrivalDate,
      "dd-MM-yyyy",
      new Date()
    );

    if (departureDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      alert("Vui lòng chọn ngày đi hợp lệ");
      return;
    }
    if (arrivalDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      alert("Vui lòng chọn ngày về hợp lệ");
      return;
    }

    if (tickerType) {
      Api();
    } else {
      Api();
      Api2();
    }
  };

  const Api = async () => {
    try {
      const response = await searchFlight.post("/", {
        departure_airport_code: SelectorSearchData.departureLocation.codeCity,
        arrival_airport_code: SelectorSearchData.arrivalLocation.codeCity,
        departure_time: format(parse(
          SelectorSearchData.departureDate,
          "dd-MM-yyyy",
          new Date()
        ), "yyyy-MM-dd"),
        ticket_classes: SelectorSearchData.ticketClasses,
        number_adults: SelectorSearchData.numberAdults,
        number_children: SelectorSearchData.numberChildren,
        number_infants: SelectorSearchData.numberInfants,
      });

      dispatch(setFlightData(response.data));
      dispatch(setDataDisplay(response.data));
      navigate("/booking");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert(error.response.data.detail);
        } else {
          alert("API lỗi. Vui lòng kiểm tra lại mạng hoặc thử lại sau.");
        }
      } else {
        alert("Không thể kết nối đến server. Vui lòng kiểm tra lại mạng.");
      }
    }
  };

  const Api2 = async () => {
    try {
      const response = await searchFlight.post("/", {
        departure_airport_code: SelectorSearchData.arrivalLocation.codeCity,
        arrival_airport_code: SelectorSearchData.departureLocation.codeCity,
        departure_time: format(parse(
          SelectorSearchData.arrivalDate,
          "dd-MM-yyyy",
          new Date()
        ), "yyyy-MM-dd"),
        ticket_classes: SelectorSearchData.ticketClasses,
        number_adults: SelectorSearchData.numberAdults,
        number_children: SelectorSearchData.numberChildren,
        number_infants: SelectorSearchData.numberInfants,
      });
      dispatch(appendFlightData(response.data));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("Không tìm thấy chuyến bay về");
        } else {
          alert("API lỗi. Vui lòng kiểm tra lại mạng hoặc thử lại sau.");
        }
      } else {
        alert("Không thể kết nối đến server. Vui lòng kiểm tra lại mạng.");
      }
    }
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
        city: "Đà Nẵng",
        codeCity: "DAD",
        airport: "Sân Bay Quốc Tế Đà Nẵng",
        national: "Viet Nam",
      },
      {
        img: thailand,
        city: "Bangkok",
        codeCity: "BKK",
        airport: "Suvarnabhumi Airport",
        national: "Thailand",
      },
      {
        img: thailand,
        city: "Chiang Mai",
        codeCity: "CNX",
        airport: "Chiang Mai International Airport",
        national: "Thailand",
      },
      {
        img: malaysia,
        city: "Kuala Lumpur",
        codeCity: "KUL",
        airport: "Kuala Lumpur International Airport",
        national: "Malaysia",
      },
      {
        img: malaysia,
        city: "Penang",
        codeCity: "PEN",
        airport: "Penang International Airport",
        national: "Malaysia",
      },
      {
        img: vietnam,
        city: "Singapore",
        codeCity: "SIN",
        airport: "Changi International Airport",
        national: "Singapore",
      },
      {
        img: indonesia,
        city: "Jakarta",
        codeCity: "CGK",
        airport: "Soekarno-Hatta International Airport",
        national: "Indonesia",
      },
      {
        img: indonesia,
        city: "Denpasar (Bali)",
        codeCity: "DPS",
        airport: "Ngurah Rai International Airport",
        national: "Indonesia",
      },
      {
        img: philippines,
        city: "Manila",
        codeCity: "MNL",
        airport: "Ninoy Aquino International Airport",
        national: "Philippines",
      },
      {
        img: philippines,
        city: "Cebu",
        codeCity: "CEB",
        airport: "Mactan-Cebu International Airport",
        national: "Philippines",
      },
      {
        img: cambodia,
        city: "Phnom Penh",
        codeCity: "PNH",
        airport: "Phnom Penh International Airport",
        national: "Cambodia",
      },
      {
        img: cambodia,
        city: "Siem Reap",
        codeCity: "REP",
        airport: "Siem Reap International Airport",
        national: "Cambodia",
      },
      {
        img: laos,
        city: "Vientiane",
        codeCity: "VTE",
        airport: "Wattay International Airport",
        national: "Laos",
      },
      {
        img: laos,
        city: "Luang Prabang",
        codeCity: "LPQ",
        airport: "Luang Prabang International Airport",
        national: "Laos",
      },
      {
        img: myanmar,
        city: "Yangon",
        codeCity: "RGN",
        airport: "Yangon International Airport",
        national: "Myanmar",
      },
      {
        img: myanmar,
        city: "Naypyidaw",
        codeCity: "NYT",
        airport: "Naypyidaw International Airport",
        national: "Myanmar",
      },
      {
        img: brunei,
        city: "Bandar Seri Begawan",
        codeCity: "BWN",
        airport: "Brunei International Airport",
        national: "Brunei",
      },
    ],
  };

  const handlePoint = () => {
    setStatusDP(!statusDP);
  };

  const handleArP = () => {
    setStatusArP(!statusArP);
  };

  const handleConsumer = () => {
    setStatusConsumer(!statusConsumer);
  };

  // Lấy thứ ngày đi
  const date = parse(
    SelectorSearchData.departureDate,
    "dd-MM-yyyy",
    new Date()
  );
  const weekdayNumber = date.getDay();
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const weekdayText = weekdays[weekdayNumber];

  return (
    <div className="home-container">
      <div className={`searchBox ${className}`}>
        <form className="flight-search" onSubmit={handleSubmit}>
          <div className="top">
            <Button
              text={
                <>
                  <img src={icon1chieu} alt="icon one way" className="icon" />
                  <pre className="pre-text"> Một Chiều</pre>
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
                  <img src={icon2chieu} alt="icon round trip" className="icon" />
                  <pre className="pre-text"> Khứ Hồi</pre>
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
                  <div> {SelectorSearchData.departureLocation.city}</div>
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
                      ref={inputSelectDepartureRef}
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
                  <div> {SelectorSearchData.arrivalLocation.city}</div>
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
                      ref={inputSelectArrivalRef}
                      className={`bottom-left-r ${
                        statusArP ? "input-select" : "select-none"
                      }`}
                      data={data}
                      flag={false}
                    />
                  </div>
                }
              />
              <img className="icon-swap" src={iconswap} alt="swap icon" />
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
                      style={{ fontSize: "12px", padding: "3px" }}
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