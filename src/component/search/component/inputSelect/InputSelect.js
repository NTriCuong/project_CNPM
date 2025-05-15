import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import iconflight from "../../../../image/Icon/HomePage/iconflight.svg";
import "./style.css";
import {
  updateArrivalLocation,
  updateDepartureLocation,
} from "../../../../redux/searchDataClice";

const InputSelect = forwardRef(({ className, data, flag }, ref) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredPopular, setFilteredPopular] = useState(data.popular);
  const [recentSearch, setRecentSearch] = useState(null);

  const styleHeader = {
    color: "#233A60",
    fontWeight: "bold",
    fontFamily: "poppins, sans-serif",
    padding: "5px",
  };
  const styleTitleCity = { color: "#233A60", fontWeight: "600" };
  const styleTitleAirport = { color: "#6D7E96", fontSize: "10px" };

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredPopular(data.popular);
    } else {
      const filtered = data.popular.filter((item) =>
        item.city.toLowerCase().includes(searchText.toLowerCase()) ||
        item.airport.toLowerCase().includes(searchText.toLowerCase()) ||
        item.codeCity.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPopular(filtered);
    }
  }, [searchText, data.popular]);

  const handleChoose = (item) => {
    if (flag) {
      dispatch(
        updateDepartureLocation({
          city: item.city,
          codeCity: item.codeCity,
          airport: item.airport,
        })
      );
    } else {
      dispatch(
        updateArrivalLocation({
          city: item.city,
          codeCity: item.codeCity,
          airport: item.airport,
        })
      );
    }
    setRecentSearch(item);

    // --- Thay đổi: khi chọn 1 địa điểm, set searchText = tên city đã chọn ---
    setSearchText(item.city);  // <-- thêm dòng này để hiện tên thành phố lên ô input
  };

  return (
    <div 
      className={className} 
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="text"
        placeholder={flag ? "Điểm khởi hành" : "Điểm đến"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="inputSelect-boxContent" style={{ paddingLeft: "10px" }}>
        {recentSearch && (
          <>
            <p style={styleHeader}>Tìm Kiếm Gần Đây</p>
            <div
              className="box-inputselect-item"
              onClick={() => handleChoose(recentSearch)}
            >
              <div className="left">
                <img src={iconflight} alt="flight icon" />
                <div className="left-content">
                  <p style={styleTitleCity}>{recentSearch.city}</p>
                  <p style={styleTitleAirport}>{recentSearch.airport}</p>
                </div>
              </div>
              <div className="right">
                <img style={{ width: "25px" }} src={recentSearch.img} alt="city flag" />
                <p className="label-city">{recentSearch.national}</p>
              </div>
            </div>
          </>
        )}

        <p style={styleHeader}>Thành Phố Phổ Biến</p>
        <div>
          {filteredPopular.length > 0 ? (
            filteredPopular.map((item, index) => (
              <div
                key={index}
                className="box-inputselect-item"
                onClick={() => handleChoose(item)}
              >
                <div className="left">
                  <img src={iconflight} alt="flight icon" />
                  <div className="left-content">
                    <p style={styleTitleCity}>{item.city}</p>
                    <p style={styleTitleAirport}>{item.airport}</p>
                  </div>
                </div>
                <div className="right">
                  <img style={{ width: "25px" }} src={item.img} alt="city flag" />
                  <p className="label-city">{item.national}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ paddingLeft: "10px", color: "#999" }}>
              Không tìm thấy kết quả
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default InputSelect;
