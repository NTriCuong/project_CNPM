import React from "react";
import "./FlightList.css";
import DateSelector from "./date/DateSelector";
import FlightDetails from "./list/FlightDetails"
import { selectSearchData } from "../../../redux/Store";
import { useSelector } from "react-redux";


<<<<<<< HEAD
const go = [
  {
    diemden: "Hồ Chí Minh",
    code1: "SGN",
    diemdi: "Hà Nội",
    code2: "HAN"
  },
  // {
  //   diemden: "Hồ Chí Minh",
  //   code1: "SGN",
  //   diemdi: "Hà Nội",
  //   code2: "HAN"
  // }
]
=======
>>>>>>> dddc2309a906a20f3a4469f9e8db10dc0aa23730
function Flightlist() {

  const searchData = useSelector(selectSearchData);

  if (!searchData?.from || !searchData?.to) {
    return <div className="no-result">Không tìm thấy chuyến bay. Vui lòng tìm lại!</div>;
  }
  const go = searchData?.from && searchData?.to ? [
    {
      diemdi: searchData.from.cityName || "",
      code2: searchData.from.iataCode || "",
      diemden: searchData.to.cityName || "",
      code1: searchData.to.iataCode || ""
    }
  ] : [];



  return (
    <div>
      {go.map(item => {
        return (
          <div className="flight-list-container">
            {/* Outbound Flights Section */}
            <div className="flight-section">
              <div className="route-header">
                <div className="route-info">
                  <div className="route-location">
                    <h2>{item.diemden}</h2>
                    <div className="airport-code">{item.code1}</div>
                  </div>
                  <div className="route-arrow">⟶</div>
                  <div className="route-location">
                    <h2>{item.diemdi}</h2>
                    <div className="airport-code">{item.code2}</div>
                  </div>
                </div>
                <button className="collapse-button">
                  <span className="arrow-up">∧</span>
                </button>
              </div>
            </div>
            <DateSelector />
            <FlightDetails />
          </div>
        )
      })}
    </div>
  );
}

export default Flightlist;
