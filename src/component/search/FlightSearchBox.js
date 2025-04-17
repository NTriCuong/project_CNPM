import React, { useState } from "react";
import Button from "../button/Button";
import "./style.css";
import iconswap from "../../image/Icon/HomePage/iconswap.svg";
import icon1chieu from "../../image/Icon/HomePage/icon1chieu.svg";
import icon2chieu from "../../image/Icon/HomePage/icon2chieu.svg";
import SearchItem from "./component/searchItem/SearchItem";
import InputSelect from "./component/inputSelect/InputSelect";

function FlightSearchBox({ className }) {
  const [tickerType, setTickerType] = useState(true);
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
  const [errorMessage, setErrorMessage] = useState("");

  // Discover destinations data

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Đã bấm submit");
    setErrorMessage("");

    // Here you can add API call to fetch flight data based on user input
  };

  const data = {
    recentSearches: {
      city: "Hà Nội",
      codeCity: "HN",
      airport: "Sân Bay Quốc Tế Nội Bài",
    },
    popular: [
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "TP. Hồ Chí Minh",
        codeCity: "SGN",
        airport: "Sân Bay Quốc Tế Tân Sơn Nhất",
      },
    ],
  };

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
                textCenter={departurePoint.city}
                textBottom={
                  <div style={{ position: "relative" }}>
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
                      className="bottom-left-r input-select"
                      data={data}
                    />
                  </div>
                }
              />
              <SearchItem
                className='field'
                textTop="Điểm đến"
                textCenter={arrivalPoint.city}
                textBottom={
                  <div style={{ position: "relative" }}>
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
                      className="bottom-left-r input-select"
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
                textCenter="1-1-2025"
                textBottom="Thứ 2"
              />
              <SearchItem
                className='field'
                textTop="Ngày về"
                textCenter="Chọn ngày"
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
