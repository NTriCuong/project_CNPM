import FlightFilters from "./component/filter/FlightFilters";
import './FlightBookingPage.css';
import FlightList from "./component/FlightList";


function FlightBookingPage() {
    return (
        <div className="app-container">
          <div className="content-container">
            <div className="filters-wrapper">
              <FlightFilters />
            </div>
            <div className="flight-list-wrapper">
              <FlightList />
            </div>
          </div>
        </div>
      );
}
export default FlightBookingPage;