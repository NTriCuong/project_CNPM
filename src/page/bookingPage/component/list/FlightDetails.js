import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchFlight } from "../../../../redux/Store";

// const flights = [
//   {
//   
//     logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-Bamboo-Airways.png",
//  
//   },
//   {
//     id: 2,
//     airline: "Vietjet Air",
//     logo: "https://seeklogo.com/images/V/vietjet-aviation-logo-A823494846-seeklogo.com.png",
//     flightCode: "VJ198",
//     departureTime: "05:20",
//     departureCode: "SGN",
//     arrivalTime: "07:30",
//     arrivalCode: "HAN",
//     duration: "2h 10m",
//     price: 1953800,
//     airlineClass: "Bay thẳng",
//   },
//   {
//     id: 3,
//     airline: "Bamboo Airways",
//     logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-Bamboo-Airways.png",
//     flightCode: "QH204",
//     departureTime: "07:35",
//     departureCode: "SGN",
//     arrivalTime: "09:45",
//     arrivalCode: "HAN",
//     duration: "2h 10m",
//     price: 2083000,
//     airlineClass: "Bay thẳng",
//   },
//   {
//     id: 4,
//     airline: "Vietjet Air",
//     logo: "https://seeklogo.com/images/V/vietjet-aviation-logo-A823494846-seeklogo.com.png",
//     flightCode: "VJ120",
//     departureTime: "06:00",
//     departureCode: "SGN",
//     arrivalTime: "08:10",
//     arrivalCode: "HAN",
//     duration: "2h 10m",
//     price: 2126600,
//     airlineClass: "Bay thẳng",
//   },
// ];

const calculateFlightDuration = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const diffMs = arrival - departure; // chênh lệch mili giây
  const diffMins = Math.floor(diffMs / 60000); // đổi sang phút

  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  return `${hours} giờ ${minutes} phút`;
};

const formatTimeToHourMinute = (isoString) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const logoVJ = "https://seeklogo.com/images/V/vietjet-aviation-logo-A823494846-seeklogo.com.png";



const FlightDetails = () => {
  const [searchFlightData, setSearchFlight] = useState([]);
  const searchData = useSelector(selectSearchFlight);
  // const Dispath = useDispatch();
  useEffect(() => {
    setSearchFlight(searchData);
  }, [searchFlightData]);
console.log("KO KO KO",searchFlightData)
  return (
    <div className="flight-list">
      {searchFlightData.map((flight) => (
        <div className="flight-card">
          <div className="flight-info">
            <div className="airline">
              <img
                src={logoVJ}
                alt={flight.airline_name}
                className="airline-logo"
              />
              <span className="airline-name">
                {flight.airline_name} - {flight.flight_number}
              </span>
            </div>
            <div className="time-info">
              <div className="departure">
                <span className="time">{formatTimeToHourMinute(flight.departure_time)}</span>
                <span className="code">{flight.departure_airport}</span>
              </div>
              <div className="arrow">⟶</div>
              <div className="arrival">
                <span className="time">{formatTimeToHourMinute(flight.arrival_time)}</span>
                <span className="code">{flight.arrival_airport}</span>
              </div>
            </div>
            <div className="flight-duration">
              <span>
                {calculateFlightDuration(
                  flight.departure_time,
                  flight.arrival_time
                )}
              </span>
              <span className="flight-class">Economy</span>
            </div>
            <div className="price">
              <span>{flight.total_price} VND</span>
              <span className="price-child">Tổng thành tiền</span>
            </div>
          </div>
          <div className="flight-details">
            <button className="detail-button">∨ Chi tiết</button>
            <button className="book-button">CHỌN</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightDetails;
