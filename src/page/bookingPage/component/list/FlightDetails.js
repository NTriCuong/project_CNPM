import React from "react";
import "./FlightDetails.css";

const flights = [
  {
    id: 1,
    airline: "Bamboo Airways",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Bamboo_Airways_logo.svg",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/VietJet_Air_logo.svg",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Bamboo_Airways_logo.svg",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/VietJet_Air_logo.svg",
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

const FlightList = () => {
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
              <button className="book-button">CHỌN</button>
            </div>
          </div>
          <div className="flight-details">
            <span>∨ Chi tiết</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
