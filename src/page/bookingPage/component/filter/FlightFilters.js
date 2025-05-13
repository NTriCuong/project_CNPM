import React, { useState, useRef, useEffect } from "react";
import "./FlightFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchFlight } from "../../../../redux/Store";
import { setDataDisplay } from "../../../../redux/dataDisplay";

const FlightFilters = () => {
  // Thay đổi state airlines để chỉ lưu một giá trị được chọn
  const [selectedAirline, setSelectedAirline] = useState([]);
  // data
  const Dispath = useDispatch();
  const searchData = useSelector(selectSearchFlight);
  
  useEffect(() => {
    const data =selectedAirline.length !== 0 ? searchData.filter((item) => selectedAirline.includes(item.airline_name)) : searchData;
    console.log("Data after filtering by airline:", data); // Xem dữ liệu đã lọc
    
    Dispath(setDataDisplay(data));
  }, [selectedAirline]);

  //Thanh kéo giá
  const [priceRange, setPriceRange] = useState([50, 500]);
  useEffect(() => {
    if (!Array.isArray(searchData)) return;

    const filteredData = searchData.filter(
      (flight) =>
        flight.total_price > priceRange[0] && flight.total_price < priceRange[1]
    );

    console.log("Loc du lieu", filteredData); // Xem dữ liệu đã lọc
    Dispath(setDataDisplay(filteredData));
  }, [priceRange]);

  const [draggingThumb, setDraggingThumb] = useState(null); // 'min' or 'max' or null
  const [isDragging, setIsDragging] = useState(false);

  const sliderTrackRef = useRef(null);
  const timeSliderTrackRef = useRef(null); // Thêm ref cho time slider

  //Thanh kéo giờ bay
  const [departureTime, setDepartureTime] = useState(["12:01AM", "11:59PM"]);
  const [departureMinutes, setDepartureMinutes] = useState([1, 1439]); // 1 (12:01AM) to 1439 (11:59PM) in minutes
  const [draggingTimeThumb, setDraggingTimeThumb] = useState(null); // 'min' or 'max' or null
  const [isTimeDragging, setIsTimeDragging] = useState(false);
  useEffect(() => {
  if (!Array.isArray(searchData)) return;

  const filteredData = searchData.filter((flight) => {
    const departure = new Date(flight.departure_time);
    const minutes = departure.getHours() * 60 + departure.getMinutes();
    return (
      minutes >= departureMinutes[0] && minutes <= departureMinutes[1]
    );
  });

  Dispath(setDataDisplay(filteredData));
}, [departureMinutes]);



  // State cho rating
  const [selectedRating, setSelectedRating] = useState(null);

  // State cho Sắp xếp va sort theo gia tien
  const [selectedTripType, setSelectedTripType] = useState("asc");
  useEffect(() => {
    let filteredData = [...searchData];
    // Sắp xếp dữ liệu theo loại chuyến
    switch (selectedTripType) {
      case "asc":
        filteredData.sort((a, b) => a.total_price - b.total_price);
        break;
      case "desc":
        filteredData.sort((a, b) => b.total_price - a.total_price);
        break;
      case "early":
        filteredData.sort(
          (a, b) => new Date(a.departure_time) - new Date(b.departure_time)
        );
        break;
      case "lately":
        filteredData.sort(
          (a, b) => new Date(b.departure_time) - new Date(a.departure_time)
        );
        break;
      default:
        break;
    }

    console.log("Filtered & Sorted Flights:", filteredData);
    Dispath(setDataDisplay(filteredData));
  }, [selectedAirline, selectedTripType]);

  // Đặt mục cho giá
  const minPrice = 0;
  const maxPrice = 10000;

  // đặt mục cho giờ bay
  const minMinutes = 0;
  const maxMinutes = 1440;

  // Hiệu ứng kéo thanh Giá
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingThumb || !sliderTrackRef.current) return;

      const trackRect = sliderTrackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;
      let percent = ((e.clientX - trackRect.left) / trackWidth) * 100;
      percent = Math.max(0, Math.min(100, percent));

      // Cập nhật đúng giá trị
      const newPrice = percentToPrice(percent);
      const newPriceRange = [...priceRange];

      if (draggingThumb === "min") {
        if (newPrice <= priceRange[1]) {
          newPriceRange[0] = newPrice;
        }
      } else {
        if (newPrice >= priceRange[0]) {
          newPriceRange[1] = newPrice;
        }
      }

      setPriceRange(newPriceRange);
    };

    const handleTouchMove = (e) => {
      if (!draggingThumb || !sliderTrackRef.current) return;
      e.preventDefault();

      const touch = e.touches[0];
      const trackRect = sliderTrackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;

      let percent = ((touch.clientX - trackRect.left) / trackWidth) * 100;
      percent = Math.max(0, Math.min(100, percent));

      const newPrice = percentToPrice(percent);
      const newPriceRange = [...priceRange];

      if (draggingThumb === "min") {
        if (newPrice <= priceRange[1]) {
          newPriceRange[0] = newPrice;
        }
      } else {
        if (newPrice >= priceRange[0]) {
          newPriceRange[1] = newPrice;
        }
      }

      setPriceRange(newPriceRange);
    };

    const handleEnd = () => {
      setDraggingThumb(null);
      setIsDragging(false);
    };

    if (draggingThumb) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [draggingThumb, priceRange]);

  // Kéo thanh Giờ cho mượt
  useEffect(() => {
    const handleTimeMouseMove = (e) => {
      if (!draggingTimeThumb || !timeSliderTrackRef.current) return;

      const trackRect = timeSliderTrackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;
      let percent = ((e.clientX - trackRect.left) / trackWidth) * 100;
      percent = Math.max(0, Math.min(100, percent));

      // Cập nhật giá trị đúng cho Giờ
      const newMinutes = percentToMinutes(percent);
      const newDepartureMinutes = [...departureMinutes];

      if (draggingTimeThumb === "min") {
        if (newMinutes <= departureMinutes[1]) {
          newDepartureMinutes[0] = newMinutes;
        }
      } else {
        if (newMinutes >= departureMinutes[0]) {
          newDepartureMinutes[1] = newMinutes;
        }
      }

      setDepartureMinutes(newDepartureMinutes);
      setDepartureTime([
        minutesToTimeString(newDepartureMinutes[0]),
        minutesToTimeString(newDepartureMinutes[1]),
      ]);
    };

    const handleTimeTouchMove = (e) => {
      if (!draggingTimeThumb || !timeSliderTrackRef.current) return;
      e.preventDefault();

      const touch = e.touches[0];
      const trackRect = timeSliderTrackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;

      let percent = ((touch.clientX - trackRect.left) / trackWidth) * 100;
      percent = Math.max(0, Math.min(100, percent));

      const newMinutes = percentToMinutes(percent);
      const newDepartureMinutes = [...departureMinutes];

      if (draggingTimeThumb === "min") {
        if (newMinutes <= departureMinutes[1]) {
          newDepartureMinutes[0] = newMinutes;
        }
      } else {
        if (newMinutes >= departureMinutes[0]) {
          newDepartureMinutes[1] = newMinutes;
        }
      }

      setDepartureMinutes(newDepartureMinutes);
      setDepartureTime([
        minutesToTimeString(newDepartureMinutes[0]),
        minutesToTimeString(newDepartureMinutes[1]),
      ]);
    };

    const handleTimeEnd = () => {
      setDraggingTimeThumb(null);
      setIsTimeDragging(false);
    };

    if (draggingTimeThumb) {
      window.addEventListener("mousemove", handleTimeMouseMove);
      window.addEventListener("mouseup", handleTimeEnd);
      window.addEventListener("touchmove", handleTimeTouchMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleTimeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleTimeMouseMove);
      window.removeEventListener("mouseup", handleTimeEnd);
      window.removeEventListener("touchmove", handleTimeTouchMove);
      window.removeEventListener("touchend", handleTimeEnd);
    };
  }, [draggingTimeThumb, departureMinutes]);

  const priceToPercent = (price) => {
    return ((price - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const percentToPrice = (percent) => {
    return Math.round(minPrice + (percent / 100) * (maxPrice - minPrice));
  };

  const minutesToPercent = (minutes) => {
    return ((minutes - minMinutes) / (maxMinutes - minMinutes)) * 100;
  };

  const percentToMinutes = (percent) => {
    return Math.round(minMinutes + (percent / 100) * (maxMinutes - minMinutes));
  };
  const minutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? "AM" : "PM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${mins.toString().padStart(2, "0")}${period}`;
  };

  const handleThumbMouseDown = (e, thumb) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingThumb(thumb);
    setIsDragging(true);
  };

  const handleThumbTouchStart = (e, thumb) => {
    e.stopPropagation();
    setDraggingThumb(thumb);
    setIsDragging(true);
  };

  const handleTrackClick = (e) => {
    if (isDragging || !sliderTrackRef.current) return;
    const trackRect = sliderTrackRef.current.getBoundingClientRect();
    const clickPercent = ((e.clientX - trackRect.left) / trackRect.width) * 100;
    const clickPrice = percentToPrice(clickPercent);
    const distToMin = Math.abs(clickPrice - priceRange[0]);
    const distToMax = Math.abs(clickPrice - priceRange[1]);

    if (distToMin <= distToMax) {
      setPriceRange([clickPrice, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], clickPrice]);
    }
  };
  const handleTimeThumbMouseDown = (e, thumb) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingTimeThumb(thumb);
    setIsTimeDragging(true);
  };
  const handleTimeThumbTouchStart = (e, thumb) => {
    e.stopPropagation();
    setDraggingTimeThumb(thumb);
    setIsTimeDragging(true);
  };
  const handleTimeTrackClick = (e) => {
    if (isTimeDragging || !timeSliderTrackRef.current) return;
    const trackRect = timeSliderTrackRef.current.getBoundingClientRect();
    const clickPercent = ((e.clientX - trackRect.left) / trackRect.width) * 100;
    const clickMinutes = percentToMinutes(clickPercent);
    const distToMin = Math.abs(clickMinutes - departureMinutes[0]);
    const distToMax = Math.abs(clickMinutes - departureMinutes[1]);

    if (distToMin <= distToMax) {
      const newDepartureMinutes = [clickMinutes, departureMinutes[1]];
      setDepartureMinutes(newDepartureMinutes);
      setDepartureTime([minutesToTimeString(clickMinutes), departureTime[1]]);
    } else {
      const newDepartureMinutes = [departureMinutes[0], clickMinutes];
      setDepartureMinutes(newDepartureMinutes);
      setDepartureTime([departureTime[0], minutesToTimeString(clickMinutes)]);
    }
  };

  // Chỉnh sửa hàm handleAirlineChange để chỉ chọn một hãng với giao diện checkbox
  const handleAirlineChange = (airline) => {
    if (selectedAirline.includes(airline)) {
      // Nếu đã được chọn → bỏ chọn
      setSelectedAirline(selectedAirline.filter((a) => a !== airline));
    } else {
      // Nếu chưa được chọn → thêm vào
      setSelectedAirline([...selectedAirline, airline]);
    }
  };

  const handleTripTypeChange = (tripType) => {
    setSelectedTripType(tripType);
  };
  const handleRatingChange = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };
  const minThumbPosition = priceToPercent(priceRange[0]);
  const maxThumbPosition = priceToPercent(priceRange[1]);
  const progressWidth = maxThumbPosition - minThumbPosition;

  const minTimeThumbPosition = minutesToPercent(departureMinutes[0]);
  const maxTimeThumbPosition = minutesToPercent(departureMinutes[1]);
  const timeProgressWidth = maxTimeThumbPosition - minTimeThumbPosition;


  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // chạy lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="filters-container">
  {isMobile && (
    <button
      className="mobile-filter-toggle"
      onClick={() => setShowFilters((prev) => !prev)}
    >
      {showFilters ? "Ẩn bộ lọc ▲" : "Hiện bộ lọc ▼"}
    </button>
  )}

  <div
    className={`filters-content ${
      isMobile && !showFilters ? "hidden" : ""
    }`}
  >
      <h2>Bộ lọc</h2>

      {/* Price Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Giá</h3>
          <span className="chevron">ˆ</span>
        </div>
        <div className="price-slider">
          <div
            className="slider-track"
            ref={sliderTrackRef}
            onClick={handleTrackClick}
          >
            <div
              className={`slider-thumb ${
                draggingThumb === "min" ? "active" : ""
              }`}
              style={{
                left: `${minThumbPosition}%`,
                transition: isDragging ? "none" : "left 0.1s ease",
              }}
              onMouseDown={(e) => handleThumbMouseDown(e, "min")}
              onTouchStart={(e) => handleThumbTouchStart(e, "min")}
            ></div>
            <div
              className={`slider-thumb ${
                draggingThumb === "max" ? "active" : ""
              }`}
              style={{
                left: `${maxThumbPosition}%`,
                transition: isDragging ? "none" : "left 0.1s ease",
              }}
              onMouseDown={(e) => handleThumbMouseDown(e, "max")}
              onTouchStart={(e) => handleThumbTouchStart(e, "max")}
            ></div>
            <div
              className="slider-progress"
              style={{
                left: `${minThumbPosition}%`,
                width: `${progressWidth}%`,
                transition: isDragging
                  ? "none"
                  : "left 0.1s ease, width 0.1s ease",
              }}
            ></div>
          </div>
          <div className="slider-labels">
            <span>{priceRange[0].toLocaleString()}VND</span>
            <span>{priceRange[1].toLocaleString()}VND</span>
          </div>
        </div>
      </div>

      {/* Giờ Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Giờ</h3>
          <span className="chevron">ˆ</span>
        </div>
        <div className="time-slider">
          <div
            className="slider-track"
            ref={timeSliderTrackRef}
            onClick={handleTimeTrackClick}
          >
            <div
              className={`slider-thumb ${
                draggingTimeThumb === "min" ? "active" : ""
              }`}
              style={{
                left: `${minTimeThumbPosition}%`,
                transition: isTimeDragging ? "none" : "left 0.1s ease",
              }}
              onMouseDown={(e) => handleTimeThumbMouseDown(e, "min")}
              onTouchStart={(e) => handleTimeThumbTouchStart(e, "min")}
            ></div>
            <div
              className={`slider-thumb ${
                draggingTimeThumb === "max" ? "active" : ""
              }`}
              style={{
                left: `${maxTimeThumbPosition}%`,
                transition: isTimeDragging ? "none" : "left 0.1s ease",
              }}
              onMouseDown={(e) => handleTimeThumbMouseDown(e, "max")}
              onTouchStart={(e) => handleTimeThumbTouchStart(e, "max")}
            ></div>
            <div
              className="slider-progress"
              style={{
                left: `${minTimeThumbPosition}%`,
                width: `${timeProgressWidth}%`,
                transition: isTimeDragging
                  ? "none"
                  : "left 0.1s ease, width 0.1s ease",
              }}
            ></div>
          </div>
          <div className="slider-labels">
            <span>{departureTime[0]}</span>
            <span>{departureTime[1]}</span>
          </div>
        </div>
      </div>

      {/* Airlines Filter - Giữ nguyên checkbox nhưng chỉ cho phép chọn một */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Hãng Hàng Không</h3>
          <span className="chevron">ˆ</span>
        </div>
        <div className="airlines-options">
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="Vietnam Airlines"
              checked={selectedAirline.includes("Vietnam Airlines")}
              onChange={() => handleAirlineChange("Vietnam Airlines")}
            />
            <label htmlFor="Vietnam Airlines">Vietnam Airlines</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="Jetstar Pacific"
              checked={selectedAirline.includes("Jetstar Pacific")}
              onChange={() => handleAirlineChange("Jetstar Pacific")}
            />
            <label htmlFor="Jetstar Pacific">Jetstar Pacific</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="Vietjet Air"
              checked={selectedAirline.includes("Vietjet Air")}
              onChange={() => handleAirlineChange("Vietjet Air")}
            />
            <label htmlFor="Vietjet Air">Vietjet Air</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="Bamboo Airways"
              checked={selectedAirline.includes("Bamboo Airways")}
              onChange={() => handleAirlineChange("Bamboo Airways")}
            />
            <label htmlFor="Bamboo Airways">Bamboo Airways</label>
          </div>
        </div>
      </div>

      {/* Trips Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Sắp xếp</h3>
          <span className="chevron">ˆ</span>
        </div>
        <div className="trips-options">
          <div className="checkbox-option">
            <input
              type="radio"
              id="lowtohigh"
              name="tripType"
              checked={selectedTripType === "asc"}
              onChange={() => handleTripTypeChange("asc")}
            />
            <label htmlFor="lowtohigh">Thấp đến cao</label>
          </div>
          <div className="checkbox-option">
            <input
              type="radio"
              id="hightolow"
              name="tripType"
              checked={selectedTripType === "desc"}
              onChange={() => handleTripTypeChange("desc")}
            />
            <label htmlFor="hightolow">Cao đến thấp</label>
          </div>
          <div className="checkbox-option">
            <input
              type="radio"
              id="early"
              name="tripType"
              checked={selectedTripType === "early"}
              onChange={() => handleTripTypeChange("early")}
            />
            <label htmlFor="early">Sớm nhất</label>
          </div>
          <div className="checkbox-option">
            <input
              type="radio"
              id="lately"
              name="tripType"
              checked={selectedTripType === "lately"}
              onChange={() => handleTripTypeChange("lately")}
            />
            <label htmlFor="lately">Muộn nhất</label>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FlightFilters;
