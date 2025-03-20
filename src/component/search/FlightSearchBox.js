import React, { useState } from "react";
import Button from "../button/Button";
import "./style.css";
import icon1chieu from "../../image/Icon/HomePage/icon1chieu.svg";
import icon2chieu from "../../image/Icon/HomePage/icon2chieu.svg";
import SearchItem from "./component/searchItem/SearchItem";
import InputSelect from "./component/inputSelect/InputSelect";

function FlightSearchBox({ className }) {
  const [tickerType, setTickerType] = useState(true);
  const [departurePoint, setDeparturePoint] = useState({
    city: "Hà Nội",
    codeCity: "HN",
    airport: "Sân Bay Quốc Tế Nội Bài",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload trang
    console.log("ban da bam submit");
  };
  // data tạm test giao diện input select
  const data = {
    recentSearches: {
      // tim kim gan day
      city: "Hà Nội",
      codeCity: "HN",
      airport: "Sân Bay Quốc Tế Nội Bài",
    },
    popular: [
      // thanh pho pho bien
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
      {
        city: "Hà Nội",
        codeCity: "HN",
        airport: "Sân Bay Quốc Tế Nội Bài",
      },
    ],
  };
  return (
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
            onClick={() => {
              setTickerType(true);
            }}
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
            onClick={() => {
              setTickerType(false);
            }}
            type="button"
          />
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <SearchItem
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
          </div>
          <div className="bottom-right">right</div>
          <Button text="Tìm Chuyến Bay" type="submit" className="bottom-item" />
        </div>
      </form>
    </div>
  );
}
export default FlightSearchBox;
