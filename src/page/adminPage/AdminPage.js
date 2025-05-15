import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFlight, getFlight } from "../../api/axiosClient";

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
      setFlights(rawFlights);
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
  const handleCreate = () => {
    navigate("/admin/form");
  };
  const handleUpdate = (data) => {
    navigate("/admin/form", { state: { data } });
  };
  const handleDelete = (flight_id) => {
    ApiDelete(flight_id);
  };
  //api xoá
  const ApiDelete = async (flight_id) => {
    console.log("Delete flight with ID:", flight_id);
    
    try {
     const res = await deleteFlight.request({
      method: "delete",
      url: "/",
      data: {
        flight_ids: [Number(flight_id)],
      }
    });
      Api();
      alert("Delete flight successfully",res.data);
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

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
            <th>Airline Id</th>
            <th>Airline Name</th>
            <th>Flight Number</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Available Seats</th>
            <th>Price Tables</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: "800px", overflowY: "scroll" }}>
          {flights.map((flight) => (
            <tr key={flight.flight_id}>
              <td style={styleTd}>{flight.flight_id}</td>
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
              <td style={styleTd}>{flight.available_seats}</td>

              {/* Nested table for price_tables */}
              <td style={styleTd} colSpan={5}>
                <table
                  style={{
                    border: "1px solid #ccc",
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ticket class</th>
                      <th>adult price</th>
                      <th>child price</th>
                      <th>infant price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flight.price_tables.map((price, index) => (
                      <tr key={index}>
                        <td style={{ padding: "5px" }}>
                          {price.ticket_class_name}
                        </td>
                        <td style={{ padding: "5px" }}>{price.adult_price}</td>
                        <td style={{ padding: "5px" }}>{price.child_price}</td>
                        <td style={{ padding: "5px" }}>{price.infant_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none", padding: "5px" }}>
                    <button
                      style={{
                        color: "green",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleUpdate(flight)}
                    >
                      update
                    </button>
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none", padding: "5px" }}>
                    <button
                      style={{
                        color: "red",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(flight.flight_id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
