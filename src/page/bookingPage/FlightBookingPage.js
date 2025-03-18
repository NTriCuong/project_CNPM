import Footer from "../../component/footer/Footer";
import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import FlightFilters from "./component/FlightFilters";
import './FlightBookingPage.css';


function FlightBookingPage() {
    return <div className="booking-page">
        <div className="booking-header">
            <Menu className='booking-menu' />
        </div>
        <div className="booking-container">

        </div>
    </div>
}
export default FlightBookingPage;