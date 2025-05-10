import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from '../page/homePage/HomePage';
import FlightBookingPage from'../page/bookingPage/FlightBookingPage';
import FinalQuestion from "../page/finalQuestion/FinalQuestion";
import AdminPage from "../page/adminPage/AdminPage";
import Form from "../page/adminPage/component/Form";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/booking" element={<FlightBookingPage />} />
        <Route path="/final-question" element={<FinalQuestion/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/form" element={<Form/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
