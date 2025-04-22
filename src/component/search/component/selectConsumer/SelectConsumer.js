import { use, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateNumberAdults, updateNumberChildren, updateNumberInfants, updateTicketClasses } from "../../../../redux/searchDataClice";
import exit from "../../../../image/Icon/HomePage/exit-field-consumer.svg"
import { selectSearchData } from "../../../../redux/Store";
const SelectConsumer = ({ className, on }) => {
  const selectItem = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectItem1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const selectItem2 = [0, 1, 2, 3, 4];
  const selectItem3 = ["Economy", "Premium Economy", "Business"];
  const [dataSelect, setDataSelect] = useState(1);
  const [dataSelect1, setDataSelect1] = useState(0);
  const [dataSelect2, setDataSelect2] = useState(0);
  const selectData = useSelector(selectSearchData);
  const Dispath = useDispatch();
  const handleSubmit=(data) => {
    Dispath(updateNumberAdults(dataSelect));
    Dispath(updateNumberChildren(dataSelect1));
    Dispath(updateNumberInfants(dataSelect2));
    Dispath(updateTicketClasses(data === "Premium" ? "Premium Economy" : data));
  };
  const classNameSelect = `passenger-class-container ${className}`;
  const handelExit = () => {
    on();
  }
  return (
    <div className={classNameSelect}>
      <h3>Hành Khách Và Hạng Ghế  <img onClick={handelExit} className="exit" src={exit} alt=""/></h3>
     
      <div className="section">
        <div className="options">
          <div className="label">
            Người Lớn<span>12 tuổi trở lên</span>
          </div>
          <div className="select-consumer">
            {selectItem.map((item) => {
              return (
                <button
                  onClick={() => {
                    setDataSelect(item);
                  }}
                  className={
                    dataSelect !== item
                      ? "select-consumer-item"
                      : "select-consumer-item selected-consumer-item"
                  }
                  key={item.key}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="options">
          <div className="label">
            Trẻ Em<span>2 - 12 tuổi</span>
          </div>
          <div className="select-consumer">
            {selectItem1.map((item) => {
              return (
                <button
                  onClick={() => {
                    setDataSelect1(item);
                  }}
                  className={
                    dataSelect1 !== item
                      ? "select-consumer-item"
                      : "select-consumer-item selected-consumer-item"
                  }
                  key={item.key}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="options">
          <div className="label">
            Trẻ sơ sinh<span>0 - 2 tuổi</span>
          </div>
          <div className="select-consumer">
            {selectItem2.map((item) => {
              return (
                <button
                  onClick={() => {
                    setDataSelect2(item);
                  }}
                  className={
                    dataSelect2 !== item
                      ? "select-consumer-item"
                      : "select-consumer-item selected-consumer-item"
                  }
                  key={item.key}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="seat-class">
        <div className="seat-options">
          <div className="label">Hạng Ghế</div>
          <div className="select-consumer-seat">
            {selectItem3.map((item) => {
              return (
                <button
                  onClick={()=>{handleSubmit(item)}}
                  className={selectData.ticketClasses !== item ? "" : "active"}
                  key={item.key}
                >
                  {item === "Premium Economy" ? "Premium" : item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectConsumer;
