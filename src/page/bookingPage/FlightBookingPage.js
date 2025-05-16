import FlightFilters from "./component/filter/FlightFilters";
import "./FlightBookingPage.css";
import FlightList from "./component/FlightList";
import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import Footer from "../../component/footer/Footer";
import ChatBox from "../../component/chatBox/ChatBox";
import { useLocation } from "react-router-dom";

function FlightBookingPage() {
  const location = useLocation();
  const tickerType = location.state;
  console.log(tickerType);
  
  return (
    <div className="app-container">
      <div className="header-container">
        <Menu className="header-booking" />
      </div>
      <div className="flight-search-mobile">
        <FlightSearchBox className="flight-search-container" />
      </div>
      <div className="wrap-content">
        <div className="content-container">
          <div className="filters-wrapper">
            <FlightFilters  />
          </div>
          <div className="flight-list-wrapper">
            <FlightList tickerType ={tickerType}/>
          </div>
        </div>
      </div>
      <ChatBox />
      <Footer className="footer-booking" />
    </div>
  );
}
export default FlightBookingPage;
