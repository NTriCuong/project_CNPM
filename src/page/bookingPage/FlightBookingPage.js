import FlightFilters from "./component/filter/FlightFilters";
import './FlightBookingPage.css';
import FlightList from "./component/FlightList";
import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import Footer from "../../component/footer/Footer";


function FlightBookingPage() {
    return (
        <div className="app-container">
            <div className="header-container">
                <Menu className="header-booking" />
            </div>
            {/* <div className="flight-search-container">
                <FlightSearchBox className="flight-search-booking" />
            </div> */}
            <div className="content-container">
                <div className="filters-wrapper">
                    <FlightFilters />
                </div>
                <div className="flight-list-wrapper">
                    <FlightList />
                </div>
            </div>
            <Footer className="footer-booking" />
        </div>
    );
}
export default FlightBookingPage;