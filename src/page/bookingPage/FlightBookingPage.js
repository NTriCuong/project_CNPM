import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import FlightFilters from "./component/FlightFilters";
import './FlightBookingPage.css';


function FlightBookingPage() {
    return <div> 
        <Menu className='booking-header'/>
        <FlightSearchBox/>
    </div>
}
export default FlightBookingPage;