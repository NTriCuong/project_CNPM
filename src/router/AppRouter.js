import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from '../page/homePage/HomePage';
import FlightBookingPage from'../page/bookingPage/FlightBookingPage';
import FinalQuestion from "../page/finalQuestion/FinalQuestion";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/booking" element={<FlightBookingPage />} />
        <Route path="/final-question" element={<FinalQuestion/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
