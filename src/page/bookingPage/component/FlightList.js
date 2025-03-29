import React from "react";
import "./FlightList.css";
import DateSelector from "./date/DateSelector";
import FlightDetails from "./list/FlightDetails"
function Flightlist() {
  return (
    <div>
      <div className="flight-list-container">
        {/* Outbound Flights Section */}
        <div className="flight-section">
          <div className="route-header">
            <div className="route-info">
              <div className="route-location">
                <h2>Hồ Chí Minh</h2>
                <div className="airport-code">SGN</div>
              </div>
              <div className="route-arrow">⟶</div>
              <div className="route-location">
                <h2>Hà Nội</h2>
                <div className="airport-code">HAN</div>
              </div>
            </div>
            <button className="collapse-button">
              <span className="arrow-up">∧</span>
            </button>
          </div>
        </div>
        <DateSelector/>
        <FlightDetails/>
      </div>
    </div>
  );
}

export default Flightlist;
