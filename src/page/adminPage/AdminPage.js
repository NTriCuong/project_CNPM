import React, { useState, useEffect } from "react";
import AdminForm from "./component/Form";
import { useNavigate } from "react-router-dom";
import { getFlight } from "../../api/axiosClient";

const AdminPage = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Api();
  }, []);
  const Api = async () => {
    try {
      const res = await getFlight.get();
      const rawFlights = res.data;

      // Custom lại thành danh sách chuyến bay theo từng hạng vé
      const formattedFlights = rawFlights.flatMap((flight) =>
        flight.price_tables.map((price) => ({
          airline_name: flight.airline_name,
          arrival_airport_code: flight.arrival_airport_code,
          arrival_time: flight.arrival_time,
          available_seats: flight.available_seats,
          departure_airport_code: flight.departure_airport_code,
          departure_time: flight.departure_time,
          flight_id: flight.flight_id,
          flight_number: flight.flight_number,
          ticket_class_name: price.ticket_class_name,
          adult_price: price.adult_price,
          child_price: price.child_price,
          infant_price: price.infant_price,
        }))
      );

    setFlights(formattedFlights);

    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };
  const styleTd = { textAlign: "center", padding: "10px" };
  const styleUpdate = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const styleDelete = {
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const handleCreate = () => {
    navigate("/admin/form");
  };
  const handleUpdate = (data) => {
    navigate("/admin/form", { state: { data } });
  };
  const handleDelete = (flight_number) => {};
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Page - Flight Management</h1>
      <button onClick={handleCreate} style={styleUpdate}>
        {" "}
        create
      </button>
      <table
        border="1"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Airline Name</th>
            <th>Flight Number</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Ticket Class</th>
            <th>Available Seats</th>
            <th>Adult Price</th>
            <th>Child Price</th>
            <th>Infant Price</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody style={{maxHeight: '800px', overflowY: "scroll"}}>
          {flights.map((flight) => (
            <tr key={flight.flight_id}>
              <td style={styleTd}>{flight.airline_name}</td>
              <td style={styleTd}>{flight.flight_number}</td>
              <td style={styleTd}>{flight.departure_airport_code}</td>
              <td style={styleTd}>{flight.arrival_airport_code}</td>
              <td style={styleTd}>
                {new Date(flight.departure_time).toLocaleString()}
              </td>
              <td style={styleTd}>
                {new Date(flight.arrival_time).toLocaleString()}
              </td>
              <td style={styleTd}>{flight.ticket_class_name}</td>
              <td style={styleTd}>{flight.available_seats}</td>
              <td style={styleTd}>${flight.adult_price}</td>
              <td style={styleTd}>${flight.child_price}</td>
              <td style={styleTd}>${flight.infant_price}</td>

              <td style={styleTd}>
                {" "}
                <button
                  onClick={() => handleUpdate(flight)}
                  style={styleUpdate}
                >
                  {" "}
                  update{" "}
                </button>
              </td>
              <td style={styleTd}>
                {" "}
                <button
                  onClick={() => handleDelete(flight.flight_number)}
                  style={styleDelete}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
