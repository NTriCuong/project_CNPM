import React from "react";
import "./FlightDetails.css";

const flights = [
  {
    id: 1,
    airline: "Bamboo Airways",
    logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-Bamboo-Airways.png",
    flightCode: "QH202",
    departureTime: "05:10",
    departureCode: "SGN",
    arrivalTime: "07:20",
    arrivalCode: "HAN",
    duration: "2h 10m",
    price: 1889000,
    airlineClass: "Bay thẳng",
  },
  {
    id: 2,
    airline: "Vietjet Air",
    logo: "https://seeklogo.com/images/V/vietjet-aviation-logo-A823494846-seeklogo.com.png",
    flightCode: "VJ198",
    departureTime: "05:20",
    departureCode: "SGN",
    arrivalTime: "07:30",
    arrivalCode: "HAN",
    duration: "2h 10m",
    price: 1953800,
    airlineClass: "Bay thẳng",
  },
  {
    id: 3,
    airline: "Bamboo Airways",
    logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-Bamboo-Airways.png",
    flightCode: "QH204",
    departureTime: "07:35",
    departureCode: "SGN",
    arrivalTime: "09:45",
    arrivalCode: "HAN",
    duration: "2h 10m",
    price: 2083000,
    airlineClass: "Bay thẳng",
  },
  {
    id: 4,
    airline: "Vietjet Air",
    logo: "https://seeklogo.com/images/V/vietjet-aviation-logo-A823494846-seeklogo.com.png",
    flightCode: "VJ120",
    departureTime: "06:00",
    departureCode: "SGN",
    arrivalTime: "08:10",
    arrivalCode: "HAN",
    duration: "2h 10m",
    price: 2126600,
    airlineClass: "Bay thẳng",
  },
];

const FlightDetails = () => {
  return (
    <div className="flight-list">
      {flights.map((flight) => (
        <div key={flight.id} className="flight-card">
          <div className="flight-info">
            <div className="airline">
              <img src={flight.logo} alt={flight.airline} className="airline-logo" />
              <span className="airline-name">{flight.airline} - {flight.flightCode}</span>
            </div>
            <div className="time-info">
              <div className="departure">
                <span className="time">{flight.departureTime}</span>
                <span className="code">{flight.departureCode}</span>
              </div>
              <div className="arrow">⟶</div>
              <div className="arrival">
                <span className="time">{flight.arrivalTime}</span>
                <span className="code">{flight.arrivalCode}</span>
              </div>
            </div>
            <div className="flight-duration">
              <span>{flight.duration}</span>
              <span className="flight-class">{flight.airlineClass}</span>
            </div>
            <div className="price">
              <span>{flight.price.toLocaleString()} VND</span>
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
