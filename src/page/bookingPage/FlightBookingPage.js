import Footer from "../../component/footer/Footer";
import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import FlightFilters from "./component/FlightFilters";
import './FlightBookingPage.css';


function FlightBookingPage() {
    return <div>
        {/* <div className="booking-header">
            <Menu className='booking-menu' />
        </div>
        <div className="booking-search-fly">
            <FlightSearchBox/>
        </div> */}
        <Footer/>
    </div>
}
export default FlightBookingPage;