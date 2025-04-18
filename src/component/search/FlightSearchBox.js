import React, { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import "./style.css";
import iconswap from "../../image/Icon/HomePage/iconswap.svg";
import icon1chieu from "../../image/Icon/HomePage/icon1chieu.svg";
import icon2chieu from "../../image/Icon/HomePage/icon2chieu.svg";
import SearchItem from "./component/searchItem/SearchItem";
import InputSelect from "./component/inputSelect/InputSelect";
import thailand from "../../image/national/thailand.svg"
import DatePickerCustom from "./component/datefield/DatePickerCustom";

function FlightSearchBox({ className }) {
  const [tickerType, setTickerType] = useState(true);
  // trạng thái người dùng đang nhấn vào field chọn điểm đến và điểm đi hay chưa
  const [statusDP, setStatusDP] = useState(false);
  const [statusArP, setStatusArP] = useState(false);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);

  const [departurePoint, setDeparturePoint] = useState({
    city: "Hà Nội",
    codeCity: "[HN]",
    airport: "Sân Bay Quốc Tế Nội Bài",
  });
  const [arrivalPoint, setArrivalPoint] = useState({
    city: "TP. Hồ Chí Minh",
    codeCity: "[SGN]",
    airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Đã bấm submit");

  };

  const data = {
    recentSearches: {
      img:thailand,
      city: "Hà Nội",
      codeCity: "HN",
      airport: "Sân Bay Quốc Tế Nội Bài",
      national:"Viet Nam"
    },
    popular: [
      {
        img:thailand,
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national:"Viet Nam"
      },
      {
        img:thailand,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national:"Viet Nam"
      }, {
        img:thailand,
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national:"Viet Nam"
      },
      {
        img:thailand,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national:"Viet Nam"
      }, {
        img:thailand,
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
        national:"Viet Nam"
      },
      {
        img:thailand,
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
        national:"Viet Nam"
      },
    ],
  };

  // click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu click không nằm trong vùng departure
      if (departureRef.current && !departureRef.current.contains(event.target)) {
        setStatusDP(false);
      }
  
      // Nếu click không nằm trong vùng arrival
      if (arrivalRef.current && !arrivalRef.current.contains(event.target)) {
        setStatusArP(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handlePoint=()=>{
    setStatusDP(true);
  }
  const handleArP=()=>{
    setStatusArP(true);
  }
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
                className='field'
                textTop="Điểm Khởi Hành"
                textCenter={<div onClick={handlePoint}> {departurePoint.city}</div>}
                textBottom={
                  <div ref={departureRef} style={{ position: "relative" }}>
                    <span
                      style={{
                        color: "#233A60",
                        fontWeight: "bold",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      {departurePoint.codeCity}
                    </span>
                    {departurePoint.airport}
                    <InputSelect
                      className={`bottom-left-r ${statusDP?"input-select":"select-none"}`}
                      data={data}
                    />
                  </div>
                }
              />
              <SearchItem
                className='field'
                textTop="Điểm đến"
                textCenter={<div onClick={handleArP}> {arrivalPoint.city}</div>}
                textBottom={
                  <div ref={arrivalRef} style={{ position: "relative" }}>
                    <span
                      style={{
                        color: "#233A60",
                        fontWeight: "bold",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      {arrivalPoint.codeCity}
                    </span>
                    {arrivalPoint.airport}
                    <InputSelect
                      className={`bottom-left-r ${statusArP?"input-select":"select-none"}`}
                      data={data}
                    />
                  </div>
                }
              />
              <div />
              <img className="icon-swap" src={iconswap} />
            </div>
            <div className="right-field">
            <SearchItem
                className='field'
                textTop="Ngày đi"
                textCenter ={<DatePickerCustom  />}
                textBottom="Thứ 2"
              />
              <SearchItem
                className='field'
                textTop="Ngày về"
                textCenter ={<DatePickerCustom />}
                textBottom="Chuyến khứ hồi"
              />
              <SearchItem
                className='field'
                textTop="Hành Khách"
                textCenter="1 Hành khách"
                textBottom="Premium economy"
              />
            </div>
            <Button text="Tìm Chuyến Bay" type="submit" className="bottom-item" />
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default FlightSearchBox;
