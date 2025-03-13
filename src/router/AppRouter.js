import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from '../page/homePage/HomePage';
import FlightBookingPage from'../page/bookingPage/FlightBookingPage';
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/booking" element={<FlightBookingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
