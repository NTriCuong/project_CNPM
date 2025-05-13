import React, { useState } from "react";
import "./form.css"; // Import CSS file for styling
import { useLocation, useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate();
  const location = useLocation(); // khi chuyển trang có thể gửi kèm 1 cục dữ liệu
  // hoặc xử dụng useParams để truyền dữ liệu
  // const { id } = useParams(); // lấy id từ đường dẫn
  const data = location.state?.data; // dữ liệu nhận lại được từ trang trước
  const [formData, setFormData] = useState({
    airline_name: data?.airline_name || "",
    flight_number: data?.flight_number || "",
    departure_airport: data?.departure_airport || "",
    arrival_airport: data?.arrival_airport || "",
    departure_time: data?.departure_time || "",
    arrival_time: data?.arrival_time || "",
    ticket_class_name: data?.ticket_class_name || "",
    available_seats: data?.available_seats || "",
    total_price: data?.total_price || "",
  });

  const airlines = [
    "HAN",
    "SGN",
    "DAD",
    "BKK",
    "CNX",
    "KUL",
    "PEN",
    "SIN",
    "CGK",
    "DPS",
    "MNL",
    "CEB",
    "PNH",
    "REP",
    "VTE",
    "LPQ",
    "RGN",
    "NYT",
    "BWN",
  ];

  const ticket = [
    "Economy",
    "Premium",
    "Business",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const styleBack = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    margin: "0",
  };
  return (
    <form className={`custom-form`} onSubmit={handleSubmit}>
      <button
        style={styleBack}
        onClick={() => {
          navigate("/admin");
        }}
      >{`<- back`}</button>
      <h1>Flight Information Form</h1>
      <div>
        <label htmlFor="airline_name">Airline Name:</label>
        <select
          id="airline_name"
          name="airline_name"
          value={formData.airline_name}
          onChange={handleChange}
        >
          <option value="">Select Airline</option> {/* Tùy chọn mặc định */}
          <option value="Vietnam Airlines">Vietnam Airlines</option>
          <option value="AirAsia">AirAsia</option>
          <option value="Emirates">Emirates</option>
          <option value="Qatar Airways">Qatar Airways</option>
          {/* Bạn có thể thêm các tùy chọn khác ở đây */}
        </select>
      </div>
      <div>
        <label htmlFor="flight_number">Flight Number:</label>
        <input
          type="text"
          id="flight_number"
          name="flight_number"
          value={formData.flight_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="departure_airport">Departure Airport:</label>
        <select>
          <option value="">          </option>
          {airlines.map((airlineCode) => (
            <option key={airlineCode} value={airlineCode}>
              {airlineCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="arrival_airport">Arrival Airport:</label>
        <select>
          <option value="">          </option>
          {airlines.map((airlineCode) => (
            <option key={airlineCode} value={airlineCode}>
              {airlineCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="departure_time">Departure Time:</label>
        <input
          type="datetime-local"
          id="departure_time"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="arrival_time">Arrival Time:</label>
        <input
          type="datetime-local"
          id="arrival_time"
          name="arrival_time"
          value={formData.arrival_time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ticket_class_name">Ticket Class Name:</label>
        <select>
          <option value="">          </option>
          {ticket.map((airlineCode) => (
            <option key={airlineCode} value={airlineCode}>
              {airlineCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="available_seats">Available Seats:</label>
        <input
          type="number"
          id="available_seats"
          name="available_seats"
          value={formData.available_seats}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="total_price">Adults Price</label>
        <input
          type="number"
          id="total_price"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
        />
      </div>
            <div>
        <label htmlFor="total_price">Child Price</label>
        <input
          type="number"
          id="total_price"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
        />
      </div>
            <div>
        <label htmlFor="total_price">Infant Price</label>
        <input
          type="number"
          id="total_price"
          name="total_price"
          value={formData.total_price}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
