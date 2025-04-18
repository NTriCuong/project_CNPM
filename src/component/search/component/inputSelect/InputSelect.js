import iconflight from "../../../../image/Icon/HomePage/iconflight.svg";
import "./style.css";
function InputSelect({ className, data }) {
  const styleHeader = {
    color: "#233A60",
    fontWeight: "bold",
    fontFamily: "poppins, sans-serif;",
    padding: "5px",
  };
  const styleTitleCity = { color: "#233A60", fontWeight: "600" };
  const styleTitleAirport = { color: "#6D7E96", fontSize: "10px" };
  return (
    <div className={className}>
      <input type="text" placeholder="Điểm Khởi Hành"></input>
      <div className="inputSelect-boxContent" style={{ paddingLeft: "10px" }}>
        <p style={styleHeader}>Tìm Kiếm Gần Đây</p>

        <div className="box-inputselect-item">
          <div className="left">
            <img src={iconflight} />
            <div className="left-content">
              <div>
                <p style={styleTitleCity}>{data.recentSearches.city}</p>
              </div>
              <p style={styleTitleAirport}>{data.recentSearches.airport}</p>
            </div>
          </div>
          <div className="right">
            <img src={data.recentSearches.img} />
            <p className="label-city">{data.recentSearches.national}</p>
          </div>
        </div>

        <p style={styleHeader}>THÀNH PHỐ PHỔ BIẾN</p>
        <div>
          {data.popular.map((item) => {
            return (
              <div className="box-inputselect-item">
                <div className="left">
                  <img src={iconflight} />
                  <div className="left-content">
                    <div>
                      <p style={styleTitleCity}>{item.city}</p>
                    </div>
                    <p style={styleTitleAirport}>{item.airport}</p>
                  </div>
                </div>
                <div className="right">
                  <img src={item.img} />
                  <p className="label-city">{item.national}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default InputSelect;
