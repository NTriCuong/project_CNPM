import FlightFilters from "./component/filter/FlightFilters";
import "./FlightBookingPage.css";
import FlightList from "./component/FlightList";
import Menu from "../../component/menu/Menu";
import FlightSearchBox from "../../component/search/FlightSearchBox";
import Footer from "../../component/footer/Footer";
import ChatBox from "../../component/chatBox/ChatBox";

function FlightBookingPage() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Menu className="header-booking" />
      </div>
      <div className="flight-search-container">
        <FlightSearchBox className="flight-search-booking" />
        {/* <FlightBookingLogin
          className={`form-login ${auth === "auth-login" ? "on-login" : ""}`}
        />
        <FlightRegister
          className={`form-login ${auth === "auth-register" ? "on-login" : ""}`}
        />
        <ForgotPassword
          className={`form-login ${
            auth === "auth-forgotpassword" ? "on-login" : ""
          }`}
        />
        <ConfirmOTP
          className={`form-login ${
            auth === "auth-confirmotp" ? "on-login" : ""
          }`}
        />
        <ResetPassword
          className={`form-login ${
            auth === "auth-resetpassword" ? "on-login" : ""
          }`}
        /> */}
      </div>
      <div className="wrap-content">
        <div className="content-container">
          <div className="filters-wrapper">
            <FlightFilters />
          </div>
          <div className="flight-list-wrapper">
            <FlightList />
          </div>
        </div>
      </div>
      <ChatBox/>  
      <Footer className="footer-booking" />
    </div>
  );
}
export default FlightBookingPage;
