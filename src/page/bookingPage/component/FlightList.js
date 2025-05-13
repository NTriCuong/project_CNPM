import "./FlightList.css";
import DateSelector from "./date/DateSelector";
import FlightDetails from "./list/FlightDetails"
import { selectSearchData } from "../../../redux/Store";
import { useSelector } from "react-redux";


function Flightlist() {

  const searchData = useSelector(selectSearchData);
  return (
    <div>
          <div className="flight-list-container">
            {/* Outbound Flights Section */}
            <div className="flight-section">
              <div className="route-header">
                <div className="route-info">
                  <div className="route-location">
                    <h2>{searchData.departureLocation.city}</h2>
                    <div className="airport-code">{searchData.departureLocation.codeCity}</div>
                  </div>
                  <div className="route-arrow">⟶</div>
                  <div className="route-location">
                    <h2>{searchData.arrivalLocation.city}</h2>
                    <div className="airport-code">{searchData.arrivalLocation.codeCity}</div>
                  </div>
                </div>
                <button className="collapse-button">
                </button>
              </div>
            </div>
            <DateSelector />
            <FlightDetails classify={searchData.departureLocation.codeCity} />
            <div className="flight-section">
              <div className="route-header">
                <div className="route-info">
                  <div className="route-location">
                    <h2>{searchData.arrivalLocation.city}</h2>
                    <div className="airport-code">{searchData.arrivalLocation.codeCity}</div>
                  </div>
                  <div className="route-arrow">⟶</div>
                  <div className="route-location">
                    <h2>{searchData.departureLocation.city}</h2>
                    <div className="airport-code">{ searchData.departureLocation.codeCity}</div>
                  </div>
                </div>
                <button className="collapse-button">
                </button>
              </div>
            </div>
            <FlightDetails classify={searchData.arrivalLocation.codeCity}/>
          </div>
    </div>
  );
}

export default Flightlist;
