import React, { useState } from "react";
import "./form.css"; // Import CSS file for styling
import { useLocation, useNavigate } from "react-router-dom";
import { createFlight, updateFlight } from "../../../api/axiosClient";
const Form = () => {
  const navigate = useNavigate();
  const location = useLocation(); // khi chuyển trang có thể gửi kèm 1 cục dữ liệu
  const data = location.state?.data;

  const defaultPriceTables = [
    {
      ticket_class_name: "Economy",
      adult_price: "",
      child_price: "",
      infant_price: "",
    },
    {
      ticket_class_name: "Premium Economy",
      adult_price: "",
      child_price: "",
      infant_price: "",
    },
    {
      ticket_class_name: "Business",
      adult_price: "",
      child_price: "",
      infant_price: "",
    },
  ];

  const [formData, setFormData] = useState(() => {
    if (data) {
      return {
        flight_id: data.flight_id,
        airline_name: data.airline_name || "",
        flight_number: data.flight_number || "",
        departure_airport: data.departure_airport_code || "",
        arrival_airport: data.arrival_airport_code || "",
        departure_time: data.departure_time || "",
        arrival_time: data.arrival_time || "",
        available_seats: data.available_seats || "",
        price_tables:
          Array.isArray(data.price_tables) && data.price_tables.length > 0
            ? data.price_tables
            : defaultPriceTables,
      };
    } else {
      return {
        flight_id: "",
        airline_name: "",
        flight_number: "",
        departure_airport: "",
        arrival_airport: "",
        departure_time: "",
        arrival_time: "",
        available_seats: "",
        price_tables: defaultPriceTables,
      };
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data != undefined) ApiUpdate();
    else ApiCreate();
  };
  //api update
  const ApiUpdate = async () => {
    try {
      await updateFlight.put(`/`, {
        flight_id: Number(formData.flight_id),
        flight_number: formData.flight_number,
        airline_name: formData.airline_name,
        departure_airport_code: formData.departure_airport,
        arrival_airport_code: formData.arrival_airport,
        departure_time: formData.departure_time,
        arrival_time: formData.arrival_time,
        available_seats: formData.available_seats,
        price_tables: formData.price_tables
          .filter((item) => {
            return (
              item.adult_price !== "" &&
              item.child_price !== "" &&
              item.infant_price !== ""
            );
          })
          .map((item) => ({
            ticket_class_name: item.ticket_class_name,
            adult_price: Number(item.adult_price),
            child_price: Number(item.child_price),
            infant_price: Number(item.infant_price),
          })),
      });
      alert("Update flight successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };
  //api create
  const ApiCreate = async () => {
    try {
      await createFlight.post("/", {
        flight_number: formData.flight_number,
        airline_name: formData.airline_name,
        departure_airport_code: formData.departure_airport,
        arrival_airport_code: formData.arrival_airport,
        departure_time: new Date(formData.departure_time).toISOString(),
        arrival_time: new Date(formData.arrival_time).toISOString(),
        available_seats: Number(formData.available_seats),
        price_tables: formData.price_tables
          .filter((item) => {
            return (
              item.adult_price !== "" &&
              item.child_price !== "" &&
              item.infant_price !== ""
            );
          })
          .map((item) => ({
            ticket_class_name: item.ticket_class_name,
            adult_price: Number(item.adult_price),
            child_price: Number(item.child_price),
            infant_price: Number(item.infant_price),
          })),
      });
      alert("Create flight successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error creating flight:", error);
    }
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
          <option value="">Select Airline</option>
          <option value="Vietnam Airlines">Vietnam Airlines</option>
          <option value="AirAsia">AirAsia</option>
          <option value="Emirates">Emirates</option>
          <option value="Qatar Airways">Qatar Airways</option>
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
        <select
          id="departure_airport"
          name="departure_airport"
          value={formData.departure_airport}
          onChange={handleChange}
        >
          <option value=""> Departure</option>
          {airlines.map((airlineCode) => (
            <option key={airlineCode} value={airlineCode}>
              {airlineCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="arrival_airport">Arrival Airport:</label>
        <select
          id="arrival_airport"
          name="arrival_airport"
          value={formData.arrival_airport}
          onChange={handleChange}
        >
          <option value=""> Arrival</option>
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
        <label htmlFor="available_seats">Available Seats:</label>
        <input
          type="number"
          id="available_seats"
          name="available_seats"
          value={formData.available_seats}
          onChange={handleChange}
        />
      </div>
      {formData.price_tables.map((price, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{price.ticket_class_name}</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <label>Adults Price</label>
            <input
              type="number"
              value={price.adult_price}
              onChange={(e) => {
                const updatedTables = [...formData.price_tables];
                updatedTables[index].adult_price = e.target.value;
                setFormData({ ...formData, price_tables: updatedTables });
              }}
            />
            <label>Child Price</label>
            <input
              type="number"
              value={price.child_price}
              onChange={(e) => {
                const updatedTables = [...formData.price_tables];
                updatedTables[index].child_price = e.target.value;
                setFormData({ ...formData, price_tables: updatedTables });
              }}
            />
            <label>Infant Price</label>
            <input
              type="number"
              value={price.infant_price}
              onChange={(e) => {
                const updatedTables = [...formData.price_tables];
                updatedTables[index].infant_price = e.target.value;
                setFormData({ ...formData, price_tables: updatedTables });
              }}
            />
          </div>
        </div>
      ))}

      <div></div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
