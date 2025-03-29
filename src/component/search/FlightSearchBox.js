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
  const [departuredate, setDepartureDate] = useState({
    date: "02-05-2024",
    airport: "Thứ 3",
  });
  const [returndate, setReturnDate] = useState({
    date: "Chọn Ngày",
    airport: "Đặt chuyến khứ hồi",
  });
  const [customersandseats, setCustomerAndSeats] = useState({
    date: "03 Hành Khách", 
    airport: "Premium Economy"
  });
  const [errorMessage, setErrorMessage] = useState(""); 

  // Discover destinations data
  const discoverDestinations = [
    {
      id: 1,
      name: "Glenfinn viaduct",
      location: "United Kingdom",
      image: "/path/to/unsplash_itM5EI3VnOk.jpg"
    },
    {
      id: 2,
      name: "Linh Sơn Bưu",
      location: "Vietnam",
      image: "/path/to/linh-son-bu-image.jpg"
    },
    {
      id: 3,
      name: "Ginos Baiern",
      location: "Germany",
      image: "/path/to/ginos-baiern-image.jpg"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!departurePoint.city || !arrivalPoint.city || !departuredate.date) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

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
              className={tickerType === true ? "top-item top-item-click" : "top-item"}
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
              className={tickerType === false ? "top-item top-item-click" : "top-item"}
              onClick={() => setTickerType(false)}
              type="button"
            />
          </div>
          <div className="bottom">
            <SearchItem
              textTop="Điểm Khởi Hành"
              textCenter={departurePoint.city}
              textBottom={
                <div style={{ position: "relative" }}>
                  <span style={{ color: "#233A60", fontWeight: "bold", fontFamily: "poppins, sans-serif" }}>
                    {departurePoint.codeCity}
                  </span>
                  {departurePoint.airport}
                  <InputSelect className="bottom-left-r input-select" data={data} />
                </div>
              }
            />
            <img src={iconswap} alt="Swap Icon" width={450} height={30} style={{ cursor: "pointer", position: "absolute", zIndex: 10 }} />
            <div className="divider"></div>
            <SearchItem
              textTop="Điểm đến"
              textCenter={arrivalPoint.city}
              textBottom={
                <div style={{ position: "relative" }}>
                  <span style={{ color: "#233A60", fontWeight: "bold", fontFamily: "poppins, sans-serif" }}>
                    {arrivalPoint.codeCity}
                  </span>
                  {arrivalPoint.airport}
                  <InputSelect className="bottom-left-r input-select" data={data} />
                </div>
              }
            />
            <SearchItem
              textTop="Ngày đi"
              textCenter={departuredate.date}
              textBottom={
                <div style={{ position: "relative" }}>
                  <span style={{ color: "#233A60", fontWeight: "bold", fontFamily: "poppins, sans-serif" }}>
                    {departuredate.code}
                  </span>
                  {departuredate.airport}
                  <InputSelect className="bottom-right-r input-select" data={data} />
                </div>
              }
            />
            
            <SearchItem
              textTop="Ngày về"
              textCenter={returndate.date}
              textBottom={
                <div style={{ position: "relative" }}>
                  <span style={{ color: "#233A60", fontWeight: "bold", fontFamily: "poppins, sans-serif" }}>
                    {returndate.code}
                  </span>
                  {returndate.airport}
                  <InputSelect className="bottom-right-r input-select" data={data} />
                </div>
              }
            />
            <SearchItem
              textTop="Khách hàng & hạng ghế"
              textCenter={customersandseats.date}
              textBottom={
                <div style={{ position: "relative" }}>
                  <span style={{ color: "#233A60", fontWeight: "bold", fontFamily: "poppins, sans-serif" }}>
                    {customersandseats.code}
                  {customersandseats.airport}
                  <InputSelect className="bottom-right-r input-select" data={data} />
                </div>
              }
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Button text="Tìm Chuyến Bay" type="submit" className="bottom-item" />
        </form>
      </div>

      {/* Khám Phá Section */}
      <div className="discover-section">
        <h2 className="discover-title">Khám Phá</h2>
        <div className="discover-destinations">
          {discoverDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <button className="go-button">GO</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlightSearchBox;